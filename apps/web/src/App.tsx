import { useEffect, useMemo, useRef, useState } from "react";
import { fetchCatalog, signInWithGoogle, submitCheckout } from "./services/api";
import { loadCartItems, saveCartItems } from "./utils/localStorage";
import type { Address, CartItem, OrderResponse, Product, SessionUser } from "./types";

const initialAddress: Address = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  postal: "",
  country: "United Kingdom",
  phone: "",
};

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(cents / 100);
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [address, setAddress] = useState<Address>(initialAddress);
  const [checkoutResult, setCheckoutResult] = useState<OrderResponse | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCatalog()
      .then(setProducts)
      .catch((error) => setCatalogError(error.message));
  }, []);

  useEffect(() => {
    setCartItems(loadCartItems());
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem("trivenilondon_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem("trivenilondon_user");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (user) {
      window.localStorage.setItem("trivenilondon_user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("trivenilondon_user");
    }
  }, [user]);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const container = googleButtonRef.current;
    if (!clientId || !container) {
      return;
    }

    const initGoogle = () => {
      const google = window.google;
      if (!google?.accounts?.id) {
        return;
      }

      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (!response?.credential) {
            return;
          }

          try {
            const signedIn = await signInWithGoogle(response.credential);
            setUser(signedIn);
          } catch (error) {
            console.error(error);
          }
        },
      });

      google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: 280,
      });
      google.accounts.id.prompt();
    };

    if (window.google?.accounts?.id) {
      initGoogle();
      return;
    }

    const onLoad = () => initGoogle();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const cartDetail = useMemo(() => {
    return cartItems.map((item) => {
      const product = products.find((product) => product.id === item.id);
      return { item, product };
    });
  }, [cartItems, products]);

  const subtotalCents = cartDetail.reduce((total, detail) => {
    if (!detail.product) {
      return total;
    }
    return total + detail.product.priceCents * detail.item.quantity;
  }, 0);

  const shippingCents = cartItems.length > 0 ? 500 : 0;
  const totalCents = subtotalCents + shippingCents;

  const addToCart = (productId: string) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { id: productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const clearCheckout = () => {
    setCheckoutResult(null);
    setCheckoutError(null);
  };

  const handleCheckout = async () => {
    setCheckoutError(null);
    setCheckoutResult(null);

    if (!user) {
      setCheckoutError("Please sign in with Google before checking out.");
      return;
    }

    if (cartItems.length === 0) {
      setCheckoutError("Add at least one product to the cart before checkout.");
      return;
    }

    if (!address.fullName || !address.line1 || !address.city || !address.postal || !address.country || !address.phone) {
      setCheckoutError("Please complete the shipping address before checkout.");
      return;
    }

    setIsCheckingOut(true);
    try {
      const order = await submitCheckout(cartItems, address, user.id);
      setCheckoutResult(order);
      setCartItems([]);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="TriveniLondon home">
          TriveniLondon
        </a>
        <nav aria-label="Primary navigation">
          <a href="#products">Products</a>
          <a href="#checkout">Checkout</a>
          <a href="#cart">Cart</a>
        </nav>
        <div className="auth-panel">
          {user ? (
            <div className="user-badge">
              {user.picture ? <img src={user.picture} alt={user.name} /> : null}
              <span>{user.name}</span>
              <button type="button" onClick={() => setUser(null)}>
                Sign out
              </button>
            </div>
          ) : (
            <div className="google-signin">
              <div ref={googleButtonRef} aria-label="Google sign in button" />
              {!import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                <p className="help-text">Configure VITE_GOOGLE_CLIENT_ID for Google login.</p>
              ) : null}
            </div>
          )}
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Fragrance and jewellery</p>
          <h1 id="hero-title">Objects for memory, ritual, and light.</h1>
          <p>
            A first look at TriveniLondon: layered scents, luminous metals, and
            considered gifts for everyday ceremony.
          </p>
          <a className="primary-link" href="#products">
            Explore the edit
          </a>
        </div>
        <div className="hero-still" aria-hidden="true">
          <div className="bottle" />
          <div className="ring" />
          <div className="tray" />
        </div>
      </section>

      <section className="section-band" id="products" aria-labelledby="featured-title">
        <div className="section-heading">
          <p className="eyebrow">MVP catalogue preview</p>
          <h2 id="featured-title">Featured pieces</h2>
        </div>

        {catalogError ? (
          <div className="error-box">Unable to load products: {catalogError}</div>
        ) : null}

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image" aria-hidden="true" />
              <div>
                <p className="product-type">{product.type}</p>
                <h3>{product.name}</h3>
                <p>{product.note}</p>
              </div>
              <div className="product-footer">
                <strong>{formatCurrency(product.priceCents)}</strong>
                <button type="button" onClick={() => addToCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band cart-section" id="cart" aria-labelledby="cart-title">
        <div className="section-heading">
          <p className="eyebrow">Shopping cart</p>
          <h2 id="cart-title">Your cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add an item to continue.</p>
        ) : (
          <div className="cart-table">
            {cartDetail.map(({ item, product }) => (
              <div className="cart-row" key={item.id}>
                <div>
                  <p className="product-type">{product?.type ?? "Product"}</p>
                  <h3>{product?.name ?? item.id}</h3>
                  <p>{product?.note ?? ""}</p>
                </div>
                <div className="cart-actions">
                  <label>
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    />
                  </label>
                  <strong>{formatCurrency((product?.priceCents ?? 0) * item.quantity)}</strong>
                  <button type="button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section-band checkout-section" id="checkout" aria-labelledby="checkout-title">
        <div className="section-heading">
          <p className="eyebrow">Checkout</p>
          <h2 id="checkout-title">Shipping and payment details</h2>
        </div>

        <div className="checkout-grid">
          <div className="checkout-form">
            <label>
              Full name
              <input
                value={address.fullName}
                onChange={(event) => setAddress({ ...address, fullName: event.target.value })}
              />
            </label>
            <label>
              Address line 1
              <input
                value={address.line1}
                onChange={(event) => setAddress({ ...address, line1: event.target.value })}
              />
            </label>
            <label>
              Address line 2
              <input
                value={address.line2}
                onChange={(event) => setAddress({ ...address, line2: event.target.value })}
              />
            </label>
            <label>
              City
              <input
                value={address.city}
                onChange={(event) => setAddress({ ...address, city: event.target.value })}
              />
            </label>
            <label>
              Postal code
              <input
                value={address.postal}
                onChange={(event) => setAddress({ ...address, postal: event.target.value })}
              />
            </label>
            <label>
              Country
              <input
                value={address.country}
                onChange={(event) => setAddress({ ...address, country: event.target.value })}
              />
            </label>
            <label>
              Phone
              <input
                value={address.phone}
                onChange={(event) => setAddress({ ...address, phone: event.target.value })}
              />
            </label>
          </div>

          <div className="checkout-summary">
            <div className="summary-card">
              <h3>Order summary</h3>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotalCents)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{formatCurrency(shippingCents)}</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>{formatCurrency(totalCents)}</span>
              </div>
              <button type="button" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Processing…" : "Checkout now"}
              </button>
              {checkoutError ? <div className="error-box">{checkoutError}</div> : null}
              {checkoutResult ? (
                <div className="success-box">
                  <h4>Order confirmed</h4>
                  <p>Order ID: {checkoutResult.orderId}</p>
                  <p>Total paid: {formatCurrency(checkoutResult.totalCents)}</p>
                  <button type="button" onClick={clearCheckout}>
                    Start a new order
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="promise-band" aria-label="Store promises">
        <p>Small batch edits</p>
        <p>UK-first launch</p>
        <p>Secure checkout powered by backend validation</p>
      </section>

      <footer>
        <p>TriveniLondon</p>
        <p>Static MVP container build with API support.</p>
      </footer>
    </main>
  );
}

export default App;

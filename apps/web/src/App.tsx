const featuredProducts = [
  {
    name: "Amber Veil",
    type: "Eau de Parfum",
    note: "Saffron, amber resin, cedar",
    price: "£78",
  },
  {
    name: "Nila Drops",
    type: "Gold vermeil earrings",
    note: "Blue enamel with freshwater pearl",
    price: "£64",
  },
  {
    name: "Temple Smoke",
    type: "Home fragrance",
    note: "Incense, sandalwood, black tea",
    price: "£42",
  },
];

const collections = ["Fragrances", "Jewellery", "Gifts"];

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="TriveniLondon home">
          TriveniLondon
        </a>
        <nav aria-label="Primary navigation">
          {collections.map((collection) => (
            <a key={collection} href={`#${collection.toLowerCase()}`}>
              {collection}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Fragrance and jewellery</p>
          <h1 id="hero-title">Objects for memory, ritual, and light.</h1>
          <p>
            A first look at TriveniLondon: layered scents, luminous metals, and
            considered gifts for everyday ceremony.
          </p>
          <a className="primary-link" href="#featured">
            Explore the edit
          </a>
        </div>
        <div className="hero-still" aria-hidden="true">
          <div className="bottle" />
          <div className="ring" />
          <div className="tray" />
        </div>
      </section>

      <section className="section-band" id="featured" aria-labelledby="featured-title">
        <div className="section-heading">
          <p className="eyebrow">MVP catalogue preview</p>
          <h2 id="featured-title">Featured pieces</h2>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image" aria-hidden="true" />
              <div>
                <p className="product-type">{product.type}</p>
                <h3>{product.name}</h3>
                <p>{product.note}</p>
              </div>
              <strong>{product.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="promise-band" aria-label="Store promises">
        <p>Small batch edits</p>
        <p>UK-first launch</p>
        <p>Secure checkout coming next</p>
      </section>

      <footer>
        <p>TriveniLondon</p>
        <p>Static MVP container build.</p>
      </footer>
    </main>
  );
}

export default App;

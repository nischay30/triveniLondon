const drops = [
  {
    name: "Neon Attar 01",
    type: "Skin scent",
    mood: "pear skin / smoked sugar / rain on chrome",
    price: "£86",
    badge: "New drop",
    accent: "lime",
  },
  {
    name: "Loop Chain No. 7",
    type: "Recycled silver",
    mood: "stackable links with a liquid mirror finish",
    price: "£72",
    badge: "Low stock",
    accent: "blue",
  },
  {
    name: "Afterglow Oil",
    type: "Perfume oil",
    mood: "rose oxide / cardamom milk / warm vinyl",
    price: "£54",
    badge: "Viral edit",
    accent: "coral",
  },
];

const signals = ["Micro-batch", "Cruelty free", "UK shipping", "Secure checkout next"];
const navItems = ["Drops", "Fragrance", "Jewellery", "Journal"];
const stats = [
  ["03", "launch capsules"],
  ["48h", "small-batch dispatch"],
  ["2026", "built for now"],
];

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/" aria-label="TriveniLondon home">
          <span>Triveni</span>London
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a className="bag-link" href="#drops" aria-label="Open launch edit">
          Bag 0
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">London fragrance / future jewellery</p>
          <h1 id="hero-title">Wear the drop before it becomes a memory.</h1>
          <p>
            TriveniLondon pairs intimate perfume rituals with sculptural jewellery,
            built for night buses, wedding weeks, and camera-flash exits.
          </p>
          <div className="hero-actions" aria-label="Shopping actions">
            <a className="primary-link" href="#drops">
              Shop the edit
            </a>
            <a className="secondary-link" href="#fragrance">
              Find your note
            </a>
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Perfume bottle and jewellery product scene">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="glass-panel panel-back" />
          <div className="perfume-3d">
            <div className="cap" />
            <div className="sprayer" />
            <div className="bottle-glass">
              <span>TL</span>
            </div>
          </div>
          <div className="ring-3d ring-one" />
          <div className="ring-3d ring-two" />
          <div className="chrome-chain" />
          <div className="scene-label">01 / chrome attar</div>
        </div>
      </section>

      <section className="ticker" aria-label="Store highlights">
        {signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </section>

      <section className="drop-section" id="drops" aria-labelledby="drops-title">
        <div className="section-heading">
          <p className="eyebrow">Fresh cart energy</p>
          <h2 id="drops-title">Launch drops</h2>
          <p>
            A tighter first edit: fragrance with texture, jewellery with attitude,
            and product pages ready to grow into checkout.
          </p>
        </div>

        <div className="product-grid">
          {drops.map((product, index) => (
            <article className={`product-card ${product.accent}`} key={product.name}>
              <div className="product-media" aria-hidden="true">
                <span className="drop-number">0{index + 1}</span>
                <div className="mini-bottle" />
                <div className="mini-ring" />
              </div>
              <div className="product-info">
                <p className="product-type">{product.type}</p>
                <h3>{product.name}</h3>
                <p>{product.mood}</p>
              </div>
              <div className="product-footer">
                <span>{product.badge}</span>
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section" id="fragrance" aria-labelledby="experience-title">
        <div>
          <p className="eyebrow">Not a dusty counter</p>
          <h2 id="experience-title">A storefront that feels alive.</h2>
        </div>
        <div className="experience-grid">
          {stats.map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="editorial-strip" id="jewellery" aria-label="Jewellery and fragrance editorial">
        <div className="editorial-copy">
          <p className="eyebrow">Stack scent with shine</p>
          <h2>One cart, two rituals.</h2>
        </div>
        <div className="swatch-row" aria-hidden="true">
          <span className="swatch lime" />
          <span className="swatch coral" />
          <span className="swatch ink" />
          <span className="swatch pearl" />
        </div>
      </section>

      <footer id="journal">
        <p>TriveniLondon</p>
        <p>London / limited edit.</p>
      </footer>
    </main>
  );
}

export default App;

const CATEGORIES = ['Puzzles', 'Action Figures', 'Transformers', 'Arcade', 'Dolls', 'Educational', 'Consoles'];

const NAV_LINKS = [
  { label: 'Shop All', href: '#shop' },
  { label: 'Featured Drop', href: '#shop' },
  { label: 'Stripe Setup', href: '/setup' },
];

const TRUST_ITEMS = [
  { icon: '🔒', label: 'SSL Encrypted' },
  { icon: '🚀', label: 'Fast Shipping' },
  { icon: '⭐', label: '10K+ Happy Kids' },
  { icon: '↩️', label: 'Easy Returns' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20">
      <div className="retro-divider" />

      {/* ── Main columns ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <div>
              <div className="flex justify-start mb-3 pointer-events-none" aria-hidden>
                <div
                  className="rounded-t-full opacity-50"
                  style={{
                    width: 80,
                    height: 40,
                    background: 'linear-gradient(180deg, #ffb347 0%, #ff2d78 45%, #a800ff 100%)',
                    boxShadow: '0 0 20px rgba(255,45,120,0.25)',
                  }}
                />
              </div>
              <h2 className="font-pixel text-[18px] synthwave-sun leading-none">PIXEL PALACE</h2>
              <p className="font-pixel text-[6px] text-cyan-500/40 tracking-[0.35em] mt-1.5">TOY EMPORIUM</p>
            </div>

            <p className="font-vt text-[1.15rem] text-gray-600 leading-relaxed">
              The gnarliest toys this side of the galaxy — bringing radical retro fun since&nbsp;
              <span className="neon-yellow text-shadow-none" style={{ textShadow: 'none', color: '#ffe600', opacity: 0.7 }}>1982</span>.
            </p>

            {/* Stripe trust badge */}
            <div className="stripe-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full self-start">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(149,144,255,0.75)">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.93 3.477 1.632 3.477 2.678 0 1.05-.965 1.68-2.594 1.68-1.897 0-4.728-.85-6.688-1.986l-.966 5.423c1.548.935 4.33 1.768 7.24 1.768 2.559 0 4.712-.6 6.207-1.834 1.585-1.31 2.402-3.24 2.402-5.66 0-4.095-2.508-5.832-6.335-7.356z"/>
              </svg>
              <span className="font-pixel text-[6px] text-purple-300/60 tracking-wider">SECURED BY STRIPE</span>
            </div>
          </div>

          {/* Navigate column */}
          <div className="flex flex-col gap-4">
            <h3
              className="font-pixel text-[7px] tracking-[0.3em]"
              style={{ color: 'rgba(0,245,255,0.45)' }}
            >
              NAVIGATE
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-vt text-[1.25rem] text-gray-600 hover:text-cyan-400 transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span
                      className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#00f5ff' }}
                    >
                      ▶
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories column */}
          <div className="flex flex-col gap-4">
            <h3
              className="font-pixel text-[7px] tracking-[0.3em]"
              style={{ color: 'rgba(255,45,120,0.45)' }}
            >
              CATEGORIES
            </h3>
            <ul className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a
                    href="#shop"
                    className="font-vt text-[1.25rem] text-gray-600 hover:text-pink-400 transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span
                      className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#ff2d78' }}
                    >
                      ▶
                    </span>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust signals column */}
          <div className="flex flex-col gap-4">
            <h3
              className="font-pixel text-[7px] tracking-[0.3em]"
              style={{ color: 'rgba(255,230,0,0.4)' }}
            >
              WHY US
            </h3>
            <ul className="flex flex-col gap-4">
              {TRUST_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-vt text-[1.15rem] text-gray-600">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-vt text-[1.1rem] text-gray-800">
            © 1984 Pixel Palace Toy Emporium. All rights rad.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {['TOTALLY AWESOME', 'BOGUS RETURNS', 'MOST EXCELLENT SUPPORT'].map((t, i) => (
              <span key={t} className="font-pixel text-[5px] text-gray-800 flex items-center gap-2">
                {i > 0 && <span style={{ color: 'rgba(255,45,120,0.2)' }}>★</span>}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

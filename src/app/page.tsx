import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <main className="retro-grid min-h-screen">
      <Header />

      {/* ── Shop section ─────────────────────────────────────── */}
      <section id="shop" className="relative z-10 max-w-7xl mx-auto px-4 pt-14 pb-10">

        {/* Section heading */}
        <div className="mb-8 text-center">
          <h2 className="font-pixel text-xs sm:text-sm neon-cyan inline-flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-cyan-400/50" />
            NOW IN STOCK
            <span className="inline-block w-8 h-px bg-cyan-400/50" />
          </h2>
          <p className="font-vt text-2xl text-gray-400 mt-2 tracking-wide">
            Fresh off the truck from the future — shop our radical collection
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <span className="font-pixel text-[7px] px-3 py-2 rounded-full cat-pill-active border cursor-pointer select-none">
            ALL
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="font-pixel text-[7px] px-3 py-2 rounded-full border border-gray-700 text-gray-500 hover:border-cyan-500 hover:text-cyan-300 transition-all duration-200 cursor-pointer select-none"
            >
              {cat.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── Stats ──────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'TOYS IN STOCK', value: '200+',  color: '#00f5ff', glow: 'rgba(0,245,255,0.3)' },
            { label: 'HAPPY KIDS',    value: '10K+',  color: '#ff2d78', glow: 'rgba(255,45,120,0.3)' },
            { label: 'YEARS OF FUN',  value: '40+',   color: '#ffe600', glow: 'rgba(255,230,0,0.3)' },
            { label: 'SECURE PAY',    value: '100%',  color: '#39ff14', glow: 'rgba(57,255,20,0.3)' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-xl p-6 text-center overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at center, ${stat.glow.replace('0.3','0.06')} 0%, transparent 70%), #0c0c2a`,
                border: `1px solid ${stat.color}44`,
                boxShadow: `0 0 20px ${stat.color}22`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
              <p
                className="font-pixel text-3xl"
                style={{ color: stat.color, textShadow: `0 0 12px ${stat.color}, 0 0 30px ${stat.color}` }}
              >
                {stat.value}
              </p>
              <p className="font-pixel text-[6px] text-gray-500 mt-3 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

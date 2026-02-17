import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <main className="retro-grid min-h-screen relative overflow-hidden">

      {/* ── Atmospheric background fog ───────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Purple blob top-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: -100, left: -150,
            background: 'radial-gradient(circle, rgba(120,0,255,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Pink blob center-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: '30%', right: -100,
            background: 'radial-gradient(circle, rgba(255,45,120,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Cyan blob bottom-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            bottom: '20%', left: -80,
            background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Yellow blob bottom-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: 350, height: 350,
            bottom: '5%', right: '10%',
            background: 'radial-gradient(circle, rgba(255,200,0,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <Header />

      {/* ── Shop section ─────────────────────────────────────────── */}
      <section id="shop" className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-10">

        {/* Section heading */}
        <div className="mb-10 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <h2 className="font-pixel text-[11px] sm:text-sm neon-cyan tracking-widest">
                NOW IN STOCK
              </h2>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/60" />
            </div>
            <p className="font-vt text-2xl text-gray-400 tracking-wide max-w-lg">
              Fresh off the truck from the future — shop our radical collection
            </p>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button className="font-pixel text-[7px] px-4 py-2 rounded-full border border-pink-600 text-pink-400 bg-pink-950/30 hover:bg-pink-900/40 transition-all duration-200 cursor-pointer select-none shadow-[0_0_8px_rgba(255,45,120,0.3)]">
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="font-pixel text-[7px] px-4 py-2 rounded-full border border-gray-700/60 text-gray-500 hover:border-cyan-500 hover:text-cyan-300 hover:bg-cyan-950/20 transition-all duration-200 cursor-pointer select-none"
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── Stats bar ────────────────────────────────────────── */}
        <div className="mt-20 mb-4">
          <div className="retro-divider mb-10" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'TOYS IN STOCK', value: '200+',  icon: '🎮', color: '#00f5ff' },
              { label: 'HAPPY KIDS',    value: '10K+',  icon: '😄', color: '#ff2d78' },
              { label: 'YEARS OF FUN',  value: '40+',   icon: '⭐', color: '#ffe600' },
              { label: 'SECURE PAY',    value: '100%',  icon: '🔒', color: '#39ff14' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative rounded-2xl p-5 text-center overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}0a 0%, rgba(12,12,42,0.9) 100%)`,
                  border: `1px solid ${stat.color}30`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${stat.color}15`,
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}aa, transparent)`,
                  }}
                />
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p
                  className="font-pixel text-2xl"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 14px ${stat.color}, 0 0 28px ${stat.color}88`,
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-pixel text-[6px] text-gray-600 mt-2 tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

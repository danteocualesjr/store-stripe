import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FeaturedCard from '@/components/FeaturedCard';
import { products } from '@/data/products';

export default function Home() {
  const [featured, ...rest] = products;
  const categories = Array.from(new Set(rest.map((p) => p.category)));

  return (
    <main className="retro-grid min-h-screen relative overflow-x-hidden">

      {/* ── Atmospheric fog blobs ───────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute rounded-full" style={{ width:700, height:700, top:-200, left:-200, background:'radial-gradient(circle, rgba(120,0,255,0.1) 0%, transparent 70%)', filter:'blur(50px)' }} />
        <div className="absolute rounded-full" style={{ width:500, height:500, top:'25%', right:-100, background:'radial-gradient(circle, rgba(255,45,120,0.09) 0%, transparent 70%)', filter:'blur(50px)' }} />
        <div className="absolute rounded-full" style={{ width:450, height:450, bottom:'20%', left:-80, background:'radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)', filter:'blur(45px)' }} />
        <div className="absolute rounded-full" style={{ width:350, height:350, bottom:'5%', right:'8%', background:'radial-gradient(circle, rgba(255,200,0,0.06) 0%, transparent 70%)', filter:'blur(40px)' }} />
      </div>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <Header />

      {/* ── Shop section ────────────────────────────────────────── */}
      <section id="shop" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16">

        {/* ── Featured product ─────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/30" />
            <span className="font-pixel text-[7px] text-yellow-400/70 tracking-[0.3em] uppercase">Featured Drop</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/30" />
          </div>
          <FeaturedCard product={featured} />
        </div>

        {/* ── Section heading ──────────────────────────────────── */}
        <div className="mt-16 mb-8 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <h2 className="font-pixel text-[11px] neon-cyan tracking-widest">ALL PRODUCTS</h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
            <p className="font-vt text-xl text-gray-500 tracking-wider">
              {rest.length} more radical toys in stock
            </p>
          </div>
        </div>

        {/* ── Category filters ─────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button className="font-pixel text-[7px] px-4 py-2 rounded-full border border-pink-600/60 text-pink-400 bg-pink-950/30 hover:bg-pink-900/40 transition-all duration-200 shadow-[0_0_8px_rgba(255,45,120,0.2)]">
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="font-pixel text-[7px] px-4 py-2 rounded-full border border-gray-700/40 text-gray-600 hover:border-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-950/20 transition-all duration-200"
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── Product grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── Stats ────────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="retro-divider mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'TOYS IN STOCK', value: '200+', icon: '🎮', color: '#00f5ff' },
              { label: 'HAPPY KIDS',    value: '10K+', icon: '😄', color: '#ff2d78' },
              { label: 'YEARS OF FUN',  value: '40+',  icon: '⭐', color: '#ffe600' },
              { label: 'SECURE PAY',    value: '100%', icon: '🔒', color: '#39ff14' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative rounded-2xl p-5 text-center overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${stat.color}08, rgba(10,10,30,0.85))`,
                  border: `1px solid ${stat.color}28`,
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}88, transparent)` }} />
                <div className="text-2xl mb-2 leading-none">{stat.icon}</div>
                <p className="font-pixel text-2xl" style={{ color: stat.color, textShadow: `0 0 16px ${stat.color}` }}>
                  {stat.value}
                </p>
                <p className="font-pixel text-[6px] text-gray-700 mt-2 tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

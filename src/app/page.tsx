import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <main className="retro-grid min-h-screen">
      <Header />

      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-10">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <h2 className="font-pixel text-sm sm:text-base neon-cyan">
            ▶ NOW IN STOCK
          </h2>
          <p className="font-vt text-2xl text-gray-400 mt-2">
            Fresh off the truck from the future — shop our radical collection
          </p>
        </div>

        {/* Category filters (visual only) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <span className="font-pixel text-[8px] px-3 py-2 rounded neon-border-pink bg-pink-900/20 text-pink-300 cursor-pointer">
            ALL
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="font-pixel text-[8px] px-3 py-2 rounded border border-gray-700 text-gray-400 hover:border-cyan-500 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {cat.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'TOYS IN STOCK', value: '200+', color: 'neon-cyan' },
            { label: 'HAPPY KIDS', value: '10K+', color: 'neon-pink' },
            { label: 'YEARS OF FUN', value: '40+', color: 'neon-yellow' },
            { label: 'SECURE CHECKOUT', value: '100%', color: 'neon-green' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-black/40 border border-gray-800 rounded-lg p-5 text-center"
            >
              <p className={`font-pixel text-2xl ${stat.color}`}>{stat.value}</p>
              <p className="font-pixel text-[7px] text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

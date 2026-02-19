'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductsSection({ products }: Props) {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <>
      {/* ── Section heading ──────────────────────────────────── */}
      <div className="mt-16 mb-8 text-center">
        <div className="inline-flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <h2 className="font-pixel text-[11px] neon-cyan tracking-widest">ALL PRODUCTS</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          <p className="font-vt text-xl text-gray-500 tracking-wider">
            {filtered.length} radical toy{filtered.length !== 1 ? 's' : ''}{activeCategory ? ` in ${activeCategory}` : ' in stock'}
          </p>
        </div>
      </div>

      {/* ── Category filters ─────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className="font-pixel text-[7px] px-4 py-2 rounded-full border transition-all duration-200"
          style={
            activeCategory === null
              ? {
                  borderColor: 'rgba(255,45,120,0.8)',
                  color: '#ff2d78',
                  background: 'rgba(255,45,120,0.18)',
                  boxShadow: '0 0 12px rgba(255,45,120,0.35)',
                }
              : {
                  borderColor: 'rgba(255,45,120,0.3)',
                  color: 'rgba(255,45,120,0.6)',
                  background: 'rgba(255,45,120,0.06)',
                }
          }
        >
          ALL
        </button>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className="font-pixel text-[7px] px-4 py-2 rounded-full border transition-all duration-200"
              style={
                isActive
                  ? {
                      borderColor: 'rgba(0,245,255,0.8)',
                      color: '#00f5ff',
                      background: 'rgba(0,245,255,0.12)',
                      boxShadow: '0 0 12px rgba(0,245,255,0.3)',
                    }
                  : {
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(150,150,180,0.6)',
                      background: 'transparent',
                    }
              }
            >
              {cat.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* ── Product grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ── Empty state ──────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="text-6xl opacity-20">🎮</span>
          <p className="font-pixel text-[8px] text-gray-700 tracking-widest">NO TOYS IN THIS CATEGORY</p>
          <button
            onClick={() => setActiveCategory(null)}
            className="font-pixel text-[7px] px-5 py-2.5 rounded-xl text-cyan-400 transition-colors mt-2"
            style={{ border: '1px solid rgba(0,245,255,0.3)', background: 'rgba(0,245,255,0.06)' }}
          >
            SHOW ALL →
          </button>
        </div>
      )}
    </>
  );
}

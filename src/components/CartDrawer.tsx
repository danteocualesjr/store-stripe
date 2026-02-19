'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, closeCart, increment, decrement, removeFromCart, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  async function handleCheckout() {
    if (items.length === 0) return;
    setCheckingOut(true);
    setCheckoutError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ priceId: i.product.stripePriceId, quantity: i.quantity })),
        }),
      });

      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        // Fallback: open individual payment links
        openPaymentLinks();
      }
    } catch {
      openPaymentLinks();
    } finally {
      setCheckingOut(false);
    }
  }

  function openPaymentLinks() {
    const withLinks = items.filter((i) => i.product.paymentLink);
    if (withLinks.length === 0) return;
    // Open first one in current tab, rest in new tabs
    withLinks.forEach((item, idx) => {
      if (idx === 0) window.location.href = item.product.paymentLink!;
      else window.open(item.product.paymentLink, '_blank');
    });
  }

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ── Drawer ────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full max-w-md"
        style={{
          background: 'rgba(8,8,28,0.97)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(0,245,255,0.15)',
          boxShadow: '-8px 0 48px rgba(0,0,0,0.7), -1px 0 0 rgba(255,45,120,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(.22,.61,.36,1)',
        }}
      >
        {/* Top accent */}
        <div className="h-[2px] w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, #ff2d78, #00f5ff, transparent)', boxShadow: '0 0 14px rgba(255,45,120,0.6)' }} />

        {/* ── Header ────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="font-pixel text-[10px] text-white tracking-wider">YOUR CART</h2>
              <p className="font-vt text-base text-gray-500 mt-0.5">
                {totalItems === 0 ? 'Empty — add some rad toys!' : `${totalItems} item${totalItems !== 1 ? 's' : ''} — totally radical`}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="font-pixel text-[10px] text-gray-600 hover:text-pink-400 transition-colors w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* ── Items list ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 pb-10">
              <span className="text-7xl opacity-20">🛒</span>
              <p className="font-pixel text-[8px] text-gray-700 text-center tracking-widest">
                NO ITEMS YET
              </p>
              <p className="font-vt text-lg text-gray-600 text-center">
                Add some gnarly toys from the store!
              </p>
              <button
                onClick={closeCart}
                className="font-pixel text-[8px] px-5 py-2.5 rounded-xl neon-border-cyan text-cyan-400 hover:bg-cyan-950/30 transition-colors mt-2"
              >
                KEEP SHOPPING →
              </button>
            </div>
          ) : (
            items.map((item) => {
              const hex = {
                pink: '#ff2d78', cyan: '#00f5ff', yellow: '#ffe600',
                purple: '#bf00ff', green: '#39ff14',
              }[item.product.neonColor];

              return (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 rounded-xl p-3 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${hex}20`,
                    boxShadow: `0 0 0 1px ${hex}08`,
                  }}
                >
                  {/* Emoji */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${hex}12`, border: `1px solid ${hex}25` }}
                  >
                    <span className="text-2xl leading-none" style={{ filter: `drop-shadow(0 0 6px ${hex}88)` }}>
                      {item.product.emoji}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-vt text-lg text-white leading-tight truncate">{item.product.name}</p>
                    <p className="font-pixel text-[8px] mt-0.5" style={{ color: hex }}>
                      ${(item.product.price / 100).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => decrement(item.product.id)}
                      className="w-7 h-7 rounded-lg font-pixel text-[10px] text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      −
                    </button>
                    <span className="font-pixel text-[9px] text-white w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.product.id)}
                      className="w-7 h-7 rounded-lg font-pixel text-[10px] text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right flex-shrink-0 w-16">
                    <p className="font-pixel text-[9px]" style={{ color: hex }}>
                      ${((item.product.price * item.quantity) / 100).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="font-pixel text-[6px] text-gray-700 hover:text-red-500 transition-colors mt-1 tracking-widest"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-6 py-5 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Order summary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-pixel text-[7px] text-gray-600 tracking-widest">SUBTOTAL</span>
                <span className="font-pixel text-[9px] text-gray-300">${(totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-pixel text-[7px] text-gray-600 tracking-widest">SHIPPING</span>
                <span className="font-pixel text-[9px] text-green-400">FREE</span>
              </div>
              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
              <div className="flex justify-between items-center">
                <span className="font-pixel text-[8px] text-white tracking-widest">TOTAL</span>
                <span className="font-pixel text-lg neon-pink">${(totalPrice / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Error */}
            {checkoutError && (
              <p className="font-vt text-base text-red-400 text-center">{checkoutError}</p>
            )}

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn-buy w-full font-pixel py-4 rounded-xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontSize: 10,
                background: 'linear-gradient(135deg, rgba(255,45,120,0.2), rgba(255,45,120,0.08))',
                border: '1.5px solid #ff2d78',
                boxShadow: '0 0 20px rgba(255,45,120,0.3)',
              }}
            >
              {checkingOut ? '⏳ PROCESSING...' : `CHECKOUT — $${(totalPrice / 100).toFixed(2)} →`}
            </button>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full font-pixel text-[7px] text-gray-700 hover:text-gray-500 transition-colors tracking-widest py-1"
            >
              CLEAR CART
            </button>

            {/* Stripe trust badge */}
            <div className="flex items-center justify-center gap-2 opacity-40">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(149,144,255,0.8)">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.93 3.477 1.632 3.477 2.678 0 1.05-.965 1.68-2.594 1.68-1.897 0-4.728-.85-6.688-1.986l-.966 5.423c1.548.935 4.33 1.768 7.24 1.768 2.559 0 4.712-.6 6.207-1.834 1.585-1.31 2.402-3.24 2.402-5.66 0-4.095-2.508-5.832-6.335-7.356z"/>
              </svg>
              <span className="font-pixel text-[6px] text-gray-500 tracking-widest">SECURED BY STRIPE</span>
              <span className="font-pixel text-[6px] text-gray-600">·</span>
              <span className="font-pixel text-[6px] text-gray-500 tracking-widest">SSL ENCRYPTED</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

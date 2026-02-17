'use client';

import { useEffect, useRef } from 'react';

/* Deterministic star positions — avoids hydration mismatch */
const STARS = Array.from({ length: 80 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const x = (seed / 233280) * 100;
  const seed2 = (seed * 9301 + 49297) % 233280;
  const y = (seed2 / 233280) * 55;
  const seed3 = (seed2 * 9301 + 49297) % 233280;
  const size = 1 + (seed3 / 233280) * 2.2;
  const seed4 = (seed3 * 9301 + 49297) % 233280;
  const dur = 2 + (seed4 / 233280) * 4;
  const seed5 = (seed4 * 9301 + 49297) % 233280;
  const delay = (seed5 / 233280) * 5;
  return { x, y, size, dur, delay };
});

/* Sun stripe heights — thicker toward horizon */
const SUN_STRIPES = [14, 28, 40, 51, 60, 68, 75, 81, 87, 92, 96];

export default function Header() {
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sun = sunRef.current;
    if (!sun) return;
    let frame = 0;
    let raf: number;
    const animate = () => {
      frame += 0.4;
      sun.style.transform = `translateY(${Math.sin(frame * 0.018) * 4}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header className="relative overflow-hidden">
      {/* ── Starfield ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--dur': `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Synthwave sun ───────────────────────────────────── */}
      <div className="relative flex justify-center pt-20 pb-0 pointer-events-none select-none">
        <div ref={sunRef} className="relative" style={{ width: 340, height: 180 }}>
          {/* Sun body */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-full overflow-hidden"
            style={{
              height: 170,
              background: 'linear-gradient(180deg, #ffb347 0%, #ff6ec7 28%, #ff2d78 52%, #a800ff 80%, #4b0082 100%)',
              boxShadow: '0 0 60px 20px rgba(255,45,120,0.35), 0 0 120px 40px rgba(168,0,255,0.2)',
            }}
          >
            {/* Horizontal stripes that cut through the sun */}
            {SUN_STRIPES.map((top, i) => (
              <div
                key={i}
                className="sun-stripe"
                style={{
                  top: `${top}%`,
                  height: `${3 + i * 0.8}px`,
                }}
              />
            ))}
          </div>
          {/* Glow halo under sun */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 400,
              height: 60,
              background: 'radial-gradient(ellipse at center, rgba(255,45,120,0.5) 0%, transparent 70%)',
              filter: 'blur(16px)',
            }}
          />
        </div>
      </div>

      {/* ── Horizon line ────────────────────────────────────── */}
      <div className="horizon-glow mx-4 sm:mx-8" />

      {/* ── Perspective grid floor ──────────────────────────── */}
      <div
        className="relative h-24 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(168,0,255,0.05) 0%, transparent 100%)',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 96"
          preserveAspectRatio="none"
        >
          {/* Vertical converging lines */}
          {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map((n) => (
            <line
              key={n}
              x1={500 + n * 90}
              y1="0"
              x2={500 + n * 500}
              y2="96"
              stroke="rgba(0,245,255,0.25)"
              strokeWidth="0.8"
            />
          ))}
          {/* Horizontal receding lines */}
          {[15, 30, 45, 58, 70, 80, 88, 94].map((y) => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(0,245,255,0.15)" strokeWidth="0.7" />
          ))}
        </svg>
      </div>

      {/* ── Marquee ticker ──────────────────────────────────── */}
      <div className="overflow-hidden bg-black/70 border-y border-pink-600/30 py-2">
        <div className="marquee-track font-pixel text-[8px] text-pink-400 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mx-8 opacity-90">
              ★ MEGA SALE ★ &nbsp; FREE SHIPPING OVER $50 &nbsp; ★ TOTALLY RADICAL TOYS ★ &nbsp;
              NEW ARRIVALS EVERY FRIDAY &nbsp; ★ GNARLY DEALS ★ &nbsp; AS SEEN ON TV &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero text ───────────────────────────────────────── */}
      <div className="relative z-10 text-center py-10 px-4">
        <div className="flicker inline-block">
          <p className="font-pixel text-[9px] sm:text-[10px] text-pink-400 tracking-[0.5em] mb-3 opacity-80">
            ▶ WELCOME TO
          </p>
          <h1
            className="font-pixel synthwave-sun leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }}
          >
            PIXEL PALACE
          </h1>
          <p
            className="font-pixel neon-cyan tracking-[0.4em] mt-2"
            style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.85rem)' }}
          >
            TOY EMPORIUM
          </p>
        </div>

        <p className="font-vt text-2xl sm:text-3xl text-gray-300 mt-5 tracking-wider">
          The gnarliest toys this side of the galaxy — since{' '}
          <span className="neon-yellow">1982</span>
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#shop"
            className="btn-buy font-pixel text-[9px] px-6 py-3 rounded bg-transparent text-white neon-border-pink hover:bg-white/5 transition-colors"
          >
            SHOP NOW →
          </a>
          <span className="font-pixel text-[7px] text-gray-500 px-5 py-3 border border-gray-800 rounded">
            9 RADICAL PRODUCTS
          </span>
        </div>
      </div>

      <div className="retro-divider mx-4" />
    </header>
  );
}

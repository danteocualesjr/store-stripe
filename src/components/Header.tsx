'use client';

export default function Header() {
  return (
    <header className="relative z-10 text-center py-12 px-4">
      {/* Top marquee banner */}
      <div className="overflow-hidden bg-black/60 border-y border-pink-600/40 py-2 mb-8">
        <div className="marquee-track font-pixel text-[8px] text-pink-400 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mx-8">
              ★ MEGA SALE ★ &nbsp; FREE SHIPPING OVER $50 &nbsp; ★ TOTALLY RADICAL TOYS ★ &nbsp;
              NEW ARRIVALS EVERY FRIDAY &nbsp; ★ GNARLY DEALS ★ &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="flicker mb-2">
        <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl synthwave-sun leading-tight tracking-tight">
          PIXEL PALACE
        </h1>
        <p className="font-pixel text-xs text-cyan-400 tracking-[0.3em] mt-1 neon-cyan">
          TOY EMPORIUM
        </p>
      </div>

      {/* Tagline */}
      <p className="font-vt text-2xl text-gray-300 mt-4 tracking-widest">
        The gnarliest toys this side of the galaxy — since 1982
      </p>

      {/* Synthwave sun decoration */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-48 h-16 overflow-hidden">
          {/* Horizon lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px"
              style={{
                bottom: `${i * 12}px`,
                background: `linear-gradient(90deg, transparent, rgba(255, 45, 120, ${0.2 + i * 0.12}), transparent)`,
                boxShadow: `0 0 4px rgba(255, 45, 120, ${0.2 + i * 0.12})`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="retro-divider mt-6" />
    </header>
  );
}

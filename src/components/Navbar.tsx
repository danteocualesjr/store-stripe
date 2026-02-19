'use client';

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: 'rgba(6,6,26,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,245,255,0.12)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(0,245,255,0.08)',
      }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 group">
        <span
          className="font-pixel text-[10px] synthwave-sun tracking-tight"
          style={{ lineHeight: 1 }}
        >
          PIXEL PALACE
        </span>
        <span
          className="font-pixel text-[6px] text-cyan-500/60 tracking-[0.3em] hidden sm:block"
          style={{ lineHeight: 1 }}
        >
          TOY EMPORIUM
        </span>
      </a>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-pixel text-[6px] text-green-500/70 tracking-wider">LIVE</span>
        </div>

        {/* Stripe badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(99,91,255,0.1)',
            border: '1px solid rgba(99,91,255,0.3)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(149,144,255,0.8)">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.93 3.477 1.632 3.477 2.678 0 1.05-.965 1.68-2.594 1.68-1.897 0-4.728-.85-6.688-1.986l-.966 5.423c1.548.935 4.33 1.768 7.24 1.768 2.559 0 4.712-.6 6.207-1.834 1.585-1.31 2.402-3.24 2.402-5.66 0-4.095-2.508-5.832-6.335-7.356z"/>
          </svg>
          <span className="font-pixel text-[6px] text-purple-300/70 tracking-wider">STRIPE</span>
        </div>

        {/* Shop CTA */}
        <a
          href="#shop"
          className="font-pixel text-[7px] px-4 py-2 rounded-lg text-pink-300 transition-all duration-200"
          style={{
            border: '1px solid rgba(255,45,120,0.35)',
            background: 'rgba(255,45,120,0.08)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,45,120,0.18)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,45,120,0.08)')}
        >
          SHOP ↓
        </a>
      </div>
    </nav>
  );
}

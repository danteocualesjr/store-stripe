export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 pb-12 text-center px-4">
      <div className="retro-divider mb-10" />

      {/* Synthwave sun mini */}
      <div className="flex justify-center mb-8 opacity-40 pointer-events-none">
        <div
          className="rounded-t-full"
          style={{
            width: 120,
            height: 60,
            background: 'linear-gradient(180deg, #ffb347 0%, #ff2d78 45%, #a800ff 100%)',
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-5 max-w-2xl mx-auto">
        <h2 className="font-pixel text-xl synthwave-sun">PIXEL PALACE</h2>

        {/* Stripe badge */}
        <div className="stripe-badge flex items-center gap-3 px-5 py-2.5 rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.93 3.477 1.632 3.477 2.678 0 1.05-.965 1.68-2.594 1.68-1.897 0-4.728-.85-6.688-1.986l-.966 5.423c1.548.935 4.33 1.768 7.24 1.768 2.559 0 4.712-.6 6.207-1.834 1.585-1.31 2.402-3.24 2.402-5.66 0-4.095-2.508-5.832-6.335-7.356z" fill="rgba(99,91,255,0.8)"/>
          </svg>
          <span className="font-pixel text-[7px] text-purple-300 tracking-widest">SECURE CHECKOUT POWERED BY STRIPE</span>
        </div>

        <p className="font-vt text-xl text-gray-600">
          © 1984 Pixel Palace Toy Emporium. All rights rad.
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {['TOTALLY AWESOME TOYS', 'BOGUS RETURNS POLICY', 'MOST EXCELLENT SUPPORT'].map((t, i) => (
            <span key={t} className="font-pixel text-[6px] text-gray-700 flex items-center gap-2">
              {i > 0 && <span className="neon-pink opacity-40">★</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

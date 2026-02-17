export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 pb-10 text-center px-4">
      <div className="retro-divider mb-8" />

      <div className="flex flex-col items-center gap-4">
        {/* Stripe badge */}
        <div className="stripe-badge flex items-center gap-2 px-4 py-2 rounded-full">
          <span className="font-pixel text-[8px] text-purple-300">SECURE CHECKOUT POWERED BY</span>
          <span className="font-pixel text-[10px] text-white tracking-widest">STRIPE</span>
        </div>

        <p className="font-vt text-gray-500 text-xl">
          © 1984 Pixel Palace Toy Emporium. All rights rad.
        </p>

        <div className="flex gap-6 font-pixel text-[7px] text-gray-600">
          <span>TOTALLY AWESOME TOYS</span>
          <span>★</span>
          <span>BOGUS RETURNS POLICY</span>
          <span>★</span>
          <span>MOST EXCELLENT SUPPORT</span>
        </div>
      </div>
    </footer>
  );
}

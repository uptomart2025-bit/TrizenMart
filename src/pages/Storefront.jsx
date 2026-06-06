import ProductCard from '../components/ProductCard.jsx';
import Hero3D from '../components/Hero3D.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Storefront() {
  const { products, loading } = useApp();

  return (
    <div className="min-h-screen bg-brandDark pt-28 pb-16">
      <Hero3D />

      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Hardware Inventory Matrix</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">Premium system catalog</h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto">Browse the 3D store experience with AI-synthesized product inventory and checkout automation.</p>
        </div>

        {loading ? (
          <div className="text-center text-zinc-500 py-20">Loading product assets...</div>
        ) : products.length === 0 ? (
          <div className="glass-panel p-10 text-center text-zinc-300">No products available. Visit the admin portal to seed inventory.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useApp();

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-black/20"
    >
      <div className="relative h-72 overflow-hidden bg-zinc-950">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 mt-1">{product.category}</p>
          </div>
          <span className="text-sm font-bold text-white">${product.price}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
            {product.caseType || 'Premium Case'}
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
            Supported: {product.deviceBrand ? `${product.deviceBrand} ${product.deviceModel}` : product.deviceModel || 'All'}
          </span>
        </div>
        <p className="text-sm leading-6 text-zinc-400 min-h-[3rem]">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 text-xs uppercase tracking-[0.18em] font-semibold transition hover:bg-zinc-200"
        >
          <Plus className="w-4 h-4" /> Add to Base Cart
        </button>
      </div>
    </motion.article>
  );
}

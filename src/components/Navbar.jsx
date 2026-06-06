import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { ShoppingBag, ShieldCheck, LogOut, Cpu } from 'lucide-react';

export default function Navbar() {
  const { cart, isAdmin, setIsAdmin } = useApp();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 glass-panel border-b border-white/10 backdrop-blur-xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 text-white font-semibold tracking-wide uppercase">
        <Cpu className="w-5 h-5 text-zinc-300" />
        TrizenMart
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm text-zinc-300 hover:text-white transition">Store</Link>
        <Link to="/checkout" className="relative text-sm text-zinc-300 hover:text-white transition">
          Checkout
          {totalItems > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white text-black text-[10px] font-bold">
              {totalItems}
            </span>
          )}
        </Link>
        {isAdmin ? (
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-sm text-white uppercase tracking-[0.18em] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Admin
            </Link>
            <button
              type="button"
              onClick={() => { setIsAdmin(false); navigate('/'); }}
              className="text-zinc-400 hover:text-white transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-sm text-zinc-300 hover:text-white transition uppercase tracking-[0.16em]">Staff</Link>
        )}
      </div>
    </nav>
  );
}

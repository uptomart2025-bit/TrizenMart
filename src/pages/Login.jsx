import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Login() {
  const { setIsAdmin } = useApp();
  const [passKey, setPassKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passKey === 'admin123') {
      setIsAdmin(true);
      navigate('/admin');
    } else {
      alert('Authentication failed: invalid security passkey.');
    }
  };

  return (
    <div className="min-h-screen bg-brandDark pt-28 px-6 flex items-center justify-center text-white">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-md rounded-3xl border border-white/10 p-8 space-y-6">
        <div className="text-center">
          <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-emerald-300" />
          <h1 className="text-2xl font-semibold uppercase tracking-[0.2em]">Admin sign-in</h1>
          <p className="text-sm text-zinc-500 mt-2">Secure RBAC gateway for TrizenMart staff operations.</p>
        </div>

        <label className="block text-xs uppercase tracking-[0.24em] text-zinc-500">Passkey</label>
        <input
          type="password"
          value={passKey}
          onChange={(event) => setPassKey(event.target.value)}
          required
          placeholder="Enter your secure staff passkey"
          className="glass-input w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white"
        />

        <button className="w-full rounded-full bg-white text-black uppercase tracking-[0.18em] py-3 font-semibold hover:bg-zinc-200 transition">
          Unlock dashboard
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Trash2, ShoppingCart, Smartphone, MapPin, Mail, User, Package } from 'lucide-react';

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);

    const payload = {
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: total,
      paymentMethod: 'WhatsApp COD',
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const savedOrder = await response.json();

      const lineItems = cart
        .map((item) => `• ${item.name} x${item.quantity} — $${item.price}`)
        .join('\n');

      const message = `⚡ *TRIZENMART ORDER RECEIVED* ⚡\n\n` +
        `*Order ID:* ${savedOrder._id || 'N/A'}\n` +
        `*Tracking ID:* ${savedOrder.trackingId || 'N/A'}\n\n` +
        `*Customer:* ${form.name}\n` +
        `*Email:* ${form.email}\n` +
        `*Phone:* ${form.phone}\n` +
        `*Address:* ${form.address}\n\n` +
        `*Items:*\n${lineItems}\n\n` +
        `*Total:* $${total}\n` +
        `*Payment:* COD`;

      const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
      clearCart();
      window.location.assign(whatsappUrl);
    } catch (error) {
      console.error('Checkout submission error:', error);
      alert('Unable to submit checkout workflow. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brandDark pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-5 h-5 text-zinc-400" />
              <div>
                <h2 className="text-xl font-semibold text-white">Secure Checkout</h2>
                <p className="text-sm text-zinc-400">Finalize your order and launch the WhatsApp fulfillment pipeline.</p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">Your cart is empty. Add premium assets before checkout.</div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-white/5">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-xs text-zinc-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-zinc-400" />
              <div>
                <h3 className="text-base font-semibold text-white">Order summary</h3>
                <p className="text-xs text-zinc-500">Review cart totals before checkout.</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 text-xs text-zinc-500">WhatsApp checkout is triggered after successful order creation.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-zinc-400" />
            <h2 className="text-xl font-semibold text-white">Checkout details</h2>
          </div>

          {['name', 'email', 'phone', 'address'].map((field) => (
            <label key={field} className="block text-xs uppercase tracking-[0.18em] text-zinc-500">
              {field === 'name' ? 'Full name' : field === 'email' ? 'Email address' : field === 'phone' ? 'Phone number' : 'Shipping address'}
              {field === 'address' ? (
                <textarea
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="glass-input mt-2 w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white"
                />
              ) : (
                <input
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="glass-input mt-2 w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white"
                />
              )}
            </label>
          ))}

          <button
            type="submit"
            disabled={submitting || cart.length === 0}
            className="w-full rounded-full bg-white text-black uppercase tracking-[0.18em] py-3 font-semibold hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {submitting ? 'Executing WhatsApp checkout...' : 'Authorize via WhatsApp'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full rounded-full border border-white/10 bg-transparent text-sm text-zinc-300 uppercase tracking-[0.18em] py-3 hover:bg-white/5 transition"
          >
            Continue browsing
          </button>
        </form>
      </div>
    </div>
  );
}


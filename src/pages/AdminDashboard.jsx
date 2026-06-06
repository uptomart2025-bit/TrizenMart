import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import AIExtractorCard from '../components/AIExtractorCard.jsx';
import { PlusCircle, Trash2, Package, RefreshCw, Layers, TrendingUp, Truck, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { isAdmin, products, orders, fetchProducts, fetchOrders } = useApp();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    description: '',
    image: '',
    stock: '',
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin]);

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      setNewProduct({ name: '', sku: '', category: '', price: '', description: '', image: '', stock: '' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Confirm product purge?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const statuses = ['Pending', 'Dispatched', 'In Transit', 'Delivered', 'Returned'];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const grossRevenue = orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
  const deliveredTotal = orders.filter((order) => order.status === 'Delivered').reduce((total, order) => total + (order.totalAmount || 0), 0);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-brandDark pt-28 pb-20 px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">RBAC Admin Dashboard</p>
            <h1 className="text-3xl font-semibold tracking-tight">PostEx Logistics Control</h1>
          </div>
          <button
            type="button"
            onClick={() => { fetchProducts(); fetchOrders(); }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white hover:bg-white/10 transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh data
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Gross Revenue', value: `$${grossRevenue}`, icon: TrendingUp },
            { label: 'Delivered Revenue', value: `$${deliveredTotal}`, icon: CheckCircle },
            { label: 'Total SKUs', value: products.length, icon: Layers },
            { label: 'Order Manifests', value: orders.length, icon: Truck },
          ].map((metric) => (
            <div key={metric.label} className="glass-panel rounded-3xl border border-white/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
                </div>
                <metric.icon className="w-6 h-6 text-zinc-400" />
              </div>
            </div>
          ))}
        </div>

        <AIExtractorCard
          onExtractionComplete={(parsed) => setNewProduct({
            name: parsed.name,
            sku: parsed.sku,
            category: parsed.category,
            price: parsed.price,
            description: parsed.description,
            image: parsed.image,
            stock: parsed.stock,
          })}
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_2fr]">
          <section className="glass-panel rounded-3xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-5">
              <PlusCircle className="w-5 h-5 text-zinc-400" />
              <h2 className="text-lg font-semibold">Create Inventory Asset</h2>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              {[
                { name: 'name', placeholder: 'Product name' },
                { name: 'sku', placeholder: 'SKU' },
                { name: 'category', placeholder: 'Category' },
                { name: 'price', placeholder: 'Price USD', type: 'number' },
                { name: 'stock', placeholder: 'Stock', type: 'number' },
                { name: 'image', placeholder: 'Image URL' },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type || 'text'}
                  name={field.name}
                  value={newProduct[field.name]}
                  onChange={(event) => setNewProduct({ ...newProduct, [field.name]: event.target.value })}
                  placeholder={field.placeholder}
                  required={field.name !== 'image'}
                  className="glass-input w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white"
                />
              ))}
              <textarea
                name="description"
                value={newProduct.description}
                onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
                placeholder="Description"
                rows={3}
                className="glass-input w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white"
              />
              <button type="submit" className="w-full rounded-full bg-white text-black uppercase tracking-[0.18em] py-3 font-semibold hover:bg-zinc-200 transition">
                Add product
              </button>
            </form>
          </section>

          <section className="glass-panel rounded-3xl border border-white/10 p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <Package className="w-5 h-5 text-zinc-400" />
              <h2 className="text-lg font-semibold">Inventory catalog</h2>
            </div>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{product.name}</p>
                      <p className="text-xs text-zinc-500">{product.sku}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <span>${product.price}</span>
                      <span>{product.stock} stock</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="glass-panel rounded-3xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-5">
            <Truck className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-semibold">PostEx Logistics Hub</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-zinc-300">
              <thead className="border-b border-white/10 text-zinc-500 uppercase tracking-[0.18em] text-[10px]">
                <tr>
                  <th className="py-3">Tracking ID</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Total</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 font-semibold text-white">{order.trackingId}</td>
                    <td className="py-4 text-zinc-400">
                      {order.customerName}
                      <div className="text-[10px] text-zinc-500">{order.address}</div>
                    </td>
                    <td className="py-4">${order.totalAmount}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order._id, order.status)}
                        className="rounded-full bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-white/10 transition"
                      >
                        Shift status
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-zinc-500">No order manifests available yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

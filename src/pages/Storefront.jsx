import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import Hero3D from '../components/Hero3D.jsx';
import CaseVisualizer from '../components/CaseVisualizer.jsx';
import { useApp } from '../context/AppContext.jsx';

const brandModels = {
  Apple: ['iPhone 16 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Pro', 'iPhone 13 Pro'],
  Samsung: ['Galaxy S26 Ultra', 'Galaxy S26', 'Galaxy A57 5G', 'Galaxy Z Fold 6'],
  Infinix: ['Infinix Zero X', 'Infinix Note 40', 'Infinix Hot 40', 'Infinix Smart 8'],
  Nothing: ['Nothing Phone 2a', 'Nothing Phone 1', 'Nothing Phone 2', 'Nothing Phone 2a Pro'],
  Tecno: ['Tecno Phantom X3', 'Tecno Camon 20', 'Tecno Spark 20'],
  OnePlus: ['OnePlus 13', 'OnePlus Nord 4', 'OnePlus Ace 3'],
};

const brandIcons = {
  Apple: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16.5 7.5c-.1-1.2.5-2.2 1.3-2.9-1-.8-2.4-1-3-.9-.6.1-1.4.4-1.8.4-.5 0-1.2-.4-2-.4-.8 0-1.6.4-2.1.9-.9.9-1.7 2.4-1.4 3.8.1.3.4.9.8 1.5.2.3.4.6.6.9.3.4.5.7.5 1.1 0 .8-.6 1.2-1.2 1.8-.7.6-1.2 1.4-1.2 2.3 0 1.3 1.1 2 2.2 2.1.9.1 1.4-.2 2.1-.2.7 0 1.2.2 2 .2.7 0 1.3-.2 2-.2.8 0 1.6.5 2.2.5 1 0 2.5-1 2.5-2.3 0-1.2-.8-1.8-1.6-2.4-.7-.5-1.3-1.1-1.3-1.9 0-.8.4-1.2.7-1.5.4-.4 1-1 .8-1.7z" />
    </svg>
  ),
  Samsung: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 8h8" />
    </svg>
  ),
  Infinix: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 19l7-14 7 14H5z" />
      <path d="M12 6v13" />
    </svg>
  ),
  Nothing: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  Tecno: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6h12v12H6z" />
      <path d="M9 9h6" />
      <path d="M9 12h6" />
    </svg>
  ),
  OnePlus: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 4h8" />
      <path d="M12 10v10" />
      <path d="M7 7h10" />
      <path d="M16 4v4" />
    </svg>
  ),
};

export default function Storefront() {
  const { products, loading } = useApp();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const modelOptions = selectedBrand ? brandModels[selectedBrand] : [];

  const filteredProducts = useMemo(
    () => products.filter((product) => {
      if (selectedBrand && product.deviceBrand !== selectedBrand) return false;
      if (selectedModel && product.deviceModel !== selectedModel) return false;
      return true;
    }),
    [products, selectedBrand, selectedModel]
  );

  return (
    <div className="min-h-screen bg-brandDark pt-28 pb-16">
      <Hero3D />

      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Hardware Inventory Matrix</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">Premium smartphone case catalog</h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto">Explore the best premium phone cases with live brand and model filtering for fast discovery.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
          <div className="glass-panel rounded-3xl border border-white/10 p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Brand selector</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Top brand matrix</h3>
              </div>
              <p className="text-sm text-zinc-400">Tap a brand to reveal compatible models.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {Object.keys(brandModels).map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    setSelectedBrand(brand);
                    setSelectedModel('');
                  }}
                  className={`group flex flex-col items-center justify-center gap-2 rounded-3xl border px-4 py-4 text-center text-xs font-semibold transition ${
                    selectedBrand === brand
                      ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200'
                      : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-zinc-200">
                    {brandIcons[brand]}
                  </span>
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl border border-white/10 p-6">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Model filter</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Refine by supported device</h3>
            </div>
            <label className="block text-sm text-zinc-400 mb-3">Select brand first</label>
            <select
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              disabled={!selectedBrand}
              className="glass-input w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white"
            >
              <option value="">{selectedBrand ? 'Choose model' : 'Choose brand first'}</option>
              {modelOptions.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
              <p className="font-semibold text-white">Active filters</p>
              <p className="mt-3 text-xs text-zinc-500">Brand: {selectedBrand || 'All'}</p>
              <p className="text-xs text-zinc-500">Model: {selectedModel || 'All supported models'}</p>
            </div>
          </div>
        </div>

        <CaseVisualizer caseColor="#111827" textureType="glass" />

        {loading ? (
          <div className="text-center text-zinc-500 py-20">Loading product assets...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass-panel p-10 text-center text-zinc-300">No cases matching that brand or model. Try adjusting the filter.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

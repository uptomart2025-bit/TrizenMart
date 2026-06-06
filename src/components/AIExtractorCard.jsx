import { useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export default function AIExtractorCard({ onExtractionComplete }) {
  const [rawText, setRawText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');

  const simulateAIParsing = () => {
    if (!rawText.trim()) return;
    setProcessing(true);
    setStatusText('Initializing inference pipeline...');

    setTimeout(() => setStatusText('Extracting specification metadata...'), 700);
    setTimeout(() => setStatusText('Synthesizing premium product payload...'), 1500);

    setTimeout(() => {
      const parsed = {
        name: 'Trizen Pro Audio Module X',
        sku: `TZM-${Math.floor(1000 + Math.random() * 9000)}`,
        category: 'Audio Engines',
        price: 299,
        description: rawText.substring(0, 160) || 'Automated product specification parser output for premium inventory assets.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        stock: 12,
      };
      onExtractionComplete(parsed);
      setProcessing(false);
      setStatusText('Extraction complete. Ready to ingest.');
    }, 2400);
  };

  return (
    <section className="glass-panel border border-white/10 rounded-3xl p-6 max-w-5xl mx-auto mb-10">
      <div className="flex items-center gap-3 mb-5">
        <Sparkles className="w-5 h-5 text-emerald-300" />
        <div>
          <h2 className="text-base font-semibold uppercase tracking-[0.2em] text-white">AI Spec Parser</h2>
          <p className="text-xs text-zinc-500">Paste raw tech manifests to auto-generate inventory-ready product data.</p>
        </div>
      </div>

      <textarea
        rows={4}
        value={rawText}
        onChange={(event) => setRawText(event.target.value)}
        placeholder="Paste technical spec sheet, invoice details, or product manifest here..."
        className="glass-input w-full rounded-3xl border border-white/10 p-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={simulateAIParsing}
          disabled={processing || !rawText.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black uppercase tracking-[0.16em] text-xs font-semibold px-5 py-3 hover:bg-zinc-200 transition disabled:opacity-50"
        >
          {processing ? 'Parsing spec...' : 'Parse spec'}
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <Terminal className={processing ? 'w-4 h-4 animate-spin' : 'w-4 h-4'} />
          {statusText || 'AI extractor idle.'}
        </div>
      </div>
    </section>
  );
}

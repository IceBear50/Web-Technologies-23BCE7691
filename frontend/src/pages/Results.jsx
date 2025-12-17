import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function Results() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the simulated data stored by Dashboard.jsx
    const stored = sessionStorage.getItem("arp_last_result");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(JSON.parse(stored));
    } else {
      // If no data, go back to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!data) return <div className="p-10 text-white">Loading results...</div>;

  return (
    <div className="min-h-screen p-8 pt-24 text-slate-200">
      <div className="max-w-5xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 text-cyan-400 mb-6 hover:text-cyan-300">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analysis Results</h1>
              <p className="text-slate-400">File: {data.fileName}</p>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-2">
              <CheckCircle size={18} /> Processing Complete
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">SKU Matches Found</h2>
            {data.skuMatches && data.skuMatches.length > 0 ? (
              <div className="grid gap-4">
                {data.skuMatches.map((sku, idx) => (
                  <div key={idx} className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="font-mono text-cyan-300 font-bold">{sku.sku}</div>
                      <div className="text-sm text-slate-400">Match Confidence Score</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{sku.matchScore}%</div>
                      <div className="text-sm text-slate-500">${sku.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-700 rounded-xl">
                 <AlertCircle className="mx-auto mb-2 text-slate-500" />
                 No SKUs matched for this document.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
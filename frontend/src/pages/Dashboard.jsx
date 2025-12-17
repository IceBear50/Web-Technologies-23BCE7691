/* eslint-disable no-empty */
import React, { useState, useEffect } from "react";
import {
  Clock,
  Trash2,
  FolderOpen,
  ArrowRight,
  Activity,
  Zap,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("arp_uploads") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("arp_last_result");
      if (stored) setLastResult(JSON.parse(stored));
    } catch {}
  }, []);

  function handleFile(e) {
    setFile(e.target.files?.[0] || null);
    setError(null);
  }

  function saveHistory(entry) {
    const next = [entry, ...history].slice(0, 10);
    setHistory(next);
    localStorage.setItem("arp_uploads", JSON.stringify(next));
  }

  async function processRFP() {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error();

      const backendData = await response.json();

      const mappedMatches = (backendData.matched_items || [])
        .map((item) => {
          const bestSku = item.top3_skus?.[0];
          if (!bestSku) return null;

          return {
            sku: bestSku.sku_id,
            matchScore: bestSku.confidence || 0,
            compliance: bestSku.confidence >= 80 ? "full" : "review",
            price: "—",
          };
        })
        .filter(Boolean);

      const standardizedResult = {
        id: `res_${Date.now()}`,
        fileName: file.name,
        processedAt: new Date().toISOString(),
        skuMatches: mappedMatches,
      };

      sessionStorage.setItem(
        "arp_last_result",
        JSON.stringify(standardizedResult)
      );

      saveHistory({
        id: standardizedResult.id,
        fileName: standardizedResult.fileName,
        time: standardizedResult.processedAt,
        skuMatches: standardizedResult.skuMatches,
      });

      setLastResult(standardizedResult);
    } catch {
      setError("Backend not reachable");
    } finally {
      setProcessing(false);
    }
  }

  function clearHistory() {
    localStorage.removeItem("arp_uploads");
    setHistory([]);
  }

  return (
    <div className="min-h-screen pt-24 p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="p-8 rounded-2xl glass-panel">
            <h3 className="text-3xl font-bold text-center mb-4">Upload RFP PDF</h3>
            <p className="text-center text-slate-600 mb-6">
              Upload your RFP document for automated analysis
            </p>

            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFile}
                className="hidden"
              />

              <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 transition">
                <div className="text-slate-900 font-medium mb-1">
                  {file ? file.name : "Click to upload PDF"}
                </div>
                <div className="text-sm text-slate-500">
                  PDF files only, up to 20MB
                </div>
              </div>
            </label>

            {error && (
              <div className="mt-4 p-3 border border-red-300 text-red-600 rounded-lg flex items-center gap-2 text-sm">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            {file && (
              <button
                disabled={processing}
                onClick={processRFP}
                className="btn-primary w-full mt-6 py-4 text-lg font-semibold"
              >
                {processing ? "Processing..." : "Analyze RFP"}
              </button>
            )}
          </div>

          <div className="p-6 rounded-2xl glass-panel">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity size={18} /> Analysis Output
            </h3>

            {!lastResult ? (
              <div className="h-40 flex items-center justify-center text-slate-500">
                <Zap size={32} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-slate-500">Document</div>
                    <div className="font-semibold">{lastResult.fileName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">SKUs Matched</div>
                    <div className="text-xl font-bold">
                      {lastResult.skuMatches.length}
                    </div>
                  </div>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-3 text-left">SKU</th>
                        <th className="p-3 text-right">Confidence</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lastResult.skuMatches.map((sku, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3 font-mono">{sku.sku}</td>
                          <td className="p-3 text-right">
                            {sku.matchScore}%
                          </td>
                          <td className="p-3 text-right">
                            {sku.compliance === "full" ? (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                                Fully Compliant
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                                Review Required
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {lastResult.skuMatches.length > 0 && (
                  <button
                    onClick={async () => {
                      const res = await fetch(
                        "http://127.0.0.1:8000/api/generate-pdf",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(lastResult),
                        }
                      );

                      const data = await res.json();
                      window.open(
                        `http://127.0.0.1:8000/${data.pdf_path}`,
                        "_blank"
                      );
                    }}
                    className="btn-secondary mt-4"
                  >
                    Generate Response PDF
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl glass-panel h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h4 className="font-semibold text-sm">Activity Log</h4>
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {history.length === 0 && (
                <div className="h-40 flex flex-col items-center justify-center text-slate-400">
                  <FolderOpen size={32} />
                </div>
              )}

              {history.map((h, i) => (
                <div
                  key={`${h.id}-${i}`}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <div className="text-sm font-medium truncate">
                      {h.fileName}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(h.time).toLocaleTimeString()}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setLastResult({
                        id: h.id,
                        fileName: h.fileName,
                        processedAt: h.time,
                        skuMatches: h.skuMatches || [],
                      })
                    }
                    className="text-blue-600"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

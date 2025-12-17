import React from "react";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";

export default function HowItWorks() {
  return (
    <div className="min-h-screen py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
          How NuevoRFP Works
        </h2>
        <div className="h-1 w-24 bg-linear-to-r from-orange-500 to-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-8">
        <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-orange-400 to-orange-600 rounded-l-2xl"></div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <TbCircleNumber1Filled className="text-6xl text-orange-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">
                Upload RFP PDF
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                The user begins by uploading an RFP document in PDF format. Once
                uploaded, the platform performs a multi-stage ingestion
                pipeline. The PDF is first analyzed to determine whether it
                contains selectable text or requires OCR processing (for scanned
                documents). After text extraction, the system identifies
                structural components such as sections, tables, bullet points,
                and technical specification lines. From this structured text,
                the engine isolates key elements like SKU mentions, product
                descriptions, compliance questions, quantity breakdowns, and
                mandatory requirements. By breaking the RFP into
                machine-readable units, the system creates a clean dataset that
                downstream matching and pricing agents can understand and
                process accurately.
              </p>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-blue-700 rounded-l-2xl"></div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <TbCircleNumber2Filled className="text-6xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">
                Process & Match
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Once the extracted text is available, the matching engine
                compares every detected SKU reference, product descriptor, or
                requirement line against an internal SKU database. This may
                include exact SKU matches, fuzzy matches, semantic similarity
                scoring, and contextual keyword analysis. Each candidate SKU is
                evaluated on metrics such as relevance, match confidence,
                compatibility, and specification compliance. The system then
                ranks potential matches and calculates baseline pricing,
                optional pricing tiers, or bundle pricing depending on your
                internal data.
              </p>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-orange-400 to-orange-600 rounded-l-2xl"></div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <TbCircleNumber3Filled className="text-6xl text-orange-500" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">
                Review & Export
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                After processing is complete, the top-scoring SKUs and pricing
                recommendations are presented to the user in a clean, structured
                result panel. Each match displays a confidence score, pricing
                information, and relevant notes. Users can validate selections,
                override results if needed, and export outputs in formats such
                as JSON or CSV for compliance, reporting, or downstream
                workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

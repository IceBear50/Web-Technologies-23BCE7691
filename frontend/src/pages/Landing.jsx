import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Cpu, CheckCircle, ArrowRight } from 'lucide-react';
import { RiFlowChart } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";

export default function Landing() {
  const [showArchModal, setShowArchModal] = useState(false);
  const [showFlowModal, setShowFlowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-slate-200 text-slate-600 text-sm font-medium mb-8">
            EY Techathon 6.0
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-900">
            Automate RFPs with <br />
            <span className="gradient-text">Agentic Intelligence</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop manually parsing 100-page PDFs. Our multi-agent system extracts
            requirements, matches SKUs, and drafts compliant responses in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="btn-primary px-8 py-4 text-lg font-semibold flex items-center gap-2">
              Start Automation <ArrowRight size={20} />
            </Link>

            <Link to="/signup" className="btn-secondary px-8 py-4 text-lg font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FileText className="w-8 h-8 text-blue-600" />,
              title: "PDF Parsing",
              desc: "Extracts tables, requirements, and technical constraints from complex RFP PDFs."
            },
            {
              icon: <Cpu className="w-8 h-8 text-orange-500" />,
              title: "Agent Swarm",
              desc: "Sales, technical, and pricing agents collaborate to identify optimal SKU matches."
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
              title: "Automated Scoring",
              desc: "Ranks products using confidence-based scoring tailored to each RFP."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-slate-200 bg-slate-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Workflow and Diagrams</h2>
            <p className="text-slate-600">View system architecture and processing flow</p>
          </div>

          <div className="glass-panel p-10 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/how-it-works" className="group p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition-all text-center">
                <Cpu className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                <div className="text-lg font-semibold text-slate-900">Wireframes</div>
                <div className="text-xs text-slate-500 mt-2">View Blueprint →</div>
              </Link>

              <div
                onClick={() => setShowArchModal(true)}
                className="cursor-pointer group p-6 rounded-xl border border-slate-200 hover:border-orange-400 transition-all text-center"
              >
                <FaProjectDiagram className="w-10 h-10 mx-auto mb-4 text-orange-500" />
                <div className="text-lg font-semibold text-slate-900">Architecture</div>
                <div className="text-xs text-slate-500 mt-2">View System Design →</div>
              </div>

              <div
                onClick={() => setShowFlowModal(true)}
                className="cursor-pointer group p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition-all text-center"
              >
                <RiFlowChart className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                <div className="text-lg font-semibold text-slate-900">Flow Chart</div>
                <div className="text-xs text-slate-500 mt-2">View Logic Flow →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showArchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-slate-900">System Architecture</h2>
              <button onClick={() => setShowArchModal(false)} className="text-blue-600">
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8 flex justify-center">
              <img src="src/diagrams/flow-chart.drawio.svg" alt="Architecture Diagram" />
            </div>
          </div>
        </div>
      )}

      {showFlowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-slate-900">System Flow Chart</h2>
              <button onClick={() => setShowFlowModal(false)} className="text-blue-600">
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8 flex justify-center">
              <img src="src/diagrams/architecture-diagram.drawio.svg" alt="Flow Chart" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

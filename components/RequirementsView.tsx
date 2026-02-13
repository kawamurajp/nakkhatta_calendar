import React from 'react';

const RequirementsView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-200 overflow-hidden flex flex-col no-print max-w-6xl mx-auto w-full min-h-[85vh]">
      {/* Documentation Header */}
      <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-stone-50/50">
        <div>
          <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter italic">System Needs</h2>
          <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">Hierarchical Technical Documentation</p>
        </div>
        <button onClick={onClose} className="bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-lg">Back to App</button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Visual Tree Representation Header */}
          <div className="mb-12 font-mono text-[10px] text-stone-500 leading-tight bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
            <pre>{`System Needs
│
├── Requirements
│   │
│   ├── Functional Requirements
│   │   │
│   │   └── Functional Specifications
│   │       │
│   │       ├── Business Logic (Rules, Calculations)
│   │       ├── Application Logic (Workflows, Control)
│   │       └── GUI (Presentation & Interactions)
│   │
│   └── Non-Functional Requirements (Performance, Usability)
│
└── Specifications
    ├── Functional Specifications (Data Hierarchy)
    └── Non-Functional Specifications (Technical Constraints)`}</pre>
          </div>

          {/* Section: Requirements */}
          <div className="space-y-12">
            <section className="relative pl-8 border-l-2 border-amber-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-sm"></div>
              <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tight mb-6">1. Requirements</h3>
              
              <div className="space-y-10 pl-4">
                {/* 1.1 Functional Requirements */}
                <div className="relative pl-6 border-l border-stone-100">
                  <h4 className="text-sm font-black text-amber-600 uppercase tracking-[0.2em] mb-4">1.1 Functional Requirements</h4>
                  
                  <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100 shadow-sm space-y-8">
                    {/* Functional Specifications Tree */}
                    <div>
                      <h5 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">1.1.1 Functional Specifications</h5>
                      
                      <div className="grid gap-6">
                        {/* Business Logic */}
                        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            <span className="font-black text-xs uppercase text-stone-700">Business Logic</span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-relaxed">
                            <strong>Rules & Policies:</strong> Implementation of the <em>Pakkhakhana</em> arithmetic. Logic handles 14/15 day Pakkha variance, seasonal shifts (Hemanta/Gimha/Vassana), and intercalary adjustments (Adhikamāsa/Adhikavāra) to align the 24-month lunar cycle with the solar year.
                          </p>
                        </div>

                        {/* Application Logic */}
                        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            <span className="font-black text-xs uppercase text-stone-700">Application Logic</span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-relaxed">
                            <strong>Workflows & Control:</strong> State management for the current viewing cycle. Orchestrates the lazy-triggering of Gemini 2.5 Flash for image generation when a user navigates to a new season or Pakkha. Manages caching of AI assets to optimize token usage.
                          </p>
                        </div>

                        {/* GUI */}
                        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            <span className="font-black text-xs uppercase text-stone-700">GUI (Presentation Layer)</span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-relaxed">
                            <strong>Visual Behavior:</strong> A4 Landscape high-fidelity rendering. Interactive Pakkha selection via dropdown and side-scrolling. Visual blending of AI-generated murals using CSS <code>mix-blend-multiply</code> to maintain a "printed-on-parchment" aesthetic.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.2 Non-Functional Requirements */}
                <div className="relative pl-6 border-l border-stone-100">
                  <h4 className="text-sm font-black text-amber-600 uppercase tracking-[0.2em] mb-4">1.2 Non-Functional Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
                      <span className="block text-[8px] font-black text-stone-400 uppercase mb-1">Usability & Reliability</span>
                      <p className="text-[11px] text-stone-500 leading-relaxed">Reliable offline conversion once initial data is loaded. Accessible star charts with Wikipedia cross-linking for monastic education.</p>
                    </div>
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm">
                      <span className="block text-[8px] font-black text-stone-400 uppercase mb-1">Performance</span>
                      <p className="text-[11px] text-stone-500 leading-relaxed">Sub-100ms calendar grid updates. High-resolution JPEG exports (4x pixel ratio) for professional physical printing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Specifications */}
            <section className="relative pl-8 border-l-2 border-stone-200 pb-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-300 border-4 border-white shadow-sm"></div>
              <h3 className="text-2xl font-black text-stone-800 uppercase tracking-tight mb-6">2. Specifications</h3>
              
              <div className="grid md:grid-cols-2 gap-8 pl-4">
                {/* 2.1 Functional Specifications */}
                <div>
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">2.1 Functional Specifications</h4>
                  <div className="bg-stone-800 p-8 rounded-[2rem] text-stone-300 shadow-xl">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        <div className="text-[11px] leading-relaxed">
                          <strong className="text-white uppercase tracking-tighter text-[10px] block mb-1">Data Model Hierarchy</strong>
                          Maps the structure from <code>ThaiYear</code> (Solar/Lunar Bridge) down to <code>LunarDay (Titthi)</code>, ensuring every millisecond is accounted for in the 14/15 day Pakkha variance.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        <div className="text-[11px] leading-relaxed">
                          <strong className="text-white uppercase tracking-tighter text-[10px] block mb-1">Nakkhatta Mapping</strong>
                          Strict specification for mansion (mansion #1-27) association per Pakkha cycle number, ensuring correct celestial alignment in the <code>NakkhattaView</code>.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 2.2 Non-Functional Specifications */}
                <div>
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">2.2 Non-Functional Specifications</h4>
                  <div className="bg-stone-50 p-8 rounded-[2rem] border border-stone-200 shadow-sm">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <span className="w-1 h-1 bg-stone-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        <div className="text-[11px] text-stone-600 leading-relaxed">
                          <strong className="text-stone-800 uppercase tracking-tighter text-[10px] block mb-1">Hardware Constraints</strong>
                          Browser-based <code>html-to-image</code> library requires Canvas support. Export logic is calibrated for A4 landscape aspect ratio (1123px x 794px).
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-1 h-1 bg-stone-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        <div className="text-[11px] text-stone-600 leading-relaxed">
                          <strong className="text-stone-800 uppercase tracking-tighter text-[10px] block mb-1">AI Caching Policy</strong>
                          Image persistence logic prevents redundant Gemini API calls by storing base64 strings in application memory for the duration of the user session.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <div className="p-8 bg-stone-50 text-stone-400 text-center flex flex-col items-center gap-2 border-t border-stone-100">
      </div>
    </div>
  );
};

export default RequirementsView;
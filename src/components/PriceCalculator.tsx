import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import { PRICING_ESTIMATES, APPLIANCE_SERVICES, BRANDS } from '../data/servicesData';

interface PriceCalculatorProps {
  onBookWithEstimate: (applianceId: string, issue: string, brand: string, estPrice: number) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onBookWithEstimate }) => {
  const [selectedAppliance, setSelectedAppliance] = useState<string>('washing-machine');
  const [selectedBrand, setSelectedBrand] = useState<string>('Samsung');
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number>(0);

  const currentApplianceData = PRICING_ESTIMATES.find(p => p.applianceId === selectedAppliance) || PRICING_ESTIMATES[0];
  const currentIssue = currentApplianceData.issues[selectedIssueIndex] || currentApplianceData.issues[0];

  const totalMin = currentIssue.laborPrice + currentIssue.estimatedPartsMin;
  const totalMax = currentIssue.laborPrice + currentIssue.estimatedPartsMax;

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Proper Rates & 6-Month Written Warranty</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300">5,000+ Happy Customers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Instant Appliance Repair Cost Estimator
          </h2>
          <p className="mt-3 text-base text-slate-300">
            No surprise bills or hidden charges. Transparent rate schedule backed by our 6-month written warranty on all genuine parts and labor.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto bg-slate-800/90 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="p-6 sm:p-8 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Appliance */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. Choose Appliance
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {APPLIANCE_SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        setSelectedAppliance(srv.id);
                        setSelectedIssueIndex(0);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                        selectedAppliance === srv.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700/60 border border-slate-700'
                      }`}
                    >
                      {srv.name.replace(' Repair', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Brand */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. Select Brand
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {BRANDS.map((brand, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedBrand(brand.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedBrand === brand.name
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Issue */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Select Issue / Symptom
                </label>
                <div className="space-y-2">
                  {currentApplianceData.issues.map((iss, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIssueIndex(index)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedIssueIndex === index
                          ? 'bg-blue-900/40 border border-blue-500/80 text-white'
                          : 'bg-slate-900/50 hover:bg-slate-900 border border-slate-700/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${selectedIssueIndex === index ? 'bg-blue-400' : 'bg-slate-600'}`}></span>
                        <span>{iss.issue}</span>
                      </div>
                      <span className="text-amber-400 font-bold shrink-0">
                        from ₹{iss.laborPrice + iss.estimatedPartsMin}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Live Itemized Quote Output Box */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-xl p-6 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Transparent Rate Card
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                    6-Mo Warranty Included
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-400">Selected Configuration:</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {selectedBrand} • {APPLIANCE_SERVICES.find(s => s.id === selectedAppliance)?.name}
                  </div>
                  <div className="text-xs text-blue-300 mt-1 line-clamp-1">
                    Problem: {currentIssue.issue}
                  </div>
                </div>

                {/* Line items */}
                <div className="mt-5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Doorstep Diagnostic Inspection:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="line-through text-slate-500">₹199</span>
                      <span className="text-emerald-400 font-bold">FREE (waived)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Certified Technician Labor:</span>
                    <span className="font-semibold text-white">₹{currentIssue.laborPrice}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>OEM Spare Parts ({currentIssue.estimatedParts}):</span>
                    <span className="font-semibold text-white">
                      {currentIssue.estimatedPartsMax === 0 ? 'Not required' : `₹${currentIssue.estimatedPartsMin} - ₹${currentIssue.estimatedPartsMax}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-300">Total Estimated Cost:</div>
                      <div className="text-[10px] text-slate-400">Includes taxes & 6-month warranty</div>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading">
                      ₹{totalMin}{totalMin !== totalMax ? ` - ₹${totalMax}` : ''}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onBookWithEstimate(selectedAppliance, currentIssue.issue, selectedBrand, totalMin)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <span>Book Doorstep Service With This Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pay only after repair is completed and tested</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

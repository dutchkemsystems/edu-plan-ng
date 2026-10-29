import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Zap,
  FlaskConical,
  TrendingUp,
  Cpu,
  Sun,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Scale,
  BatteryCharging,
  Sliders,
  Award
} from 'lucide-react';

export const STEMLabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'balogun' | 'bridge' | 'cassava' | 'solar'>('balogun');

  // Simulation 1: Balogun Market
  const [costPrice, setCostPrice] = useState(45000);
  const [itemsCount, setItemsCount] = useState(120);
  const [profitMargin, setProfitMargin] = useState(25);

  const totalProfit = Math.round(costPrice * (profitMargin / 100));
  const totalSellingPrice = costPrice + totalProfit;
  const unitSellingPrice = Math.round((totalSellingPrice / itemsCount) * 100) / 100;
  const unitCostPrice = Math.round((costPrice / itemsCount) * 100) / 100;

  // Simulation 2: Third Mainland Bridge
  const [trafficLoad, setTrafficLoad] = useState(35); // tonnes
  const [bridgeSpan, setBridgeSpan] = useState(30); // meters

  // Deflection in mm: approx formula for demo visualization
  const deflectionMm = Math.round((trafficLoad * Math.pow(bridgeSpan, 2)) / 1400 * 10) / 10;
  const isBridgeSafe = deflectionMm < 35;

  // Simulation 3: Cassava Titration
  const [fermentationDays, setFermentationDays] = useState(3);
  const [naohVolume, setNaohVolume] = useState(22.5);

  // Cyanide ppm drops with days, pH moves toward 4.2–4.8
  const cyanidePpm = Math.max(5, Math.round(90 * Math.exp(-0.45 * fermentationDays)));
  const calculatedPh = (3.2 + fermentationDays * 0.35 + (naohVolume - 20) * 0.04).toFixed(2);
  const isGarriSafe = cyanidePpm < 20 && parseFloat(calculatedPh) >= 4.0;

  // Simulation 4: Solar Inverter
  const [fans, setFans] = useState(4);
  const [lights, setLights] = useState(6);
  const [laptops, setLaptops] = useState(1);
  const [batteryAh, setBatteryAh] = useState(200);

  const totalLoadWatts = fans * 65 + lights * 18 + laptops * 65;
  const batteryVoltage = 12;
  const usableBatteryWh = batteryAh * batteryVoltage * 0.8; // 80% DoD
  const backupHours = totalLoadWatts > 0 ? (usableBatteryWh / totalLoadWatts).toFixed(1) : '99';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
            <span>NERDC Standardized STEM Realia Laboratory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Nigerian Real-World STEM Simulation Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bridge abstract textbook equations with physical Nigerian infrastructure, commerce, and agricultural biochemistry. Designed for classroom demonstrations, chalkboard illustrations, and student lab activities.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/10 overflow-x-auto">
          {[
            { id: 'balogun', label: 'Balogun Market Trade (Math/Econ)', icon: TrendingUp },
            { id: 'bridge', label: 'Third Mainland Bridge (Physics)', icon: Activity },
            { id: 'cassava', label: 'Garri Fermentation (Chemistry)', icon: FlaskConical },
            { id: 'solar', label: 'Classroom Solar Sizer (Tech)', icon: Sun },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIMULATION 1: Balogun Market Profit & Unit Cost */}
      {activeTab === 'balogun' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5 lg:col-span-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Marketplace Parameters
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Balogun Textile
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Batch Cost Price:</span>
                  <span className="font-mono text-emerald-800 font-bold">₦{costPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Quantity Purchased:</span>
                  <span className="font-mono text-slate-800 font-bold">{itemsCount} units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={itemsCount}
                  onChange={(e) => setItemsCount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Target Profit Margin:</span>
                  <span className="font-mono text-amber-700 font-bold">{profitMargin}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-900 block">WAEC Chief Examiner Rule:</span>
              <p>Candidates must clearly state Profit = CP × (Margin/100) and Total SP = CP + Profit before dividing by quantity.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6 lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Balogun Commercial Realia Live Outputs
              </h3>
              <p className="text-xs text-slate-500">
                Formula: SP = CP(1 + P%) = ₦{costPrice.toLocaleString()} × {1 + profitMargin / 100} = ₦{totalSellingPrice.toLocaleString()}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total Revenue</span>
                  <div className="text-xl font-extrabold text-emerald-800 font-mono mt-1">
                    ₦{totalSellingPrice.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Net Profit</span>
                  <div className="text-xl font-extrabold text-amber-800 font-mono mt-1">
                    ₦{totalProfit.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Unit Retail Price</span>
                  <div className="text-xl font-extrabold text-blue-800 font-mono mt-1">
                    ₦{unitSellingPrice.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Unit Cost Price</span>
                  <div className="text-xl font-extrabold text-purple-800 font-mono mt-1">
                    ₦{unitCostPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Graphical Breakdown Bar */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Financial Proportion Bar:</span>
                <div className="h-6 w-full rounded-xl bg-slate-100 flex overflow-hidden border border-slate-200">
                  <div
                    className="bg-slate-700 h-full flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ width: `${Math.round((costPrice / totalSellingPrice) * 100)}%` }}
                  >
                    Cost: {Math.round((costPrice / totalSellingPrice) * 100)}%
                  </div>
                  <div
                    className="bg-emerald-600 h-full flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ width: `${Math.round((totalProfit / totalSellingPrice) * 100)}%` }}
                  >
                    Profit: {Math.round((totalProfit / totalSellingPrice) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Chalkboard summary steps available for 1-click export to Lesson Note.</span>
              <span className="text-emerald-700 font-bold">Grade A1 Ready</span>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 2: Third Mainland Bridge Deflection */}
      {activeTab === 'bridge' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5 lg:col-span-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Structural Load Factors
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Lagoon Span
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Trailer Traffic Load:</span>
                  <span className="font-mono text-blue-800 font-bold">{trafficLoad} Tonnes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="70"
                  step="5"
                  value={trafficLoad}
                  onChange={(e) => setTrafficLoad(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Beam Span Distance:</span>
                  <span className="font-mono text-slate-800 font-bold">{bridgeSpan} Meters</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="5"
                  value={bridgeSpan}
                  onChange={(e) => setBridgeSpan(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-900 block">Physics Curriculum Standard:</span>
              <p>Senior Secondary Physics Section B (Mechanics of Elasticity & Young’s Modulus for Pre-stressed Concrete).</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Beam Deflection & Statics Visualization
              </h3>
              <p className="text-xs text-slate-500">
                Third Mainland Bridge Pre-stressed Box Girder Concrete Section
              </p>

              {/* Graphic Simulation of Bridge Beam */}
              <div className="mt-6 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-6">
                  <span>Lagoon Pier A</span>
                  <span>Mid-Span Sensor</span>
                  <span>Lagoon Pier B</span>
                </div>

                {/* Animated Bridge Graphic */}
                <div className="relative h-20 flex items-center justify-center">
                  {/* Left Pier */}
                  <div className="absolute left-0 bottom-0 w-8 h-16 bg-slate-700 rounded-t-lg" />
                  {/* Right Pier */}
                  <div className="absolute right-0 bottom-0 w-8 h-16 bg-slate-700 rounded-t-lg" />

                  {/* Deflected Beam Curve */}
                  <svg className="w-full h-16 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
                    <path
                      d={`M 0 5 Q 50 ${5 + Math.min(18, deflectionMm * 0.45)} 100 5`}
                      fill="none"
                      stroke={isBridgeSafe ? '#10b981' : '#f43f5e'}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Vehicle Icon on Bridge */}
                  <div
                    className="absolute text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded shadow-md transition-all duration-300"
                    style={{ top: `${Math.min(30, 8 + deflectionMm * 0.5)}px` }}
                  >
                    🚛 {trafficLoad}T
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Calculated Mid-Span Deflection:</span>
                    <span className="font-mono font-bold text-white text-base">{deflectionMm} mm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Safety Status:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                        isBridgeSafe ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isBridgeSafe ? 'SAFE (Within Federal Limits)' : 'CRITICAL DEFLECTION'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 3: Cassava Fermentation & Titration pH Lab */}
      {activeTab === 'cassava' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5 lg:col-span-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fermentation Controls
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Garri Processing
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Fermentation Period:</span>
                  <span className="font-mono text-amber-800 font-bold">{fermentationDays} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={fermentationDays}
                  onChange={(e) => setFermentationDays(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>0.1M NaOH Titrant Added:</span>
                  <span className="font-mono text-slate-800 font-bold">{naohVolume} mL</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="0.5"
                  value={naohVolume}
                  onChange={(e) => setNaohVolume(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-900 block">Biochemistry & Food Safety:</span>
              <p>Unfermented cassava contains linamarin (cyanogenic glycoside). Fermentation by lactic acid bacteria reduces cyanide to below 20 ppm safe limit.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Titration Endpoint & Food Safety Metrics
              </h3>
              <p className="text-xs text-slate-500">
                Volumetric neutralisation of organic acids produced during cassava mash fermentation
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Acidity (pH Level)</span>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                    {calculatedPh}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Optimum: 4.2 – 4.8</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Cyanide Residue</span>
                  <div className={`text-2xl font-black font-mono mt-1 ${cyanidePpm < 20 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {cyanidePpm} ppm
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Threshold: &lt; 20 ppm</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">NAFDAC / OEQA Quality</span>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                        isGarriSafe ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isGarriSafe ? 'Fit For Consumption' : 'Requires More Fermentation'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 4: Classroom Solar Inverter Load Manager */}
      {activeTab === 'solar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5 lg:col-span-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Classroom Appliances
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                NEPA Outage Mode
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Ceiling Fans (65W each):</span>
                  <span className="font-mono text-slate-800 font-bold">{fans} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={fans}
                  onChange={(e) => setFans(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>LED Lights (18W each):</span>
                  <span className="font-mono text-slate-800 font-bold">{lights} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={lights}
                  onChange={(e) => setLights(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Teacher Laptops (65W each):</span>
                  <span className="font-mono text-slate-800 font-bold">{laptops} units</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={laptops}
                  onChange={(e) => setLaptops(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Battery Capacity (12V):</span>
                  <span className="font-mono text-emerald-800 font-bold">{batteryAh} Ah</span>
                </div>
                <select
                  value={batteryAh}
                  onChange={(e) => setBatteryAh(Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
                >
                  <option value={100}>100 Ah (Standard Tubular)</option>
                  <option value={150}>150 Ah (Deep Cycle)</option>
                  <option value={200}>200 Ah (Standard Inverter Battery)</option>
                  <option value={400}>400 Ah (Dual Bank Inverter)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Inverter Autonomy & Load Diagnostics
              </h3>
              <p className="text-xs text-slate-500">
                Calculates power consumption and runtime to maintain learning during national grid power interruptions
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Total Power Draw</span>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                    {totalLoadWatts} W
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Active Load</span>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold">Estimated Runtime</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
                    {backupHours} Hours
                  </div>
                  <span className="text-[10px] text-emerald-800 block mt-0.5">On {batteryAh}Ah Battery</span>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                  <span className="text-[10px] text-amber-800 uppercase font-bold">School Period Cover</span>
                  <div className="text-2xl font-black text-amber-800 font-mono mt-1">
                    {Math.min(8, Math.floor(Number(backupHours) / 0.7))} Periods
                  </div>
                  <span className="text-[10px] text-amber-700 block mt-0.5">40-minute periods</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

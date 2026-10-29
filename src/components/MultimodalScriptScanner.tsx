import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Award,
  FileText,
  HelpCircle,
  Eye,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScriptScanResult {
  transcribedText: string;
  awardedMarks: number;
  maxMarks: number;
  percentage: number;
  waecGrade: string;
  markBreakdown: Array<{
    criterion: string;
    markType: string;
    awarded: number;
    available: number;
    justification: string;
  }>;
  chiefExaminerPitfallsIdentified: string[];
  studentPedagogicalFeedback: string;
  correctionGuide: string;
}

export const MultimodalScriptScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset_math');
  const [question, setQuestion] = useState(
    'A market trader in Balogun Market, Lagos purchases 120 bags of grain for ₦45,000 and sells them at a 25% profit margin. Calculate: (a) Total Selling Price (b) Individual retail price per bag.'
  );
  const [markingScheme, setMarkingScheme] = useState(
    '(a) Profit = 0.25 * ₦45,000 = ₦11,250 [M1]. Total SP = ₦45,000 + ₦11,250 = ₦56,250 [A1]. (b) Unit Retail Price = ₦56,250 / 120 = ₦468.75 [M1, A1].'
  );
  const [subject, setSubject] = useState('Mathematics');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScriptScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Pre-configured authentic student script benchmarks
  const SAMPLE_PRESETS = [
    {
      id: 'preset_math',
      title: "Chinedu's Handwritten Math Script",
      subject: 'Mathematics',
      level: 'JSS 1 / SSS 1',
      question:
        'A market trader in Balogun Market, Lagos purchases 120 bags of grain for ₦45,000 and sells them at a 25% profit margin. Calculate: (a) Total Selling Price (b) Individual retail price per bag.',
      markingScheme:
        '(a) Profit = 0.25 * ₦45,000 = ₦11,250 [M1]. Total SP = ₦45,000 + ₦11,250 = ₦56,250 [A1]. (b) Unit Retail Price = ₦56,250 / 120 = ₦468.75 [M1, A1].',
      previewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" fill="%23fefce8"><rect width="100%" height="100%" fill="%23fdfbf7" stroke="%23cbd5e1" stroke-width="2"/><line x1="50" y1="0" x2="50" y2="260" stroke="%23f87171" stroke-width="1.5"/><line x1="0" y1="40" x2="400" y2="40" stroke="%2393c5fd" stroke-width="1"/><line x1="0" y1="75" x2="400" y2="75" stroke="%2393c5fd" stroke-width="1"/><line x1="0" y1="110" x2="400" y2="110" stroke="%2393c5fd" stroke-width="1"/><line x1="0" y1="145" x2="400" y2="145" stroke="%2393c5fd" stroke-width="1"/><line x1="0" y1="180" x2="400" y2="180" stroke="%2393c5fd" stroke-width="1"/><line x1="0" y1="215" x2="400" y2="215" stroke="%2393c5fd" stroke-width="1"/><text x="65" y="32" font-family="Caveat, cursive, sans-serif" font-size="16" fill="%231e3a8a">Q4 (a) CP = ₦45,000, Profit = 25%</text><text x="65" y="68" font-family="Caveat, cursive, sans-serif" font-size="16" fill="%231e3a8a">Profit = (25/100) * 45,000 = ₦11,250</text><text x="65" y="103" font-family="Caveat, cursive, sans-serif" font-size="16" fill="%231e3a8a">Total SP = 45,000 + 11,250 = ₦56,250</text><text x="65" y="138" font-family="Caveat, cursive, sans-serif" font-size="16" fill="%231e3a8a">(b) Unit SP = Total SP / 120</text><text x="65" y="173" font-family="Caveat, cursive, sans-serif" font-size="16" fill="%231e3a8a">= ₦56,250 / 120 = ₦468.75</text><text x="65" y="208" font-family="Caveat, cursive, sans-serif" font-size="16" fill="%23047857" font-weight="bold">Ans = ₦468.75 per bag</text></svg>`,
    },
    {
      id: 'preset_biology',
      title: "Amina's Basic Science Biology Script",
      subject: 'Biology / Basic Science',
      level: 'JSS 3 / SSS 1',
      question:
        'Explain the double circulatory system in humans and state two structural differences between an artery and a vein.',
      markingScheme:
        'Double Circulation definition (pulmonary and systemic loops) [2 Marks]. Artery has thick muscular elastic walls with no valves; Vein has thin walls and valves [2 Marks]. Award A1 for clear biological terminology.',
      previewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" fill="%23fdfbf7"><rect width="100%" height="100%" fill="%23fdfbf7" stroke="%23cbd5e1" stroke-width="2"/><line x1="50" y1="0" x2="50" y2="260" stroke="%23f87171" stroke-width="1.5"/><text x="65" y="35" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">Q2. Double Circulation means blood passes</text><text x="65" y="65" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">through the heart twice in one complete circuit:</text><text x="65" y="95" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">1) Pulmonary (Heart -> Lungs -> Heart)</text><text x="65" y="125" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">2) Systemic (Heart -> Body -> Heart)</text><text x="65" y="160" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">Artery: Thick elastic wall, high pressure, no valves.</text><text x="65" y="190" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">Vein: Thin wall, wide lumen, contains valves.</text></svg>`,
    },
    {
      id: 'preset_economics',
      title: "Emeka's Commercial Economics Script",
      subject: 'Economics',
      level: 'SSS 2',
      question:
        'Define Price Elasticity of Demand. If the price of yam in Bodija Market rises from ₦1,000 to ₦1,400 and quantity demanded falls from 80 to 60 tubers, calculate elasticity.',
      markingScheme:
        'Definition: responsiveness of quantity demanded to price change [B1]. % Change in Q = (20/80)*100 = 25% [M1]. % Change in P = (400/1000)*100 = 40% [M1]. Ed = 25/40 = 0.625 (Inelastic) [A1].',
      previewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" fill="%23fdfbf7"><rect width="100%" height="100%" fill="%23fdfbf7" stroke="%23cbd5e1" stroke-width="2"/><line x1="50" y1="0" x2="50" y2="260" stroke="%23f87171" stroke-width="1.5"/><text x="65" y="35" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">Price Elasticity = % change in Qty / % change in Price</text><text x="65" y="70" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">% delta Q = (80 - 60)/80 * 100% = 25%</text><text x="65" y="105" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">% delta P = (1400 - 1000)/1000 * 100% = 40%</text><text x="65" y="140" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%231e293b">Ed = 25% / 40% = 0.625</text><text x="65" y="175" font-family="Caveat, cursive, sans-serif" font-size="15" fill="%23047857" font-weight="bold">Since Ed &lt; 1, demand for yam is INELASTIC.</text></svg>`,
    },
  ];

  const handleSelectPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setSelectedPresetId(preset.id);
    setSubject(preset.subject);
    setQuestion(preset.question);
    setMarkingScheme(preset.markingScheme);
    setSelectedImage(preset.previewSvg);
    setScanResult(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setSelectedPresetId('custom_upload');
      setScanResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleScanAndGrade = async () => {
    setIsScanning(true);
    setErrorMsg(null);
    try {
      const payload = {
        imageBase64: selectedImage || SAMPLE_PRESETS[0].previewSvg,
        mimeType: selectedImage?.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/jpeg',
        question,
        markingScheme,
        subject,
        maxMarks: 10,
        examType: 'WAEC / NECO Theory Standard',
      };

      const res = await fetch('/api/ai/scan-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setScanResult(data.data);
        confetti({ particleCount: 75, spread: 65 });
      } else {
        setErrorMsg('Could not process script scanning. Please check image legibility.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error communicating with vision OCR server.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-flex mb-2">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multimodal Vision OCR · Phase 7 AI Script Scanner</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Student Handwritten Script Scanner & Examiner</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Photograph or upload student paper answer sheets. Gemini vision transcribes Nigerian handwriting and awards WAEC/NECO M1, A1, B1 marks automatically.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Student Photo</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1">
          Sample Nigerian Scripts:
        </span>
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedPresetId === preset.id
                ? 'bg-slate-900 text-white shadow-2xs font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>{preset.title}</span>
          </button>
        ))}
      </div>

      {/* Main Two-Column Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Script Image & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Handwritten Test Paper</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {selectedPresetId === 'custom_upload' ? 'Custom Photo' : 'Verified WAEC Hall Sample'}
              </span>
            </div>

            {/* Visual Image Preview */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-900/5 shadow-inner">
              <img
                src={selectedImage || SAMPLE_PRESETS[0].previewSvg}
                alt="Candidate Written Script"
                className="w-full h-auto object-contain max-h-[300px] mx-auto"
              />
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">Exam Question:</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
                className="w-full text-[11px] p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
              />
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">Confidential Marking Scheme:</label>
              <textarea
                value={markingScheme}
                onChange={(e) => setMarkingScheme(e.target.value)}
                rows={2}
                className="w-full text-[11px] p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
              />
            </div>

            <button
              onClick={handleScanAndGrade}
              disabled={isScanning}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transcribing & Scoring Script via Vision OCR...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Scan & Grade Handwritten Script</span>
                </>
              )}
            </button>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Transcription & Examiner Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!scanResult ? (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3 py-16">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Awaiting Script Scan
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Click <strong>"Scan & Grade Handwritten Script"</strong> to transcribe the student's solution, allocate WAEC Method and Accuracy marks, and generate feedback.
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Score & Grade Hero */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Chief Examiner Audit Report
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {subject} Script Evaluation
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard: WAEC / NECO Senior School Certificate Marking Matrix
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Awarded</span>
                      <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {scanResult.awardedMarks} / {scanResult.maxMarks}
                      </span>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm border border-emerald-300">
                      {scanResult.waecGrade}
                    </div>
                  </div>
                </div>

                {/* Transcribed Handwritten Text */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OCR Verbatim Handwriting Transcription:</span>
                  </span>
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto border border-slate-800">
                    {scanResult.transcribedText}
                  </pre>
                </div>
              </div>

              {/* Step-by-Step Mark Breakdown Table */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Examiner Mark Allocation (M1, A1, B1)
                </span>
                <div className="space-y-2 text-xs">
                  {scanResult.markBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{item.criterion}</span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.markType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">{item.justification}</p>
                      </div>
                      <span className="font-mono font-bold text-emerald-700 text-xs shrink-0 tabular-nums">
                        +{item.awarded} / {item.available}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pitfalls & Student Pedagogical Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <span className="text-xs font-bold text-amber-950 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Candidate Blunders Flagged</span>
                  </span>
                  <ul className="text-xs text-amber-900 list-disc list-inside space-y-1 leading-relaxed">
                    {scanResult.chiefExaminerPitfallsIdentified.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold text-emerald-950 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Teacher Pedagogical Remarks</span>
                  </span>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {scanResult.studentPedagogicalFeedback}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

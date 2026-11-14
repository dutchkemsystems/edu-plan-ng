import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Star,
  Download,
  Eye,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign,
  PlusCircle,
  X,
  RefreshCw,
  FileText,
  ShieldCheck,
  Lock,
  Globe2,
  Search,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAuthHeaders } from '../lib/api.ts';
import { DashboardStats, TeacherUser } from '../types/index.ts';

export const ALL_MARKETPLACE_SUBJECTS = [
  'Mathematics',
  'English Studies',
  'Biology',
  'Chemistry',
  'Physics',
  'Agricultural Science',
  'Economics',
  'Financial Accounting',
  'Commerce',
  'Civic Education',
  'Government',
  'Geography',
  'Technical Drawing',
  'Computer Studies',
  'Èdè Yorùbá',
  'Asụsụ Igbo',
  'Harshen Hausa',
  'Cultural & Creative Arts',
  'Physical and Health Education (PHE)',
  'Christian Religious Studies (CRS)',
  'Islamic Religious Studies (IRS)',
  'Basic Technology',
  'Integrated Science',
  'Social Studies',
];

interface MarketplaceItem {
  id: string;
  title: string;
  authorName: string;
  authorSchool: string;
  authorAvatar: string;
  subject: string;
  level: string;
  term: number;
  country: 'Nigeria' | 'Ghana' | 'Sierra Leone';
  currency: string;
  price: number;
  rating: number;
  reviewsCount: number;
  downloadsCount: number;
  badge?: string;
  description: string;
  features: string[];
  previewSample: string;
}

interface MarketplacePageProps {
  onNavigateToComposer?: (planId: string) => void;
  user?: TeacherUser | null;
  stats?: DashboardStats | null;
  onOpenUpgrade?: (message: string, requiredTier?: string, title?: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onNavigateToComposer,
  user,
  onOpenUpgrade,
}) => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<MarketplaceItem | null>(null);

  // Purchase state
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseNotice, setPurchaseNotice] = useState<{
    message: string;
    forkedPlanId: string;
  } | null>(null);

  // Publish pack modal
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishTitle, setPublishTitle] = useState('');
  const [publishSubject, setPublishSubject] = useState('Mathematics');
  const [publishLevel, setPublishLevel] = useState('SSS 2');
  const [publishPrice, setPublishPrice] = useState('1500');
  const [publishDesc, setPublishDesc] = useState('');
  const [publishSample, setPublishSample] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    fetchMarketplaceItems();
  }, [selectedCountry, selectedSubject, searchQuery]);

  const fetchMarketplaceItems = async () => {
    setIsLoading(true);
    try {
      let url = '/api/marketplace/items?';
      if (selectedCountry !== 'all') url += `country=${selectedCountry}&`;
      if (selectedSubject !== 'all') url += `subject=${encodeURIComponent(selectedSubject)}&`;
      if (searchQuery.trim()) url += `search=${encodeURIComponent(searchQuery.trim())}&`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.items) {
        setItems(data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (item: MarketplaceItem) => {
    setPurchasingId(item.id);
    setPurchaseError(null);
    try {
      const res = await fetch('/api/marketplace/purchase', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          itemId: item.id,
          teacherName: user?.name || 'Teacher',
          paymentMethod: 'wallet',
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          onOpenUpgrade?.(
            data.message || data.error || 'Your current plan library save limit does not permit saving purchased packs.',
            data.requiredTier || 'b2c_monthly',
            'Library Save Limit Reached'
          );
        } else {
          setPurchaseError(data.message || data.error || 'Purchase could not be completed.');
        }
        return;
      }

      if (data.success) {
        confetti({ particleCount: 90, spread: 70 });
        setPurchaseNotice({
          message: data.message,
          forkedPlanId: data.forkedLessonPlanId,
        });
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, downloadsCount: i.downloadsCount + 1 } : i
          )
        );
      }
    } catch (e: any) {
      setPurchaseError(e?.message || 'Network error while processing purchase.');
    } finally {
      setPurchasingId(null);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publishTitle.trim()) return;
    setIsPublishing(true);
    try {
      const res = await fetch('/api/marketplace/publish', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify({
          title: publishTitle,
          subject: publishSubject,
          level: publishLevel,
          price: parseInt(publishPrice, 10) || 1500,
          description: publishDesc || 'Verified master lesson notes and chalkboard summaries.',
          previewSample: publishSample || 'Sample lesson introduction with authentic Nigerian context...',
          features: [
            '13-Week Detailed Notes',
            'Chalkboard Diagram Layouts',
            'WAEC/NECO Chief Examiner Pitfall Guides',
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        confetti({ particleCount: 70, spread: 60 });
        setShowPublishModal(false);
        setPublishTitle('');
        setPublishDesc('');
        setPublishSample('');
        fetchMarketplaceItems();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPublishing(false);
    }
  };

  const formatPrice = (item: MarketplaceItem) => {
    if (item.currency === 'GHS') return `GH₵${item.price}`;
    if (item.currency === 'SLE') return `Le ${item.price.toLocaleString()}`;
    return `₦${item.price.toLocaleString('en-NG')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Marketplace Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>West African Teacher Creator Economy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              EduPlan Master Teacher Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Buy and sell peer-reviewed 13-week teaching portfolios, WAEC 10-year theory solutions, and localized STEM lab realia. Creators retain <strong>80% direct royalty</strong> transferred to Nigerian & Ghanaian accounts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPublishModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Monetize Your Teaching Notes</span>
            </button>
          </div>
        </div>

        {/* Creator Economy Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Creator Revenue Split</span>
            <span className="text-lg font-black text-amber-400 font-mono">80% / 20%</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Disbursed to Teachers</span>
            <span className="text-lg font-black text-emerald-400 font-mono">₦2,450,000+</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Peer-Reviewed Packs</span>
            <span className="text-lg font-black text-white font-mono">1,420 Master Items</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Average Rating</span>
            <span className="text-lg font-black text-amber-300 font-mono">4.92 ★ (Top Tier)</span>
          </div>
        </div>
      </div>

      {purchaseError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-rose-900">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{purchaseError}</span>
        </div>
      )}

      {/* Purchase Notification Banner */}
      {purchaseNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900">{purchaseNotice.message}</p>
              <p className="text-[11px] text-emerald-700">
                You can immediately edit, personalize, and export this lesson plan.
              </p>
            </div>
          </div>
          {onNavigateToComposer && (
            <button
              onClick={() => onNavigateToComposer(purchaseNotice.forkedPlanId)}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>Open in Composer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Filters: Search, Country & Subject */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packs by topic, subject, school or author..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Country Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'All Curricula 🌍' },
              { id: 'nigeria', label: 'Nigeria (NERDC) 🇳🇬' },
              { id: 'ghana', label: 'Ghana (GES) 🇬🇭' },
              { id: 'sierraleone', label: 'Sierra Leone 🇸🇱' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCountry === c.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 max-w-[200px]"
            >
              <option value="all">All Subjects (24 Disciplines)</option>
              {ALL_MARKETPLACE_SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading master marketplace resources...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5 space-y-3.5">
                {/* Author Info & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.authorAvatar}
                      alt={item.authorName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        {item.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">
                        {item.authorSchool}
                      </span>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title & Metadata */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.subject}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {item.level} · Term {item.term}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {item.country === 'Nigeria' ? '🇳🇬' : item.country === 'Ghana' ? '🇬🇭' : '🇸🇱'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.features.slice(0, 3).map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                {/* Rating & Downloads */}
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Download className="w-3.5 h-3.5" />
                    <span>{item.downloadsCount} downloads</span>
                  </span>
                </div>
              </div>

              {/* Bottom Card Actions & Price */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                    Instant Access
                  </span>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {formatPrice(item)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition-colors"
                    title="Inspect Watermarked Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={purchasingId === item.id}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {purchasingId === item.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <ShoppingBag className="w-3.5 h-3.5" />
                    )}
                    <span>Buy & Fork</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: Watermarked Sample Preview */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold block">Watermarked Sample Preview</span>
                <h3 className="text-base font-bold text-white line-clamp-1">{previewItem.title}</h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="text-6xl font-black text-slate-900 rotate-[-25deg]">
                  EDUPRISE WATERMARK
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Instructional Excerpt:</span>
                <div className="font-mono text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {previewItem.previewSample}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block">Full Resource Pack Inclusions:</span>
                <ul className="space-y-1">
                  {previewItem.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900">
                Price: <span className="text-emerald-700 font-mono text-base">{formatPrice(previewItem)}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handlePurchase(previewItem);
                    setPreviewItem(null);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy & Fork to My Plans</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Monetize & Publish Master Pack */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <form onSubmit={handlePublish}>
              <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 font-bold block">Creator Monetization</span>
                  <h3 className="text-base font-bold text-white">Publish Master Instructional Pack</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="text-slate-400 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pack Title</label>
                  <input
                    type="text"
                    required
                    value={publishTitle}
                    onChange={(e) => setPublishTitle(e.target.value)}
                    placeholder="e.g. SSS 2 Physics Light & Optics 13-Week Realia Dossier"
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={publishSubject}
                      onChange={(e) => setPublishSubject(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                    >
                      {ALL_MARKETPLACE_SUBJECTS.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class Level</label>
                    <select
                      value={publishLevel}
                      onChange={(e) => setPublishLevel(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                    >
                      <option value="JSS 1">JSS 1 (Basic 7)</option>
                      <option value="JSS 2">JSS 2 (Basic 8)</option>
                      <option value="JSS 3">JSS 3 (BECE)</option>
                      <option value="SSS 1">SSS 1</option>
                      <option value="SSS 2">SSS 2</option>
                      <option value="SSS 3">SSS 3 (WAEC/NECO)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price in Naira (₦) · You earn 80% (₦{Math.round(parseInt(publishPrice || '0', 10) * 0.8).toLocaleString()})
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="10000"
                    step="100"
                    value={publishPrice}
                    onChange={(e) => setPublishPrice(e.target.value)}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    value={publishDesc}
                    onChange={(e) => setPublishDesc(e.target.value)}
                    placeholder="Briefly highlight what is included (chalkboard diagrams, past questions, realia)..."
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 min-h-[70px]"
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                  ⚡ Royalty Payout: Funds from each sale are credited automatically to your verified Nigerian teacher bank account via Kora Pay instant settlements.
                </div>
              </div>

              <div className="p-4 bg-slate-50 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  {isPublishing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <PlusCircle className="w-3.5 h-3.5" />
                  )}
                  <span>Publish & Start Earning</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

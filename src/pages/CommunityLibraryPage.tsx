import React, { useState } from 'react';
import {
  Users2,
  Star,
  GitFork,
  Search,
  BookOpen,
  CheckCircle2,
  MessageSquare,
  Share2,
  Sparkles,
  MapPin,
  ThumbsUp,
  PlusCircle,
  X,
  Filter
} from 'lucide-react';
import { LessonPlan } from '../types/index.ts';
import { createLessonPlan } from '../lib/api.ts';
import confetti from 'canvas-confetti';

interface CommunityLibraryPageProps {
  onPlanForked: (plan: LessonPlan) => void;
}

interface CommunityPlanItem {
  id: string;
  title: string;
  author: string;
  school: string;
  state: string;
  level: string;
  subject: string;
  rating: number;
  ratingCount: number;
  downloads: number;
  trcnCertified: boolean;
  objectives: string[];
  materials: string[];
  reviews: { author: string; school: string; rating: number; comment: string }[];
}

export const CommunityLibraryPage: React.FC<CommunityLibraryPageProps> = ({ onPlanForked }) => {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  // Rating modal state
  const [ratingModalPlan, setRatingModalPlan] = useState<CommunityPlanItem | null>(null);
  const [userStarRating, setUserStarRating] = useState(5);
  const [userComment, setUserComment] = useState('');

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTitle, setShareTitle] = useState('');
  const [shareSubject, setShareSubject] = useState('Mathematics');
  const [shareLevel, setShareLevel] = useState('jss-1');

  const [communityPlans, setCommunityPlans] = useState<CommunityPlanItem[]>([
    {
      id: 'comm_01',
      title: 'Quadratic Equations by Factorization & WASSCE Method',
      author: 'Mr. Babatunde Sanusi',
      school: 'Queens College, Yaba',
      state: 'Lagos',
      level: 'sss-1',
      subject: 'General Mathematics',
      rating: 4.9,
      ratingCount: 84,
      downloads: 412,
      trcnCertified: true,
      objectives: [
        'Formulate standard quadratic expressions ax^2 + bx + c = 0',
        'Factorize quadratic trinomials by grouping method',
        'Solve 5 past WASSCE Section B examination problems'
      ],
      materials: ['Graph sheet', 'Quadratic formula flashcards'],
      reviews: [
        {
          author: 'Mrs. Funke Adeleke',
          school: 'Federal Science & Tech College',
          rating: 5,
          comment: 'The step-by-step WASSCE past question breakdown saved my SSS 1 class during revision!'
        }
      ]
    },
    {
      id: 'comm_02',
      title: 'Pollution & Waste Management in Urban Lagos',
      author: 'Mrs. Chinyere Nwosu',
      school: 'Federal Government College, Enugu',
      state: 'Enugu',
      level: 'jss-1',
      subject: 'Basic Science & Technology',
      rating: 4.8,
      ratingCount: 62,
      downloads: 320,
      trcnCertified: true,
      objectives: [
        'Identify 4 types of municipal pollution in Nigerian cities',
        'State causes and health consequences of drainage clogging',
        'Formulate a 3R recycling initiative for secondary schools'
      ],
      materials: ['Plastic waste specimen', 'Recycling bin models'],
      reviews: [
        {
          author: 'Mr. Emeka Okafor',
          school: 'College of Immaculate Conception',
          rating: 5,
          comment: 'Great practical focus on local Nigerian municipal sanitation.'
        }
      ]
    },
    {
      id: 'comm_03',
      title: 'Formal Letter to Local Government Chairman (Roads)',
      author: 'Malam Aliyu Haruna',
      school: 'Barewa College, Zaria',
      state: 'Kaduna',
      level: 'jss-3',
      subject: 'English Studies',
      rating: 5.0,
      ratingCount: 112,
      downloads: 580,
      trcnCertified: true,
      objectives: [
        'Distinguish formal from informal letter layout conventions',
        'Write concise official heading, salutation, and body paragraphs',
        'Apply formal lexical registers suited for civic correspondence'
      ],
      materials: ['Chalkboard layout guide', 'Sample official gazette'],
      reviews: [
        {
          author: 'Grace Danjuma',
          school: 'Command Secondary School, Kaduna',
          rating: 5,
          comment: 'Perfect BECE exam letter format. My students loved the civic context.'
        }
      ]
    },
    {
      id: 'comm_04',
      title: 'Separation of Powers & The 1999 Nigerian Constitution',
      author: 'Dr. Kelechi Amadi',
      school: 'Government Secondary School, Owerri',
      state: 'Imo',
      level: 'jss-3',
      subject: 'Civic Education',
      rating: 4.7,
      ratingCount: 45,
      downloads: 240,
      trcnCertified: true,
      objectives: [
        'Explicate the constitutional functions of the Executive, Legislature, and Judiciary',
        'Explain the principle of checks and balances in Nigeria',
        'Identify key landmark Supreme Court rulings in Nigeria'
      ],
      materials: ['1999 Constitution excerpt', 'Wall chart of 3 Arms of Government'],
      reviews: []
    }
  ]);

  const handleFork = async (plan: CommunityPlanItem) => {
    try {
      const res = await createLessonPlan({
        title: `${plan.title} (Forked from ${plan.author})`,
        level: plan.level,
        subject: plan.subject,
        term: 1,
        week: 1,
        duration: '40 mins',
        objectives: plan.objectives,
        materials: plan.materials,
        previousKnowledge: 'Learners demonstrate prerequisite comprehension.',
        introduction: 'Teacher connects to Nigerian daily context.',
        teacherActivity: 'Teacher demonstrates core concepts on the chalkboard.',
        studentActivity: 'Students take notes and solve practice drills.',
        evaluation: 'Formative questions.',
        assignment: 'Homework assignment from NERDC text.',
        references: `Forked from ${plan.author} (${plan.school}) via EduPlan Community.`,
        status: 'draft',
      });

      onPlanForked(res.lessonPlan);
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingModalPlan) return;

    setCommunityPlans(
      communityPlans.map((p) => {
        if (p.id === ratingModalPlan.id) {
          const newCount = p.ratingCount + 1;
          const newAvg = Number(((p.rating * p.ratingCount + userStarRating) / newCount).toFixed(1));
          const newReviews = userComment
            ? [
                {
                  author: 'Mrs. Amina Balogun',
                  school: "King's College, Lagos",
                  rating: userStarRating,
                  comment: userComment
                },
                ...p.reviews
              ]
            : p.reviews;
          return { ...p, rating: newAvg, ratingCount: newCount, reviews: newReviews };
        }
        return p;
      })
    );

    confetti({ particleCount: 50 });
    setRatingModalPlan(null);
    setUserComment('');
  };

  const handleSharePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareTitle) return;

    const newPlan: CommunityPlanItem = {
      id: `comm_${Date.now()}`,
      title: shareTitle,
      author: 'Mrs. Amina Balogun',
      school: "King's College, Lagos",
      state: 'Lagos',
      level: shareLevel,
      subject: shareSubject,
      rating: 5.0,
      ratingCount: 1,
      downloads: 1,
      trcnCertified: true,
      objectives: ['Analyze standard curriculum objectives', 'Solve guided exercises'],
      materials: ['NERDC Textbook', 'Whiteboard'],
      reviews: []
    };

    setCommunityPlans([newPlan, ...communityPlans]);
    confetti({ particleCount: 80, spread: 70 });
    setIsShareModalOpen(false);
    setShareTitle('');
  };

  const filteredPlans = communityPlans.filter((p) => {
    if (level !== 'all' && p.level !== level) return false;
    if (selectedState !== 'all' && p.state.toLowerCase() !== selectedState.toLowerCase()) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.subject.toLowerCase().includes(q) ||
        p.school.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Users2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Community-Driven Pedagogical Exchange</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Nigerian Teachers' Community Library
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Discover, fork, and peer-rate vetted lesson plans created by TRCN-accredited educators across Nigeria's 36 states and FCT.
          </p>
        </div>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all hover:scale-105 flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish My Plan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topic, author, school..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Class Levels</option>
            <option value="jss-1">JSS 1</option>
            <option value="jss-2">JSS 2</option>
            <option value="jss-3">JSS 3</option>
            <option value="sss-1">SSS 1</option>
            <option value="sss-2">SSS 2</option>
            <option value="sss-3">SSS 3</option>
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
          >
            <option value="all">All States</option>
            <option value="Lagos">Lagos State</option>
            <option value="Kaduna">Kaduna State</option>
            <option value="Enugu">Enugu State</option>
            <option value="Imo">Imo State</option>
            <option value="Abuja">Abuja (FCT)</option>
          </select>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {plan.level.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">• {plan.subject}</span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {plan.state}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mt-1">{plan.title}</h3>
                </div>

                {/* Rating Badge */}
                <button
                  onClick={() => setRatingModalPlan(plan)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold shrink-0 hover:bg-amber-100 transition-colors"
                  title="Click to rate this plan"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{plan.rating}</span>
                  <span className="text-[10px] text-amber-700 font-medium">({plan.ratingCount})</span>
                </button>
              </div>

              {/* Author & Accreditation */}
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                  {plan.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="overflow-hidden">
                  <span className="font-semibold text-gray-900 block truncate">{plan.author}</span>
                  <span className="text-[11px] text-gray-500 block truncate">{plan.school}</span>
                </div>
              </div>

              {/* Objectives Snippet */}
              <div className="space-y-1 text-xs text-gray-600">
                <strong className="text-gray-900 block font-semibold text-[11px] uppercase tracking-wide">
                  Key Behavioral Objectives:
                </strong>
                <ul className="list-disc pl-4 space-y-0.5">
                  {plan.objectives.slice(0, 2).map((obj, idx) => (
                    <li key={idx} className="line-clamp-1">{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Teacher Reviews Preview */}
              {plan.reviews.length > 0 && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1">
                  <div className="flex items-center gap-1 font-semibold text-slate-900">
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>Peer Teacher Endorsement:</span>
                  </div>
                  <p className="italic">"{plan.reviews[0].comment}" — {plan.reviews[0].author}</p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-medium">
                {plan.downloads} teachers forked
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRatingModalPlan(plan)}
                  className="px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors"
                >
                  Rate & Review
                </button>
                <button
                  onClick={() => handleFork(plan)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Fork to My Plans</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RATING & REVIEW MODAL */}
      {ratingModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-4 border border-gray-100">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Rate Lesson Plan</h3>
                <p className="text-xs text-gray-500 truncate max-w-[280px]">{ratingModalPlan.title}</p>
              </div>
              <button
                onClick={() => setRatingModalPlan(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold text-gray-600">Select Star Rating</span>
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserStarRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= userStarRating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-emerald-800">
                  {userStarRating === 5
                    ? 'Exceptional NERDC Standard'
                    : userStarRating === 4
                    ? 'Very Good Quality'
                    : userStarRating === 3
                    ? 'Good Quality'
                    : 'Needs Pedagogical Revision'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Teacher Review / Classroom Feedback (Optional)
                </label>
                <textarea
                  rows={3}
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="e.g. Taught this today in JSS 1. The local market example made the students grasp it immediately!"
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRatingModalPlan(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHARE PLAN MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-4 border border-gray-100">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Publish Plan to Community</h3>
                <p className="text-xs text-gray-500">Share your pedagogical work with 10,000+ Nigerian teachers.</p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSharePlan} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Lesson Plan Title</label>
                <input
                  required
                  type="text"
                  value={shareTitle}
                  onChange={(e) => setShareTitle(e.target.value)}
                  placeholder="e.g. Electric Resistance & Ohm's Law in Nigerian Homes"
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={shareSubject}
                    onChange={(e) => setShareSubject(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Class Level</label>
                  <select
                    value={shareLevel}
                    onChange={(e) => setShareLevel(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                  >
                    <option value="jss-1">JSS 1</option>
                    <option value="jss-2">JSS 2</option>
                    <option value="jss-3">JSS 3</option>
                    <option value="sss-1">SSS 1</option>
                    <option value="sss-2">SSS 2</option>
                    <option value="sss-3">SSS 3</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                Publishing author: <strong>Mrs. Amina Balogun (King's College, Lagos)</strong>. Plans are vetted for NERDC compliance.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Publish to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

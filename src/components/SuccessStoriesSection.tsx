import React, { useState, useMemo } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Sparkles, 
  ThumbsUp, 
  PlusCircle, 
  Search, 
  Wrench, 
  MapPin, 
  UserCheck, 
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';
import { INITIAL_SUCCESS_STORIES, SuccessStoryItem } from '../data/successStoriesData';
import { SubmitStoryModal } from './SubmitStoryModal';
import { FadeInUp, StaggerContainer, StaggerItem } from './ScrollAnimation';

export const SuccessStoriesSection: React.FC = () => {
  const [stories, setStories] = useState<SuccessStoryItem[]>(INITIAL_SUCCESS_STORIES);
  const [activeCategory, setActiveCategory] = useState<'all' | 'washing-machine' | 'refrigerator' | 'ac' | 'microwave'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votedItems, setVotedItems] = useState<Record<string, boolean>>({});

  // Filter stories based on appliance category & search query
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesCategory = activeCategory === 'all' || story.applianceType === activeCategory;
      const matchesSearch = 
        story.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.storyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.technicianName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stories, activeCategory, searchQuery]);

  const handleAddStory = (newStory: SuccessStoryItem) => {
    setStories(prev => [newStory, ...prev]);
  };

  const handleHelpfulVote = (id: string) => {
    if (votedItems[id]) return;
    setStories(prev => prev.map(s => s.id === id ? { ...s, helpfulCount: s.helpfulCount + 1 } : s));
    setVotedItems(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="success-stories" className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Decorative gradient glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <FadeInUp distance={30} duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20 shadow-xs">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Real Customer Social Proof • 1,280+ Verified Doorstep Repairs</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
              Appliance Success Stories
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              Read real doorstep repair experiences, before-after savings, and verified technician reviews from homeowners across Bangalore.
            </p>

            {/* Summary Rating Counter Pill */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-sm text-white">
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-sm font-extrabold text-amber-300">4.9 / 5.0 Rating</span>
                <span className="text-slate-400 font-normal">· 1,280+ Reviews</span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md hover:shadow-blue-500/30 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Submit Your Story</span>
              </button>
            </div>
          </div>
        </FadeInUp>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          {/* Appliance Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              All Stories ({stories.length})
            </button>
            <button
              onClick={() => setActiveCategory('washing-machine')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'washing-machine'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              Washing Machines
            </button>
            <button
              onClick={() => setActiveCategory('refrigerator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'refrigerator'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              Refrigerators
            </button>
            <button
              onClick={() => setActiveCategory('ac')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'ac'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              Split ACs
            </button>
            <button
              onClick={() => setActiveCategory('microwave')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'microwave'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              Microwaves
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locality, technician..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Success Stories Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const initials = story.customerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            return (
              <StaggerItem key={story.id} className="h-full">
                <div className="bg-slate-800/90 border border-slate-700/80 hover:border-blue-500/60 rounded-3xl p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group">
                  
                  <div>
                    {/* Header: Avatar, Name, Verified Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0">
                          {initials}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-white text-sm">
                            {story.customerName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                            <span>{story.locality}</span>
                          </div>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      {story.verified && (
                        <div 
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold shrink-0 shadow-2xs"
                          title="180-Day Written Warranty & Doorstep Service Verified"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Star Rating & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3 pt-2 border-t border-slate-700/60">
                      <div className="flex items-center gap-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {story.date}
                      </span>
                    </div>

                    {/* Appliance Type Tag */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/80 text-[11px] font-semibold">
                        <Wrench className="w-3 h-3 text-blue-400" />
                        <span>{story.applianceLabel}</span>
                      </span>
                    </div>

                    {/* Story Title */}
                    <h3 className="font-heading font-bold text-white text-base leading-snug mb-2 group-hover:text-blue-300 transition-colors">
                      "{story.storyTitle}"
                    </h3>

                    {/* Story Comment */}
                    <p className="text-xs text-slate-300 leading-relaxed min-h-[64px]">
                      {story.comment}
                    </p>

                    {/* Before-After / Repair Highlight Box */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Repair Outcome & Savings:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-normal">
                        {story.repairHighlight}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Technician Credit & Helpful Vote */}
                  <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-medium text-[11px] text-slate-300">
                      <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate max-w-[130px] sm:max-w-[150px]">{story.technicianName}</span>
                    </div>

                    <button
                      onClick={() => handleHelpfulVote(story.id)}
                      disabled={votedItems[story.id]}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        votedItems[story.id]
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600'
                      }`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${votedItems[story.id] ? 'fill-blue-400 text-blue-400' : ''}`} />
                      <span>Helpful ({story.helpfulCount})</span>
                    </button>
                  </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filteredStories.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-3xl border border-slate-700/60 max-w-lg mx-auto">
            <p className="text-sm text-slate-300">No success stories match your search filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-xs font-bold text-blue-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Review Submission Modal Dialog */}
      <SubmitStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitStory={handleAddStory}
      />
    </section>
  );
};

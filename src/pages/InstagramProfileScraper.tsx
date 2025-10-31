import { useState } from 'react';
import { ArrowLeft, Instagram, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Page } from '../App';
import { mockInstagramService, type InstagramProfileData } from '../services/mockInstagramService';

interface InstagramProfileScraperProps {
  onNavigate: (page: Page) => void;
}

export function InstagramProfileScraper({ onNavigate }: InstagramProfileScraperProps) {
  const [viewState, setViewState] = useState<'input' | 'loading' | 'results'>('input');
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<InstagramProfileData | null>(null);

  const handleScrape = async () => {
    if (!username) {
      toast.error('Please enter a username');
      return;
    }

    setViewState('loading');
    
    try {
      const result = await mockInstagramService.scrapeProfile(username.replace('@', ''), {
        postLimit: 12,
      });
      setResults(result);
      setViewState('results');
      toast.success('Profile analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze profile');
      setViewState('input');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (viewState === 'loading') {
    return (
      <div className="px-8 py-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 rounded-full border-4 border-[#2C2C2C] border-t-[#F58529] animate-spin mb-6" />
          <h3 className="text-white mb-2">Scraping Profile Data</h3>
          <p className="text-[#9E9E9E]">Fetching posts and analyzing engagement...</p>
        </div>
      </div>
    );
  }

  if (viewState === 'results' && results) {
    const { data } = results;

    return (
      <div className="px-8 py-12 max-w-[1400px] mx-auto">
        <button
          onClick={() => setViewState('input')}
          className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>New Analysis</span>
        </button>

        {/* Profile Header */}
        <div className="p-8 rounded-2xl bg-[#141416] border border-[#25252A] mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B]" />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-white">@{data.username}</h2>
                {data.isVerified && (
                  <div className="w-6 h-6 rounded-full bg-[#2979FF] flex items-center justify-center">
                    <span className="text-white text-[12px]">✓</span>
                  </div>
                )}
              </div>
              
              <p className="text-[#9E9E9E] mb-4">{data.bio}</p>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-[24px] font-bold text-white">{formatNumber(data.followerCount)}</p>
                  <p className="text-[12px] text-[#9E9E9E]">Followers</p>
                </div>
                <div>
                  <p className="text-[24px] font-bold text-white">{formatNumber(data.followingCount)}</p>
                  <p className="text-[12px] text-[#9E9E9E]">Following</p>
                </div>
                <div>
                  <p className="text-[24px] font-bold text-white">{formatNumber(data.postCount)}</p>
                  <p className="text-[12px] text-[#9E9E9E]">Posts</p>
                </div>
                <div>
                  <p className="text-[24px] font-bold text-[#00E676]">{(data.engagementRate * 100).toFixed(2)}%</p>
                  <p className="text-[12px] text-[#9E9E9E]">Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="mb-8">
          <h3 className="text-white mb-4">📸 Recent Posts ({data.recentPosts.length})</h3>
          <div className="grid grid-cols-4 gap-4">
            {data.recentPosts.map((post: any) => (
              <div key={post.id} className="aspect-square rounded-xl bg-[#141416] border border-[#25252A] p-4 hover:border-[#3C3C3C] transition-all cursor-pointer group">
                <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#F58529] to-[#DD2A7B] mb-3" />
                <p className="text-[14px] text-[#00E676] font-semibold">{formatNumber(post.likes)}</p>
                <p className="text-[11px] text-[#616161]">{post.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
            <h3 className="text-white mb-4">🏷️ Top Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {data.topHashtags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#1A1A1D] border border-[#2C2C2C] text-[13px] text-[#2979FF]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
            <h3 className="text-white mb-4">⏰ Best Posting Times</h3>
            <div className="space-y-2">
              {data.bestPostingTimes.map((time: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-[#1A1A1D]">
                  <span className="text-[14px] text-[#E0E0E0]">{time}</span>
                  <TrendingUp size={16} className="text-[#00E676]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-12 max-w-[900px] mx-auto">
      <button
        onClick={() => onNavigate('instagram-hub')}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Instagram Tools</span>
      </button>

      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center mx-auto mb-4">
          <Users className="text-white" size={32} strokeWidth={2} />
        </div>
        <h1 className="text-white mb-2">Instagram Profile Scraper</h1>
        <p className="text-[#9E9E9E]">
          Complete profile analysis with content extraction and growth insights
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#141416] border border-[#25252A]">
        <label className="block mb-3 text-[#E0E0E0]">
          Enter username or profile URL
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@nike or instagram.com/nike"
          className="w-full h-14 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none focus:border-[#00E676] transition-colors mb-6"
          onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
        />

        <button
          onClick={handleScrape}
          className="w-full h-14 rounded-lg bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white font-medium hover:shadow-[0_8px_32px_rgba(245,133,41,0.3)] transition-all duration-300"
        >
          Analyze Profile →
        </button>

        <p className="mt-4 text-center text-[11px] text-[#616161]">
          Estimated time: ~2 min • Credits: 25
        </p>
      </div>
    </div>
  );
}

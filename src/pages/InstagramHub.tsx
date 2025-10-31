import { FileText, Users, Hash, Image, Film, Instagram, ArrowLeft } from 'lucide-react';
import type { Page } from '../App';

interface InstagramHubProps {
  onNavigate: (page: Page) => void;
}

export function InstagramHub({ onNavigate }: InstagramHubProps) {
  const tools = [
    {
      icon: FileText,
      title: 'Post Analyzer',
      description: 'Deep analysis of individual posts, reels, carousels with engagement metrics, OCR, and content insights',
      features: [
        'HD image/video download',
        'Engagement metrics & analytics',
        'OCR text extraction from images',
        'Caption & hashtag analysis',
        'Color palette extraction',
        'Object & brand detection',
      ],
      page: 'instagram-post' as Page,
    },
    {
      icon: Users,
      title: 'Profile Scraper',
      description: 'Complete profile analysis with content extraction, engagement patterns, and growth insights',
      features: [
        'Full profile data extraction',
        'Recent posts download (bulk)',
        'Engagement rate calculation',
        'Posting patterns analysis',
        'Top performing content identification',
        'Hashtag strategy insights',
      ],
      page: 'instagram-profile' as Page,
    },
    {
      icon: Hash,
      title: 'Hashtag Explorer',
      description: 'Research hashtags, analyze performance, and discover trending tags',
      features: [
        'Hashtag popularity metrics',
        'Competition analysis',
        'Related hashtags suggestions',
        'Best posting times for hashtag',
        'Hashtag strategy builder',
      ],
      page: 'instagram-hashtag' as Page,
    },
    {
      icon: Image,
      title: 'Story Downloader',
      description: 'Download and save Instagram stories before they disappear',
      features: [
        'HD story download',
        'Highlights extraction',
        'Metadata preservation',
        'Batch download support',
      ],
      page: 'instagram-story' as Page,
    },
    {
      icon: Film,
      title: 'Reel Analyzer',
      description: 'Specialized tool for Instagram Reels with audio analysis and trend detection',
      features: [
        'No-watermark download',
        'Audio extraction',
        'Trending audio detection',
        'Scene-by-scene analysis',
        'Auto-transcription',
      ],
      page: 'instagram-reel' as Page,
    },
  ];

  return (
    <div className="px-8 py-12 max-w-[1400px] mx-auto">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">
            <Instagram className="text-white" size={32} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-white mb-1">Instagram Tools</h1>
            <p className="text-[#9E9E9E]">Powerful Instagram analysis and extraction tools</p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <p className="text-[14px] text-[#9E9E9E] mb-3">🔗 QUICK START</p>
          <p className="text-[#E0E0E0] mb-4">Paste any Instagram URL to get started</p>
          
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="instagram.com/p/xxxxx or @username"
              className="flex-1 h-12 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none focus:border-[#00E676] transition-colors"
            />
            <button className="h-12 px-8 rounded-lg bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white font-medium hover:shadow-[0_8px_32px_rgba(245,133,41,0.3)] transition-all duration-300">
              Analyze URL →
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="mb-6 text-white">All Tools</h2>
        
        <div className="space-y-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#141416] border border-[#25252A] hover:border-[#3C3C3C] transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F58529] to-[#DD2A7B] flex items-center justify-center flex-shrink-0">
                    <Icon className="text-white" size={28} strokeWidth={2} />
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 text-white">{tool.title}</h3>
                    <p className="text-[14px] text-[#9E9E9E] mb-4">{tool.description}</p>

                    <div className="mb-4">
                      <p className="text-[12px] text-[#616161] mb-2">✨ Features:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-2">
                            <span className="text-[#00E676] mt-1">•</span>
                            <span className="text-[13px] text-[#9E9E9E]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(tool.page)}
                      className="h-10 px-6 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all duration-150"
                    >
                      Start Analysis →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

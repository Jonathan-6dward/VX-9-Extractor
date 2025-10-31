import { Download, Users, Music as MusicIcon, TrendingUp, ArrowLeft } from 'lucide-react';
import type { Page } from '../App';

interface TikTokHubProps {
  onNavigate: (page: Page) => void;
}

export function TikTokHub({ onNavigate }: TikTokHubProps) {
  const tools = [
    {
      icon: Download,
      title: 'Video Downloader',
      description: 'Download TikTok videos without watermark in HD quality',
      features: [
        'No watermark download',
        'HD 1080p quality',
        'Audio extraction (MP3)',
        'Auto-generate transcription',
        'Engagement analytics',
        'Sound analysis',
      ],
      page: 'tiktok-video' as Page,
    },
    {
      icon: Users,
      title: 'Profile Analyzer',
      description: 'Complete TikTok profile analysis with video performance metrics',
      features: [
        'Full profile statistics',
        'Recent videos download',
        'Engagement patterns',
        'Top performing videos',
        'Growth analytics',
      ],
      page: 'tiktok-profile' as Page,
    },
    {
      icon: MusicIcon,
      title: 'Sound Tracker',
      description: 'Track trending sounds and discover popular music',
      features: [
        'Trending sounds today',
        'Sound popularity metrics',
        'Videos using this sound',
        'Sound download',
        'Category filtering',
      ],
      page: 'tiktok-sound' as Page,
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

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F2EA] to-[#FF0050] flex items-center justify-center">
            <MusicIcon className="text-white" size={32} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-white mb-1">TikTok Tools</h1>
            <p className="text-[#9E9E9E]">Download videos, analyze trends, and track performance</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <p className="text-[14px] text-[#9E9E9E] mb-3">🔗 QUICK START</p>
          <p className="text-[#E0E0E0] mb-4">Paste any TikTok URL to get started</p>
          
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="tiktok.com/@user/video/xxxxx"
              className="flex-1 h-12 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none focus:border-[#00E676] transition-colors"
            />
            <button className="h-12 px-8 rounded-lg bg-gradient-to-r from-[#00F2EA] to-[#FF0050] text-white font-medium hover:shadow-[0_8px_32px_rgba(0,242,234,0.3)] transition-all duration-300">
              Analyze URL →
            </button>
          </div>
        </div>
      </div>

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
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F2EA] to-[#FF0050] flex items-center justify-center flex-shrink-0">
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

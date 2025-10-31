import { Download } from 'lucide-react';
import type { Platform } from '../App';

interface HomeProps {
  onNavigate: (platform: Platform) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const platforms = [
    {
      id: 'youtube' as Platform,
      name: 'YouTube',
      emoji: '🔴',
      description: 'Download videos in any quality',
      gradient: 'from-[#FF0000] to-[#CC0000]',
    },
    {
      id: 'instagram' as Platform,
      name: 'Instagram',
      emoji: '📱',
      description: 'Posts, reels, stories & IGTV',
      gradient: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
    },
    {
      id: 'tiktok' as Platform,
      name: 'TikTok',
      emoji: '🎵',
      description: 'No watermark downloads',
      gradient: 'from-[#00F2EA] to-[#FF0050]',
    },
    {
      id: 'twitter' as Platform,
      name: 'Twitter/X',
      emoji: '🐦',
      description: 'Videos, GIFs & images',
      gradient: 'from-[#1DA1F2] to-[#0C7ABF]',
    },
    {
      id: 'facebook' as Platform,
      name: 'Facebook',
      emoji: '📘',
      description: 'Videos from posts & stories',
      gradient: 'from-[#1877F2] to-[#0C5EC2]',
    },
    {
      id: 'linkedin' as Platform,
      name: 'LinkedIn',
      emoji: '💼',
      description: 'Professional content download',
      gradient: 'from-[#0A66C2] to-[#084D92]',
    },
    {
      id: 'pinterest' as Platform,
      name: 'Pinterest',
      emoji: '📌',
      description: 'Pins in original quality',
      gradient: 'from-[#E60023] to-[#B6001C]',
    },
    {
      id: 'ocr' as Platform,
      name: 'OCR Extractor',
      emoji: '🔍',
      description: 'Extract text from images',
      gradient: 'from-[#667eea] to-[#764ba2]',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#23242B] px-8 py-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Download className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[20px] font-semibold text-white">Social Media Downloader Pro</h1>
              <p className="text-[11px] text-[#6E7191]">Fast, Easy, No Limits</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-10 px-6 rounded-lg text-[15px] font-medium text-[#B4B6C1] hover:text-white transition-colors">
              Login
            </button>
            <button className="h-10 px-6 rounded-lg text-[15px] font-medium bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-8 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[48px] leading-[56px] font-bold text-white mb-4">
              Download from Any Social Media
            </h2>
            <p className="text-[24px] leading-[32px] text-[#B4B6C1] mb-8">
              Fast, Easy, No Limits
            </p>

            {/* Universal Input */}
            <div className="max-w-[800px] mx-auto">
              <div className="p-2 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] shadow-lg">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px]">🔗</span>
                    <input
                      type="text"
                      placeholder="Paste any link here..."
                      className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#14151A] border border-[#23242B] text-white placeholder:text-[#6E7191] focus:outline-none focus:border-[#667eea] transition-colors text-[16px]"
                    />
                  </div>
                  <button className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium text-[15px] hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300">
                    Go →
                  </button>
                </div>
              </div>
              <p className="mt-4 text-[14px] text-[#6E7191]">
                💡 Works with YouTube, Instagram, TikTok, Twitter & more
              </p>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="mt-16">
            <h3 className="text-[24px] font-semibold text-white mb-6 text-center">
              🎯 Choose Your Platform
            </h3>

            <div className="grid grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => onNavigate(platform.id)}
                  className="group p-6 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] hover:border-[#667eea] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-[32px]">{platform.emoji}</span>
                  </div>

                  <h4 className="text-[20px] font-medium text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {platform.name}
                  </h4>
                  <p className="text-[14px] text-[#6E7191] mb-4">
                    {platform.description}
                  </p>

                  <div className="text-[14px] font-medium bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Download <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', description: 'Download in seconds, not minutes' },
              { icon: '🎯', title: 'No Limits', description: 'Unlimited downloads, any time' },
              { icon: '🔒', title: 'Private & Secure', description: 'Your downloads are private' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[32px]">{feature.icon}</span>
                </div>
                <h4 className="text-[20px] font-medium text-white mb-2">{feature.title}</h4>
                <p className="text-[14px] text-[#6E7191]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#23242B] px-8 py-6 mt-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[12px] text-[#6E7191]">
            Social Media Downloader Pro • Fast • Easy • No Limits
          </p>
        </div>
      </footer>
    </div>
  );
}

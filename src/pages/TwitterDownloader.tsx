import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Platform } from '../App';

interface TwitterDownloaderProps {
  onNavigate: (platform: Platform) => void;
}

export function TwitterDownloader({ onNavigate }: TwitterDownloaderProps) {
  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#23242B] px-8 py-6">
        <div className="max-w-[900px] mx-auto">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-[#6E7191] hover:text-white transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1DA1F2] to-[#0C7ABF] flex items-center justify-center">
              <span className="text-[24px]">🐦</span>
            </div>
            <div>
              <h1 className="text-[24px] font-semibold text-white">Twitter Downloader</h1>
              <p className="text-[14px] text-[#6E7191]">Videos, GIFs & images</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-12">
        <div className="max-w-[900px] mx-auto">
          <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
            <h3 className="text-[20px] font-medium text-white mb-4">📥 Download Tweet Content</h3>
            
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Tweet URL"
                className="flex-1 h-14 px-4 rounded-xl bg-[#14151A] border border-[#23242B] text-white placeholder:text-[#6E7191] focus:outline-none focus:border-[#667eea] transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && setFetched(true)}
              />
              <button
                onClick={() => setFetched(true)}
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300"
              >
                Fetch
              </button>
            </div>

            <p className="text-[12px] text-[#6E7191]">
              💡 Download videos, GIFs, images from any tweet
            </p>
          </div>

          {fetched && (
            <>
              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="text-[16px] font-medium text-white">@username</h4>
                    <span className="text-[#1DA1F2]">✓</span>
                  </div>
                  <p className="text-[14px] text-[#B4B6C1] mb-4">Tweet text content here...</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-[#1DA1F2] to-[#0C7ABF]"></div>
                  </div>
                  <div className="flex gap-4 text-[12px] text-[#6E7191]">
                    <span>Posted: 3h ago</span>
                    <span>Retweets: 1.2K</span>
                    <span>Likes: 4.5K</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <h3 className="text-[20px] font-medium text-white mb-6">📋 Download Options</h3>
                <div className="space-y-2 mb-6">
                  {['Video (if present)', 'All images (4 found)', 'Tweet text'].map((option, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all">
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                      <span className="text-[14px] text-white">{option}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-[14px] text-[#B4B6C1] mb-3">Quality:</label>
                  <div className="flex gap-3">
                    {['Best available', 'Compressed'].map((option, i) => (
                      <label key={i} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all">
                        <input type="radio" name="quality" defaultChecked={i === 0} className="w-5 h-5" />
                        <span className="text-[14px] text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#14151A] border border-[#2D2E35]">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] text-[#6E7191]">Ready in ~10s</p>
                  <button
                    onClick={() => toast.success('Download started!')}
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300 flex items-center gap-2"
                  >
                    <Download size={20} />
                    Download Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

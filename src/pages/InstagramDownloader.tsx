import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Platform } from '../App';

interface InstagramDownloaderProps {
  onNavigate: (platform: Platform) => void;
}

export function InstagramDownloader({ onNavigate }: InstagramDownloaderProps) {
  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState(false);

  const handleFetch = () => {
    if (!url) {
      toast.error('Please enter an Instagram URL');
      return;
    }
    setFetched(true);
    toast.success('Content loaded!');
  };

  const handleDownload = () => {
    toast.success('Download started!');
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#23242B] px-8 py-6">
        <div className="max-w-[900px] mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-[#6E7191] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
              <span className="text-[24px]">📱</span>
            </div>
            <div>
              <h1 className="text-[24px] font-semibold text-white">Instagram Downloader</h1>
              <p className="text-[14px] text-[#6E7191]">Posts, reels, stories & IGTV</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-12">
        <div className="max-w-[900px] mx-auto">
          <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
            <h3 className="text-[20px] font-medium text-white mb-4">📥 Download Content</h3>
            
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Instagram URL (Post/Reel/Story/IGTV)"
                className="flex-1 h-14 px-4 rounded-xl bg-[#14151A] border border-[#23242B] text-white placeholder:text-[#6E7191] focus:outline-none focus:border-[#667eea] transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              />
              <button
                onClick={handleFetch}
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300"
              >
                Fetch
              </button>
            </div>

            <p className="text-[12px] text-[#6E7191]">
              💡 Download posts, reels, stories, IGTV, profile pics
            </p>
          </div>

          {fetched && (
            <>
              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <div className="flex gap-6">
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-[#f09433] to-[#bc1888] flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop"
                      alt="Instagram post"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-[16px] font-medium text-white mb-2">@username</h4>
                    <p className="text-[14px] text-[#B4B6C1] mb-3">
                      Caption text here...
                    </p>
                    <div className="flex gap-4 text-[12px] text-[#6E7191]">
                      <span>Posted: 2 days ago</span>
                      <span>Type: Carousel (3 slides)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <h3 className="text-[20px] font-medium text-white mb-6">📋 Download Options</h3>

                <div className="mb-6">
                  <label className="block text-[14px] text-[#B4B6C1] mb-3">Content Type:</label>
                  <div className="flex gap-3">
                    {['Full Quality (HD/4K)', 'Compressed'].map((option, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all"
                      >
                        <input type="radio" name="quality" defaultChecked={i === 0} className="w-5 h-5" />
                        <span className="text-[14px] text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {['Download all carousel slides', 'Save caption text', 'Include metadata (date, likes count)'].map((option, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all">
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                      <span className="text-[14px] text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#14151A] border border-[#2D2E35]">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] text-[#6E7191]">Ready in ~15s</p>
                  <button
                    onClick={handleDownload}
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

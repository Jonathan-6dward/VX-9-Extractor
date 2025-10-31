import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Platform } from '../App';

interface FacebookDownloaderProps {
  onNavigate: (platform: Platform) => void;
}

export function FacebookDownloader({ onNavigate }: FacebookDownloaderProps) {
  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#23242B] px-8 py-6">
        <div className="max-w-[900px] mx-auto">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-[#6E7191] hover:text-white transition-colors mb-4">
            <ArrowLeft size={20} /><span>Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1877F2] to-[#0C5EC2] flex items-center justify-center">
              <span className="text-[24px]">📘</span>
            </div>
            <div>
              <h1 className="text-[24px] font-semibold text-white">Facebook Downloader</h1>
              <p className="text-[14px] text-[#6E7191]">Videos from posts & stories</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-12">
        <div className="max-w-[900px] mx-auto">
          <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35]">
            <h3 className="text-[20px] font-medium text-white mb-4">📥 Download Facebook Video</h3>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Facebook video URL"
                className="flex-1 h-14 px-4 rounded-xl bg-[#14151A] border border-[#23242B] text-white placeholder:text-[#6E7191] focus:outline-none focus:border-[#667eea] transition-colors"
              />
              <button onClick={() => setFetched(true)} className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300">
                Fetch
              </button>
            </div>
            <p className="text-[12px] text-[#6E7191]">💡 Download videos from posts, stories, reels</p>
          </div>

          {fetched && (
            <div className="mt-8">
              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-[#1877F2] to-[#0C5EC2] mb-4"></div>
                <h4 className="text-[18px] font-medium text-white mb-2">Video title or caption</h4>
                <p className="text-[14px] text-[#6E7191]">Posted by: Page Name • Duration: 2:45</p>
              </div>

              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <h3 className="text-[20px] font-medium text-white mb-6">📋 Download Options</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[14px] text-[#B4B6C1] mb-3">Quality:</label>
                    <div className="flex gap-3">
                      {['HD (720p/1080p)', 'SD (480p)'].map((option, i) => (
                        <label key={i} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all">
                          <input type="radio" name="quality" defaultChecked={i === 0} className="w-5 h-5" />
                          <span className="text-[14px] text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] text-[#B4B6C1] mb-3">Format:</label>
                    <div className="flex gap-3">
                      {['MP4', 'Audio only (M4A)'].map((option, i) => (
                        <label key={i} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all">
                          <input type="radio" name="format" defaultChecked={i === 0} className="w-5 h-5" />
                          <span className="text-[14px] text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#14151A] border border-[#2D2E35]">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] text-[#6E7191]">Ready in ~25s</p>
                  <button onClick={() => toast.success('Download started!')} className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-[0_8px_32px_rgba(102,126,234,0.4)] transition-all duration-300 flex items-center gap-2">
                    <Download size={20} />Download Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Download, Play } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Platform } from '../App';

interface YouTubeDownloaderProps {
  onNavigate: (platform: Platform) => void;
}

export function YouTubeDownloader({ onNavigate }: YouTubeDownloaderProps) {
  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [format, setFormat] = useState('mp4');
  const [options, setOptions] = useState({
    downloadThumbnail: true,
    downloadSubtitles: true,
  });

  const handleFetch = () => {
    if (!url) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    setFetched(true);
    toast.success('Video info loaded!');
  };

  const handleDownload = () => {
    toast.success('Download started! Check your downloads folder.');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF0000] to-[#CC0000] flex items-center justify-center">
              <span className="text-[24px]">🔴</span>
            </div>
            <div>
              <h1 className="text-[24px] font-semibold text-white">YouTube Downloader</h1>
              <p className="text-[14px] text-[#6E7191]">Download videos in any quality</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-12">
        <div className="max-w-[900px] mx-auto">
          {/* URL Input */}
          <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
            <h3 className="text-[20px] font-medium text-white mb-4">📥 Download Video</h3>
            
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL"
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
              💡 Supports: Videos, Playlists, Shorts, Live streams
            </p>
          </div>

          {/* Video Preview (after fetch) */}
          {fetched && (
            <>
              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <div className="flex gap-6">
                  <div className="w-48 h-28 rounded-xl bg-gradient-to-br from-[#FF0000] to-[#CC0000] flex-shrink-0 flex items-center justify-center relative group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="text-white" size={32} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-[18px] font-medium text-white mb-2">
                      Amazing Video Title Here
                    </h4>
                    <p className="text-[14px] text-[#6E7191] mb-2">Channel Name</p>
                    <div className="flex gap-4 text-[12px] text-[#6E7191]">
                      <span>Duration: 10:35</span>
                      <span>Views: 1.2M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] mb-8">
                <h3 className="text-[20px] font-medium text-white mb-6">📋 Download Options</h3>

                {/* Quality */}
                <div className="mb-6">
                  <label className="block text-[14px] text-[#B4B6C1] mb-3">Quality:</label>
                  <div className="flex gap-3">
                    {['1080p', '720p', '480p', '360p'].map((q) => (
                      <label
                        key={q}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all"
                      >
                        <input
                          type="radio"
                          name="quality"
                          checked={quality === q}
                          onChange={() => setQuality(q)}
                          className="w-5 h-5"
                        />
                        <span className="text-[14px] text-white">
                          {q} {q === '1080p' && '(Best)'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div className="mb-6">
                  <label className="block text-[14px] text-[#B4B6C1] mb-3">Format:</label>
                  <div className="flex gap-3">
                    {[
                      { value: 'mp4', label: 'MP4 (Video + Audio)' },
                      { value: 'mp3', label: 'MP3 (Audio only)' },
                    ].map((f) => (
                      <label
                        key={f.value}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all"
                      >
                        <input
                          type="radio"
                          name="format"
                          checked={format === f.value}
                          onChange={() => setFormat(f.value)}
                          className="w-5 h-5"
                        />
                        <span className="text-[14px] text-white">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div>
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-[#14151A] border border-[#23242B] mb-2 cursor-pointer hover:border-[#667eea] transition-all">
                    <input
                      type="checkbox"
                      checked={options.downloadThumbnail}
                      onChange={(e) =>
                        setOptions({ ...options, downloadThumbnail: e.target.checked })
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-[14px] text-white">Download thumbnail</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all">
                    <input
                      type="checkbox"
                      checked={options.downloadSubtitles}
                      onChange={(e) =>
                        setOptions({ ...options, downloadSubtitles: e.target.checked })
                      }
                      className="w-5 h-5"
                    />
                    <span className="text-[14px] text-white">Download subtitles (if available)</span>
                  </label>
                </div>
              </div>

              {/* Download Button */}
              <div className="p-6 rounded-2xl bg-[#14151A] border border-[#2D2E35]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[14px] text-[#6E7191]">Size: ~145MB</p>
                    <p className="text-[14px] text-[#6E7191]">Time: ~30s</p>
                  </div>
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

import { useState } from 'react';
import { ArrowLeft, Music, Download, Play, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Page } from '../App';
import { mockTikTokService, type TikTokVideoData } from '../services/mockTikTokService';

interface TikTokVideoDownloaderProps {
  onNavigate: (page: Page) => void;
}

export function TikTokVideoDownloader({ onNavigate }: TikTokVideoDownloaderProps) {
  const [viewState, setViewState] = useState<'input' | 'loading' | 'results'>('input');
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<TikTokVideoData | null>(null);

  const handleDownload = async () => {
    if (!url) {
      toast.error('Please enter a TikTok URL');
      return;
    }

    setViewState('loading');
    
    try {
      const result = await mockTikTokService.downloadVideo(url, {
        noWatermark: true,
        downloadAudio: true,
        generateTranscript: true,
      });
      setResults(result);
      setViewState('results');
      toast.success('Video analyzed!');
    } catch (error) {
      toast.error('Failed to download video');
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
          <div className="w-16 h-16 rounded-full border-4 border-[#2C2C2C] border-t-[#00F2EA] animate-spin mb-6" />
          <h3 className="text-white mb-2">Downloading TikTok Video</h3>
          <p className="text-[#9E9E9E]">Extracting video and analyzing content...</p>
        </div>
      </div>
    );
  }

  if (viewState === 'results' && results) {
    const { data } = results;

    return (
      <div className="px-8 py-12 max-w-[1600px] mx-auto">
        <button
          onClick={() => setViewState('input')}
          className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>New Download</span>
        </button>

        <div className="grid grid-cols-2 gap-8">
          {/* Video Preview */}
          <div>
            <div className="sticky top-24">
              <div className="aspect-[9/16] max-w-[400px] mx-auto rounded-2xl overflow-hidden bg-[#141416] border border-[#25252A] relative group">
                <img
                  src={data.video.thumbnailUrl}
                  alt="TikTok video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="text-white" size={32} />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="h-12 rounded-lg bg-gradient-to-r from-[#00F2EA] to-[#FF0050] text-white font-medium hover:shadow-[0_8px_32px_rgba(0,242,234,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download HD
                </button>
                <button className="h-12 rounded-lg bg-[#141416] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all duration-150 flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Audio
                </button>
              </div>
            </div>
          </div>

          {/* Video Data */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00F2EA] to-[#FF0050]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white">@{data.metadata.author.username}</h3>
                    {data.metadata.author.verified && (
                      <div className="w-5 h-5 rounded-full bg-[#2979FF] flex items-center justify-center">
                        <span className="text-white text-[10px]">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-[#9E9E9E]">
                    {formatNumber(data.metadata.author.followerCount)} followers
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">📊 Performance</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <Play size={16} className="text-[#2979FF]" />
                    <span className="text-[12px] text-[#9E9E9E]">Views</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.metadata.stats.views)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart size={16} className="text-[#FF5252]" />
                    <span className="text-[12px] text-[#9E9E9E]">Likes</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.metadata.stats.likes)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle size={16} className="text-[#00E676]" />
                    <span className="text-[12px] text-[#9E9E9E]">Comments</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.metadata.stats.comments)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 size={16} className="text-[#FFB300]" />
                    <span className="text-[12px] text-[#9E9E9E]">Shares</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.metadata.stats.shares)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#25252A]">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#9E9E9E]">Engagement Rate</span>
                  <span className="text-[16px] font-semibold text-[#00E676]">
                    {(data.metadata.stats.engagementRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">📝 Caption</h3>
              <p className="text-[14px] text-[#E0E0E0]">{data.metadata.caption}</p>
            </div>

            {/* Sound Info */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Music size={18} className="text-[#00F2EA]" />
                Sound
              </h3>
              <p className="text-[14px] text-[#E0E0E0] mb-2">{data.metadata.sound.title}</p>
              <div className="flex items-center gap-4 text-[12px] text-[#9E9E9E]">
                <span>🔥 Trending #{data.metadata.sound.trendingRank}</span>
                <span>📊 {formatNumber(data.metadata.sound.usageCount)} videos</span>
              </div>
            </div>

            {/* Hashtags */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">🏷️ Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {data.metadata.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-[#1A1A1D] border border-[#2C2C2C] text-[13px] text-[#2979FF]"
                  >
                    #{hashtag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Transcript */}
            {data.transcript && (
              <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
                <h3 className="text-white mb-4">📄 Transcript</h3>
                <div className="p-4 rounded-lg bg-[#1A1A1D] border border-[#25252A]">
                  <p className="text-[14px] text-[#E0E0E0]">{data.transcript.text}</p>
                </div>
                <p className="mt-2 text-[11px] text-[#616161]">
                  Confidence: {(data.transcript.confidence * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-12 max-w-[900px] mx-auto">
      <button
        onClick={() => onNavigate('tiktok-hub')}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to TikTok Tools</span>
      </button>

      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F2EA] to-[#FF0050] flex items-center justify-center mx-auto mb-4">
          <Music className="text-white" size={32} strokeWidth={2} />
        </div>
        <h1 className="text-white mb-2">TikTok Video Downloader</h1>
        <p className="text-[#9E9E9E]">
          Download videos without watermark and analyze performance
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#141416] border border-[#25252A]">
        <label className="block mb-3 text-[#E0E0E0]">
          Paste TikTok Video URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://tiktok.com/@user/video/xxxxx"
          className="w-full h-14 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none focus:border-[#00E676] transition-colors mb-6"
          onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
        />

        <button
          onClick={handleDownload}
          className="w-full h-14 rounded-lg bg-gradient-to-r from-[#00F2EA] to-[#FF0050] text-white font-medium hover:shadow-[0_8px_32px_rgba(0,242,234,0.3)] transition-all duration-300"
        >
          Download & Analyze →
        </button>

        <p className="mt-4 text-center text-[11px] text-[#616161]">
          Estimated time: ~20s • Credits: 3
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Instagram, Download, Copy, Heart, MessageCircle, Share2, Bookmark, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Page } from '../App';
import { mockInstagramService, type InstagramPostAnalysis } from '../services/mockInstagramService';

interface InstagramPostAnalyzerProps {
  onNavigate: (page: Page) => void;
}

type ViewState = 'input' | 'loading' | 'results';

export function InstagramPostAnalyzer({ onNavigate }: InstagramPostAnalyzerProps) {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<InstagramPostAnalysis | null>(null);
  const [options, setOptions] = useState({
    downloadMedia: true,
    extractText: true,
    analyzeEngagement: true,
    detectObjects: true,
    extractColors: true,
  });

  const handleAnalyze = async () => {
    if (!url) {
      toast.error('Please enter an Instagram URL');
      return;
    }

    setViewState('loading');
    
    try {
      const result = await mockInstagramService.analyzePost(url, options);
      setResults(result);
      setViewState('results');
      toast.success('Analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze post');
      setViewState('input');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
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
          <h3 className="text-white mb-2">Analyzing Instagram Post</h3>
          <p className="text-[#9E9E9E]">Extracting data and analyzing content...</p>
          <div className="mt-8 w-full max-w-[500px]">
            <div className="h-2 bg-[#2C2C2C] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#F58529] to-[#DD2A7B] w-2/3 animate-pulse" />
            </div>
          </div>
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
          <span>New Analysis</span>
        </button>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Preview */}
          <div>
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden bg-[#141416] border border-[#25252A]">
                <img
                  src={data.media[0].url}
                  alt="Instagram post"
                  className="w-full aspect-square object-cover"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="h-12 rounded-lg bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white font-medium hover:shadow-[0_8px_32px_rgba(245,133,41,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download HD
                </button>
                <button
                  onClick={() => handleCopy(data.caption.text)}
                  className="h-12 rounded-lg bg-[#141416] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <Copy size={18} />
                  Copy Caption
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Data */}
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white">@{data.post.owner.username}</h3>
                    {data.post.owner.isVerified && (
                      <div className="w-5 h-5 rounded-full bg-[#2979FF] flex items-center justify-center">
                        <span className="text-white text-[10px]">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-[#9E9E9E]">
                    {formatNumber(data.post.owner.followerCount)} followers
                  </p>
                </div>
              </div>

              <p className="text-[13px] text-[#9E9E9E]">
                {new Date(data.post.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Engagement Metrics */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4 flex items-center gap-2">
                📊 Engagement Metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart size={16} className="text-[#FF5252]" />
                    <span className="text-[12px] text-[#9E9E9E]">Likes</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.engagement.likes)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle size={16} className="text-[#2979FF]" />
                    <span className="text-[12px] text-[#9E9E9E]">Comments</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.engagement.comments)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <Bookmark size={16} className="text-[#FFB300]" />
                    <span className="text-[12px] text-[#9E9E9E]">Saves</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.engagement.saves)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1A1D] border border-[#25252A]">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 size={16} className="text-[#00E676]" />
                    <span className="text-[12px] text-[#9E9E9E]">Shares</span>
                  </div>
                  <p className="text-[24px] font-bold text-white">
                    {formatNumber(data.engagement.shares)}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#25252A]">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#9E9E9E]">Engagement Rate</span>
                  <span className="text-[16px] font-semibold text-[#00E676]">
                    {(data.engagement.engagementRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">📝 Caption</h3>
              <p className="text-[14px] text-[#E0E0E0] mb-4 whitespace-pre-wrap">
                {data.caption.text}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#25252A]">
                <div>
                  <p className="text-[11px] text-[#616161] mb-1">Language</p>
                  <p className="text-[13px] text-[#E0E0E0]">
                    {data.caption.language.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#616161] mb-1">Sentiment</p>
                  <p className="text-[13px] text-[#00E676] capitalize">
                    {data.caption.sentiment.label} ({(data.caption.sentiment.score * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(data.caption.text)}
                className="mt-4 w-full h-10 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all duration-150 flex items-center justify-center gap-2"
              >
                <Copy size={16} />
                Copy Text
              </button>
            </div>

            {/* Hashtags */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">🏷️ Hashtags ({data.hashtags.length})</h3>
              
              <div className="space-y-3">
                {data.hashtags.map((hashtag, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-[#1A1A1D] border border-[#25252A] flex items-center justify-between group hover:border-[#3C3C3C] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#2979FF]">#{hashtag.tag}</span>
                      <span className="text-[11px] text-[#616161]">
                        {formatNumber(hashtag.posts)} posts
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        hashtag.popularity === 'very_high' ? 'bg-[#FF5252]/20 text-[#FF5252]' :
                        hashtag.popularity === 'high' ? 'bg-[#FFB300]/20 text-[#FFB300]' :
                        'bg-[#00E676]/20 text-[#00E676]'
                      }`}>
                        {hashtag.popularity.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleCopy(`#${hashtag.tag}`)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9E9E9E] hover:text-[#00E676]"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            {data.location && (
              <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-[#FF5252]" />
                  Location
                </h3>
                <p className="text-[14px] text-[#E0E0E0]">{data.location.name}</p>
              </div>
            )}

            {/* OCR Text */}
            {data.ocr && (
              <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
                <h3 className="text-white mb-4">📝 Extracted Text (OCR)</h3>
                <div className="p-4 rounded-lg bg-[#1A1A1D] border border-[#25252A] mb-4">
                  <p className="text-[14px] text-[#E0E0E0] whitespace-pre-wrap">
                    {data.ocr.extractedText}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#616161]">
                    Confidence: {(data.ocr.confidence * 100).toFixed(0)}%
                  </span>
                  <button
                    onClick={() => handleCopy(data.ocr!.extractedText)}
                    className="text-[13px] text-[#2979FF] hover:text-[#00E676] transition-colors"
                  >
                    Copy Text
                  </button>
                </div>
              </div>
            )}

            {/* Color Palette */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">🎨 Color Palette</h3>
              <div className="flex gap-2">
                {data.aiAnalysis.colors.map((color, index) => (
                  <div key={index} className="flex-1 group cursor-pointer">
                    <div
                      className="w-full h-20 rounded-lg mb-2 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} - ${color.percentage}%`}
                    />
                    <p className="text-[10px] text-center text-[#9E9E9E]">
                      {color.hex}
                    </p>
                    <p className="text-[10px] text-center text-[#616161]">
                      {color.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detected Objects */}
            <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <h3 className="text-white mb-4">🔍 Detected Objects</h3>
              <div className="space-y-2">
                {data.aiAnalysis.objects.map((obj, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-[14px] text-[#E0E0E0] capitalize">{obj.name}</span>
                    <span className="text-[12px] text-[#9E9E9E]">
                      {(obj.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                ))}
              </div>
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
          <Instagram className="text-white" size={32} strokeWidth={2} />
        </div>
        <h1 className="text-white mb-2">Instagram Post Analyzer</h1>
        <p className="text-[#9E9E9E]">
          Deep analysis of posts, reels, and carousels with AI-powered insights
        </p>
      </div>

      {/* URL Input */}
      <div className="p-8 rounded-2xl bg-[#141416] border border-[#25252A] mb-8">
        <label className="block mb-3 text-[#E0E0E0]">
          Paste Instagram URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://instagram.com/p/xxxxx"
          className="w-full h-14 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none focus:border-[#00E676] transition-colors mb-4"
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />

        <p className="text-[12px] text-[#616161] mb-6">
          💡 Supports: Posts, Reels, Carousels
        </p>

        {/* Options */}
        <div className="mb-6">
          <p className="text-[14px] text-[#9E9E9E] mb-3">What do you want to extract?</p>
          <div className="space-y-2">
            {[
              { key: 'downloadMedia', label: 'Download Images & Videos (HD)' },
              { key: 'extractText', label: 'OCR Text Extraction' },
              { key: 'analyzeEngagement', label: 'Engagement Metrics & Analytics' },
              { key: 'detectObjects', label: 'Object Detection (AI-powered)' },
              { key: 'extractColors', label: 'Color Palette Extraction' },
            ].map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1D] border border-[#25252A] hover:border-[#3C3C3C] transition-all cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={options[option.key as keyof typeof options]}
                  onChange={(e) => setOptions({ ...options, [option.key]: e.target.checked })}
                  className="w-5 h-5 rounded border-[#2C2C2C] bg-[#141416] checked:bg-[#00E676] focus:ring-2 focus:ring-[#00E676] focus:ring-offset-0"
                />
                <span className="text-[14px] text-[#E0E0E0]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full h-14 rounded-lg bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white font-medium hover:shadow-[0_8px_32px_rgba(245,133,41,0.3)] transition-all duration-300"
        >
          Start Extraction →
        </button>

        <p className="mt-4 text-center text-[11px] text-[#616161]">
          Estimated time: ~15s • Credits: 5
        </p>
      </div>
    </div>
  );
}

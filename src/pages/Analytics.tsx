import { ArrowLeft, TrendingUp, Instagram, Music, FileText } from 'lucide-react';
import type { Page } from '../App';

interface AnalyticsProps {
  onNavigate: (page: Page) => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
  return (
    <div className="px-8 py-12 max-w-[1600px] mx-auto">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="mb-12">
        <h1 className="text-white mb-2">Analytics Dashboard</h1>
        <p className="text-[#9E9E9E]">Track your usage and insights over time</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        {[
          { icon: Instagram, label: 'Instagram Extracts', value: '487', change: '+12%', gradient: 'from-[#F58529] to-[#DD2A7B]' },
          { icon: Music, label: 'TikTok Downloads', value: '234', change: '+8%', gradient: 'from-[#00F2EA] to-[#FF0050]' },
          { icon: FileText, label: 'OCR Processed', value: '1.2K', change: '+23%', gradient: 'from-[#00E676] to-[#2979FF]' },
          { icon: TrendingUp, label: 'Total Exports', value: '856', change: '+15%', gradient: 'from-[#FFB300] to-[#FF5252]' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} strokeWidth={2} />
              </div>
              <p className="text-[12px] text-[#9E9E9E] mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-[32px] font-bold text-white">{stat.value}</p>
                <p className="text-[14px] text-[#00E676]">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Chart */}
      <div className="p-8 rounded-2xl bg-[#141416] border border-[#25252A] mb-12">
        <h3 className="text-white mb-6">📈 Activity Trend (Last 30 Days)</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 30 }, (_, i) => {
            const height = Math.random() * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#F58529] to-[#DD2A7B] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                style={{ height: `${height}%` }}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Top Accounts */}
      <div className="grid grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <h3 className="text-white mb-4">🏆 Top Extracted Accounts</h3>
          <div className="space-y-3">
            {[
              { username: '@nike', count: 45, platform: 'Instagram' },
              { username: '@natgeo', count: 32, platform: 'Instagram' },
              { username: '@spotify', count: 28, platform: 'Instagram' },
              { username: '@creator', count: 21, platform: 'TikTok' },
            ].map((account, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-[#1A1A1D] border border-[#25252A] flex items-center justify-between"
              >
                <div>
                  <p className="text-[14px] text-[#E0E0E0]">{account.username}</p>
                  <p className="text-[11px] text-[#616161]">{account.platform}</p>
                </div>
                <span className="text-[16px] font-semibold text-[#00E676]">{account.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <h3 className="text-white mb-4">🔥 Trending Hashtags Tracked</h3>
          <div className="flex flex-wrap gap-2">
            {['marketing', 'design', 'photography', 'travel', 'fitness', 'fashion', 'food', 'tech'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-[#1A1A1D] border border-[#2C2C2C] text-[13px] text-[#2979FF] hover:border-[#00E676] hover:text-[#00E676] transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

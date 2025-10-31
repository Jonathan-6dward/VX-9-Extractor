import { Zap, Instagram, Music, FileText, BarChart3, FolderOpen, Settings as SettingsIcon } from 'lucide-react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Zap },
    { id: 'instagram-hub' as Page, label: 'Instagram', icon: Instagram },
    { id: 'tiktok-hub' as Page, label: 'TikTok', icon: Music },
    { id: 'ocr' as Page, label: 'OCR', icon: FileText },
    { id: 'analytics' as Page, label: 'Analytics', icon: BarChart3 },
    { id: 'collections' as Page, label: 'Collections', icon: FolderOpen },
    { id: 'settings' as Page, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <header className="h-20 border-b border-[#25252A] px-8 flex items-center justify-between sticky top-0 bg-[#0A0A0B]/95 backdrop-blur-sm z-50">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-3 group"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">
          <Zap className="text-white" size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-[20px] font-semibold text-white group-hover:text-[#00E676] transition-colors">
            Social Intelligence
          </h1>
          <p className="text-[11px] text-[#9E9E9E] -mt-1">Extract • Analyze • Dominate</p>
        </div>
      </button>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id || 
            (item.id === 'instagram-hub' && currentPage.startsWith('instagram')) ||
            (item.id === 'tiktok-hub' && currentPage.startsWith('tiktok'));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                h-10 px-4 rounded-lg flex items-center gap-2 transition-all duration-150
                ${isActive
                  ? 'bg-[#25252A] text-[#00E676]'
                  : 'text-[#9E9E9E] hover:bg-[#141416] hover:text-[#E0E0E0]'
                }
              `}
            >
              <Icon size={18} strokeWidth={2} />
              <span className="text-[14px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-lg bg-[#141416] border border-[#25252A]">
          <p className="text-[11px] text-[#9E9E9E]">Credits</p>
          <p className="text-[16px] font-semibold text-[#00E676]">487</p>
        </div>
      </div>
    </header>
  );
}

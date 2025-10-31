import { ArrowLeft, FolderOpen, Lock, Users, Plus } from 'lucide-react';
import type { Page } from '../App';

interface CollectionsProps {
  onNavigate: (page: Page) => void;
}

export function Collections({ onNavigate }: CollectionsProps) {
  const collections = [
    {
      name: 'Competitor Analysis',
      privacy: 'private',
      items: 45,
      updated: '2h ago',
      gradient: 'from-[#F58529] to-[#DD2A7B]',
    },
    {
      name: 'Campaign Q1 2024',
      privacy: 'private',
      items: 28,
      updated: '1d ago',
      gradient: 'from-[#00F2EA] to-[#FF0050]',
    },
    {
      name: 'Client - Nike',
      privacy: 'shared',
      items: 67,
      updated: '5h ago',
      gradient: 'from-[#00E676] to-[#2979FF]',
    },
    {
      name: 'Instagram Insights',
      privacy: 'private',
      items: 123,
      updated: '3d ago',
      gradient: 'from-[#2979FF] to-[#8134AF]',
    },
    {
      name: 'TikTok Trends',
      privacy: 'private',
      items: 89,
      updated: '1w ago',
      gradient: 'from-[#FFB300] to-[#FF5252]',
    },
    {
      name: 'OCR Receipts',
      privacy: 'private',
      items: 234,
      updated: '2d ago',
      gradient: 'from-[#00E676] to-[#00F2EA]',
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

      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-white mb-2">My Collections</h1>
          <p className="text-[#9E9E9E]">Organize and manage your saved content</p>
        </div>

        <button className="h-12 px-6 rounded-lg bg-gradient-to-r from-[#00E676] to-[#2979FF] text-white font-medium hover:shadow-[0_8px_32px_rgba(0,230,118,0.3)] transition-all duration-300 flex items-center gap-2">
          <Plus size={20} />
          New Collection
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-3">
        <input
          type="text"
          placeholder="Search collections..."
          className="flex-1 h-12 px-4 rounded-lg bg-[#141416] border border-[#2C2C2C] text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none focus:border-[#00E676] transition-colors"
        />
        <button className="h-12 px-6 rounded-lg bg-[#141416] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all">
          Sort by: Date
        </button>
        <button className="h-12 px-6 rounded-lg bg-[#141416] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all">
          View: Grid
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-[#141416] border border-[#25252A] hover:border-[#3C3C3C] transition-all duration-300 cursor-pointer group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${collection.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <FolderOpen className="text-white" size={28} strokeWidth={2} />
            </div>

            <h3 className="text-white mb-2 group-hover:text-[#00E676] transition-colors">
              {collection.name}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              {collection.privacy === 'private' ? (
                <>
                  <Lock size={14} className="text-[#9E9E9E]" />
                  <span className="text-[12px] text-[#9E9E9E]">Private</span>
                </>
              ) : (
                <>
                  <Users size={14} className="text-[#2979FF]" />
                  <span className="text-[12px] text-[#2979FF]">Shared</span>
                </>
              )}
            </div>

            <div className="mb-3">
              <p className="text-[14px] text-[#E0E0E0]">{collection.items} items</p>
              <p className="text-[11px] text-[#616161]">Updated {collection.updated}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 h-9 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all text-[13px]">
                Open
              </button>
              <button className="flex-1 h-9 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#2979FF] hover:text-[#2979FF] transition-all text-[13px]">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

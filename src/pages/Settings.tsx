import { ArrowLeft, Settings as SettingsIcon, Key, Download, Shield, CreditCard } from 'lucide-react';
import type { Page } from '../App';

interface SettingsProps {
  onNavigate: (page: Page) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  return (
    <div className="px-8 py-12 max-w-[1200px] mx-auto">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="mb-12">
        <h1 className="text-white mb-2">Settings & Preferences</h1>
        <p className="text-[#9E9E9E]">Manage your account and application preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#25252A]">
        {[
          { label: 'General', icon: SettingsIcon, active: true },
          { label: 'API Keys', icon: Key, active: false },
          { label: 'Export', icon: Download, active: false },
          { label: 'Privacy', icon: Shield, active: false },
          { label: 'Billing', icon: CreditCard, active: false },
        ].map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={index}
              className={`h-12 px-6 flex items-center gap-2 border-b-2 transition-all ${
                tab.active
                  ? 'border-[#00E676] text-[#00E676]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#E0E0E0]'
              }`}
            >
              <Icon size={18} />
              <span className="text-[14px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* General Settings */}
      <div className="space-y-8">
        {/* Language */}
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <h3 className="text-white mb-4">Default Language</h3>
          <select className="w-full h-12 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] focus:outline-none focus:border-[#00E676] transition-colors">
            <option>Portuguese (BR)</option>
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        {/* Export Format */}
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <h3 className="text-white mb-4">Default Export Format</h3>
          <select className="w-full h-12 px-4 rounded-lg bg-[#1A1A1D] border border-[#2C2C2C] text-[#E0E0E0] focus:outline-none focus:border-[#00E676] transition-colors">
            <option>JSON (Structured Data)</option>
            <option>Excel (.xlsx)</option>
            <option>CSV (Comma-separated)</option>
            <option>PDF Report</option>
          </select>
        </div>

        {/* Auto-save */}
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">Auto-save Extractions</h3>
              <p className="text-[14px] text-[#9E9E9E]">Automatically save all extractions to collections</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-8 bg-[#2C2C2C] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00E676] rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#00E676]"></div>
            </label>
          </div>
        </div>

        {/* OCR Settings */}
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A]">
          <h3 className="text-white mb-4">OCR Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] text-[#9E9E9E] mb-2">Default OCR Engine</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1D] border border-[#25252A] cursor-pointer hover:border-[#3C3C3C] transition-all">
                  <input type="radio" name="ocr-engine" defaultChecked className="w-5 h-5" />
                  <div>
                    <p className="text-[14px] text-[#E0E0E0]">Tesseract (Accurate)</p>
                    <p className="text-[12px] text-[#616161]">Best for documents and printed text</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1D] border border-[#25252A] cursor-pointer hover:border-[#3C3C3C] transition-all">
                  <input type="radio" name="ocr-engine" className="w-5 h-5" />
                  <div>
                    <p className="text-[14px] text-[#E0E0E0]">Cloud Vision (Fast)</p>
                    <p className="text-[12px] text-[#616161]">Uses more credits but faster processing</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[14px] text-[#9E9E9E] mb-2">Post-processing</label>
              <div className="space-y-2">
                {[
                  'Auto-correct common OCR errors',
                  'Remove extra whitespace',
                  'Preserve original formatting',
                ].map((option, index) => (
                  <label key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1D] border border-[#25252A] cursor-pointer hover:border-[#3C3C3C] transition-all">
                    <input type="checkbox" defaultChecked={index < 2} className="w-5 h-5" />
                    <span className="text-[14px] text-[#E0E0E0]">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="h-12 px-8 rounded-lg bg-[#141416] border border-[#2C2C2C] text-[#E0E0E0] hover:border-[#00E676] hover:text-[#00E676] transition-all">
            Reset to Defaults
          </button>
          <button className="h-12 px-8 rounded-lg bg-gradient-to-r from-[#00E676] to-[#2979FF] text-white font-medium hover:shadow-[0_8px_32px_rgba(0,230,118,0.3)] transition-all duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

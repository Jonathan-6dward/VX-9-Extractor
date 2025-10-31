import { ArrowLeft } from 'lucide-react';
import type { Platform } from '../App';
import { UploadArea } from '../components/UploadArea';

interface OCRExtractorProps {
  onNavigate: (platform: Platform) => void;
}

export function OCRExtractor({ onNavigate }: OCRExtractorProps) {
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files);
    // Integrate with existing OCR functionality
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#23242B] px-8 py-6">
        <div className="max-w-[1200px] mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-[#6E7191] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <span className="text-[24px]">🔍</span>
            </div>
            <div>
              <h1 className="text-[24px] font-semibold text-white">OCR Text Extractor</h1>
              <p className="text-[14px] text-[#6E7191]">Extract text from images with AI precision</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-[36px] font-semibold text-white mb-4">
              📸 Extract Text from Images
            </h2>
            <p className="text-[16px] text-[#B4B6C1]">
              Powered by Tesseract OCR • Fast & Accurate
            </p>
          </div>

          {/* Upload Area */}
          <UploadArea onFilesSelected={handleFilesSelected} />

          {/* Options */}
          <div className="mt-8 p-8 rounded-2xl bg-[#1C1D23] border border-[#2D2E35]">
            <h3 className="text-[20px] font-medium text-white mb-6">⚙️ OCR Settings</h3>

            {/* Language Detection */}
            <div className="mb-6">
              <label className="block text-[14px] text-[#B4B6C1] mb-3">Language Detection</label>
              <div className="space-y-2">
                {[
                  { value: 'auto', label: 'Auto-detect (Recommended)' },
                  { value: 'por', label: 'Portuguese (BR)' },
                  { value: 'eng', label: 'English' },
                  { value: 'spa', label: 'Spanish' },
                ].map((option, i) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all"
                  >
                    <input
                      type="radio"
                      name="language"
                      defaultChecked={i === 0}
                      className="w-5 h-5"
                    />
                    <span className="text-[14px] text-white">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Processing Options */}
            <div>
              <label className="block text-[14px] text-[#B4B6C1] mb-3">Processing Options</label>
              <div className="space-y-2">
                {[
                  'Auto-enhance image quality',
                  'Remove line breaks',
                  'Auto-correct common OCR errors',
                  'Preserve formatting',
                ].map((option, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#14151A] border border-[#23242B] cursor-pointer hover:border-[#667eea] transition-all"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={i < 3}
                      className="w-5 h-5"
                    />
                    <span className="text-[14px] text-white">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Auto-Detection', description: 'Automatically detects document types and text regions' },
              { icon: '🌍', title: 'Multi-Language', description: 'Supports 100+ languages with automatic detection' },
              { icon: '⚡', title: 'Batch Processing', description: 'Process up to 20 images simultaneously' },
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-[#1C1D23] border border-[#2D2E35] text-center">
                <div className="w-12 h-12 rounded-xl bg-[#14151A] flex items-center justify-center mx-auto mb-3">
                  <span className="text-[32px]">{feature.icon}</span>
                </div>
                <h4 className="text-[18px] font-medium text-white mb-2">{feature.title}</h4>
                <p className="text-[14px] text-[#6E7191]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

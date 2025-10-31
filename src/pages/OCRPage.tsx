import { ArrowLeft, FileText } from 'lucide-react';
import type { Page } from '../App';
import { UploadArea } from '../components/UploadArea';

interface OCRPageProps {
  onNavigate: (page: Page) => void;
}

export function OCRPage({ onNavigate }: OCRPageProps) {
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files);
    // This would integrate with the original OCR functionality
  };

  return (
    <div className="px-8 py-12 max-w-[1200px] mx-auto">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#00E676] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E676] to-[#2979FF] flex items-center justify-center mx-auto mb-4">
          <FileText className="text-white" size={32} strokeWidth={2} />
        </div>
        <h1 className="text-white mb-2">OCR Text Extraction</h1>
        <p className="text-[#9E9E9E]">
          Extract text from images with AI-powered precision
        </p>
      </div>

      <UploadArea onFilesSelected={handleFilesSelected} />

      <div className="mt-12 grid grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A] text-center">
          <div className="w-12 h-12 rounded-xl bg-[#1A1A1D] flex items-center justify-center mx-auto mb-3">
            <span className="text-[24px]">🎯</span>
          </div>
          <h3 className="text-white mb-2">Auto-Detection</h3>
          <p className="text-[14px] text-[#9E9E9E]">
            Automatically detects document types and text regions
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A] text-center">
          <div className="w-12 h-12 rounded-xl bg-[#1A1A1D] flex items-center justify-center mx-auto mb-3">
            <span className="text-[24px]">🌍</span>
          </div>
          <h3 className="text-white mb-2">Multi-Language</h3>
          <p className="text-[14px] text-[#9E9E9E]">
            Supports 100+ languages with automatic detection
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141416] border border-[#25252A] text-center">
          <div className="w-12 h-12 rounded-xl bg-[#1A1A1D] flex items-center justify-center mx-auto mb-3">
            <span className="text-[24px]">⚡</span>
          </div>
          <h3 className="text-white mb-2">Batch Processing</h3>
          <p className="text-[14px] text-[#9E9E9E]">
            Process up to 50 images simultaneously
          </p>
        </div>
      </div>
    </div>
  );
}

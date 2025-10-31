import { Check, Loader2, AlertCircle, X } from 'lucide-react';

interface ImageThumbnailProps {
  id: string;
  filename: string;
  preview: string;
  selected: boolean;
  status: 'idle' | 'processing' | 'completed' | 'error';
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
  error?: string;
}

export function ImageThumbnail({
  id,
  filename,
  preview,
  selected,
  status,
  onClick,
  onDelete,
  error
}: ImageThumbnailProps) {
  return (
    <div
      className={`
        relative w-full h-[120px] rounded-xl p-3
        flex flex-col cursor-pointer
        transition-all duration-250 ease-out
        ${selected
          ? 'border-2 border-[#00E676] bg-[#1F1F1F] shadow-[0_0_0_4px_rgba(0,230,118,0.1)]'
          : status === 'error'
          ? 'border border-[#FF5252] bg-[#1A1A1A] opacity-70'
          : 'border border-[#2C2C2C] bg-[#1A1A1A] hover:border-[#2979FF] hover:bg-[#1F1F1F] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
        }
      `}
      onClick={() => onClick(id)}
      role="button"
      aria-label={`Imagem ${filename}. ${selected ? 'Selecionada' : 'Clique para visualizar texto extraído'}`}
      aria-pressed={selected}
    >
      {/* Image Preview */}
      <div className="relative h-[72px] w-full rounded-lg overflow-hidden mb-2">
        <img
          src={preview}
          alt={`Preview de ${filename}`}
          className="w-full h-full object-cover"
        />
        
        {/* Processing Overlay */}
        {status === 'processing' && (
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00E676]" size={24} />
          </div>
        )}
      </div>

      {/* Filename */}
      <p className="text-[12px] text-[#E0E0E0] truncate" title={filename}>
        {filename}
      </p>

      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00E676] flex items-center justify-center">
          <Check className="text-[#0F0F0F]" size={16} strokeWidth={3} />
        </div>
      )}

      {/* Error Indicator */}
      {status === 'error' && (
        <div 
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FF5252] flex items-center justify-center"
          title={error}
        >
          <AlertCircle className="text-white" size={16} />
        </div>
      )}

      {/* Delete Button */}
      {onDelete && status !== 'processing' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-150 hover:bg-[#242424] hover:border-[#FF5252]"
          aria-label={`Deletar ${filename}`}
        >
          <X className="text-[#E0E0E0] hover:text-[#FF5252]" size={14} />
        </button>
      )}
    </div>
  );
}

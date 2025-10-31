import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function UploadArea({ onFilesSelected, disabled }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 10;

  const validateFiles = (files: File[]): string | null => {
    if (files.length > maxFiles) {
      return `Máximo de ${maxFiles} arquivos permitidos`;
    }

    for (const file of files) {
      if (!acceptedFormats.includes(file.type)) {
        return `${file.name}: Formato não suportado`;
      }
      if (file.size > maxFileSize) {
        return `${file.name}: Arquivo excede 10MB`;
      }
    }

    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validationError = validateFiles(fileArray);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    onFilesSelected(fileArray);
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    handleFiles(e.dataTransfer.files);
  }, [disabled]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          w-full h-[400px] rounded-2xl border-2 border-dashed p-12
          flex flex-col items-center justify-center
          transition-all duration-150 ease-out
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isDragOver && !disabled
            ? 'border-[#00E676] bg-[rgba(0,230,118,0.05)] scale-[1.02] shadow-[0_0_20px_rgba(0,230,118,0.3)]'
            : error
            ? 'border-[#FF5252] bg-[rgba(255,82,82,0.05)]'
            : 'border-[#2C2C2C] bg-[#1A1A1A] hover:border-[#00E676] hover:bg-[#1F1F1F]'
          }
        `}
      >
        <Upload
          className={`mb-6 transition-colors duration-150 ${
            isDragOver && !disabled ? 'text-[#00E676]' : error ? 'text-[#FF5252]' : 'text-[#616161]'
          }`}
          size={64}
          strokeWidth={2}
        />

        <h2 className="mb-6 text-[#E0E0E0] text-center">
          Arraste e solte suas imagens aqui
        </h2>

        <div className="my-6 text-[#9E9E9E]">ou</div>

        <label>
          <input
            type="file"
            multiple
            accept={acceptedFormats.join(',')}
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
          />
          <div
            className={`
              h-12 px-8 rounded-lg
              bg-[#00E676] text-[#0F0F0F]
              flex items-center justify-center
              transition-all duration-150
              ${disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#00C965] hover:shadow-[0_4px_12px_rgba(0,230,118,0.3)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer'
              }
            `}
          >
            Selecionar Arquivos
          </div>
        </label>

        <p className="mt-6 text-[11px] text-[#9E9E9E] text-center">
          Formatos suportados: JPG, PNG, WEBP • Tamanho máximo: 10MB por arquivo
        </p>
      </div>

      {error && (
        <p className="mt-4 text-[12px] text-[#FF5252] text-center">{error}</p>
      )}
    </div>
  );
}

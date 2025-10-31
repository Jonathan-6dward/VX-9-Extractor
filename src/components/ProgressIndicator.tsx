import { Loader2 } from 'lucide-react';

interface ProgressIndicatorProps {
  percentage: number;
  completed: number;
  total: number;
  variant?: 'linear' | 'circular';
  label?: string;
}

export function ProgressIndicator({
  percentage,
  completed,
  total,
  variant = 'linear',
  label = 'Extraindo texto...'
}: ProgressIndicatorProps) {
  if (variant === 'circular') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader2 
          className="animate-spin text-[#00E676]" 
          size={48} 
          strokeWidth={3}
        />
        <p className="text-[#E0E0E0]">{label}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-1 bg-[#2C2C2C] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00E676] to-[#2979FF] transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Processando imagens: ${completed} de ${total} completas`}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-[#E0E0E0]">{label}</p>
        <p className="text-[12px] text-[#9E9E9E]">
          {completed} de {total} imagens processadas
        </p>
      </div>
    </div>
  );
}

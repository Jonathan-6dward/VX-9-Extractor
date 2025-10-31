import { useState, useEffect } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TextDisplayAreaProps {
  content: string;
  filename?: string;
  editable?: boolean;
  loading?: boolean;
  onChange?: (text: string) => void;
}

export function TextDisplayArea({
  content,
  filename,
  editable = true,
  loading = false,
  onChange
}: TextDisplayAreaProps) {
  const [text, setText] = useState(content);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Texto copiado!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Erro ao copiar. Tente novamente.');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename ? `${filename.replace(/\.[^/.]+$/, '')}.txt` : 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Arquivo baixado!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange?.(newText);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[400px] rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#2C2C2C] border-t-[#00E676] animate-spin" />
          <p className="text-[#9E9E9E] italic">Carregando texto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleCopy}
          className="h-10 px-4 rounded-lg border border-[#2C2C2C] bg-[#1A1A1A] text-[#E0E0E0] flex items-center gap-2 hover:border-[#2979FF] hover:bg-[rgba(41,121,255,0.05)] hover:text-[#2979FF] transition-all duration-150"
          aria-label="Copiar texto para área de transferência"
          title="Copiar texto"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copiado!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copiar
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="h-10 px-4 rounded-lg border border-[#2C2C2C] bg-[#1A1A1A] text-[#E0E0E0] flex items-center gap-2 hover:border-[#2979FF] hover:bg-[rgba(41,121,255,0.05)] hover:text-[#2979FF] transition-all duration-150"
          aria-label="Baixar texto como arquivo"
          title="Baixar texto"
        >
          <Download size={16} />
          Baixar
        </button>
      </div>

      {/* Text Area */}
      <div className="w-full min-h-[400px] rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] p-6">
        <textarea
          value={text}
          onChange={handleChange}
          readOnly={!editable}
          placeholder="O texto extraído aparecerá aqui..."
          className="w-full h-full min-h-[368px] bg-transparent border-none text-[#E0E0E0] resize-y outline-none custom-scrollbar placeholder:text-[#616161] placeholder:italic"
          aria-label="Texto extraído da imagem. Editável"
          aria-describedby="edit-hint"
        />
        <span id="edit-hint" className="sr-only">
          Você pode editar este texto antes de copiar ou baixar
        </span>
      </div>
    </div>
  );
}

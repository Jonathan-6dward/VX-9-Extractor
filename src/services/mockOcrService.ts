// Mock OCR Service - Simulates API calls with realistic delays

export interface UploadResponse {
  success: boolean;
  data: {
    uploadId: string;
    files: {
      fileId: string;
      filename: string;
      size: number;
      status: string;
    }[];
    totalFiles: number;
  };
  message: string;
}

export interface JobResponse {
  success: boolean;
  data: {
    jobId: string;
    status: string;
    totalFiles: number;
    estimatedTime: number;
  };
  message: string;
}

export interface StatusResponse {
  success: boolean;
  data: {
    jobId: string;
    status: 'processing' | 'completed' | 'completed_with_errors' | 'failed';
    progress: {
      completed: number;
      total: number;
      percentage: number;
    };
    files: {
      fileId: string;
      filename: string;
      status: 'processing' | 'completed' | 'failed';
      extractedText: string | null;
      confidence?: number;
      error?: string;
    }[];
  };
}

const generateId = (prefix: string) => {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
};

const mockTexts = [
  `NOTA FISCAL
Data: 25/10/2024
Valor: R$ 150,00
Cliente: João Silva
Produto: Serviços de Consultoria
Forma de Pagamento: PIX`,
  
  `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Este contrato é celebrado entre as partes:
CONTRATANTE: Maria Santos
CONTRATADA: Tech Solutions LTDA

Objeto: Desenvolvimento de software web
Prazo: 90 dias corridos
Valor Total: R$ 25.000,00`,
  
  `RECIBO DE PAGAMENTO

Recebi de Carlos Oliveira
A quantia de R$ 500,00
Referente a: Aluguel de imóvel
Mês: Outubro/2024

São Paulo, 15 de outubro de 2024`,
  
  `DECLARAÇÃO

Declaro para os devidos fins que Ana Paula Costa
está regularmente matriculada no curso de
Engenharia de Software, turma 2024.1

Atenciosamente,
Coordenação Acadêmica`,
  
  `EXTRATO BANCÁRIO

Conta: 12345-6
Agência: 0001
Período: 01/10/2024 a 30/10/2024

Saldo Anterior: R$ 1.500,00
Total de Créditos: R$ 3.200,00
Total de Débitos: R$ 2.100,00
Saldo Atual: R$ 2.600,00`
];

class MockOCRService {
  async uploadImages(files: File[]): Promise<UploadResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const uploadId = generateId('upl');
    const uploadedFiles = files.map(file => ({
      fileId: generateId('file'),
      filename: file.name,
      size: file.size,
      status: 'uploaded'
    }));
    
    return {
      success: true,
      data: {
        uploadId,
        files: uploadedFiles,
        totalFiles: files.length
      },
      message: 'Arquivos enviados com sucesso'
    };
  }
  
  async processOCR(uploadId: string, fileIds: string[]): Promise<JobResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        jobId: generateId('job'),
        status: 'processing',
        totalFiles: fileIds.length,
        estimatedTime: fileIds.length * 3
      },
      message: 'Processamento iniciado'
    };
  }
  
  async checkStatus(
    jobId: string, 
    fileIds: string[],
    currentProgress: number
  ): Promise<StatusResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const totalFiles = fileIds.length;
    const newProgress = Math.min(currentProgress + 1, totalFiles);
    const percentage = Math.round((newProgress / totalFiles) * 100);
    
    const files = fileIds.map((fileId, index) => {
      const filename = `document_${index + 1}.jpg`;
      
      if (index < newProgress) {
        // Randomly fail some files (10% chance)
        const shouldFail = Math.random() < 0.1 && index !== 0; // Never fail first file
        
        if (shouldFail) {
          return {
            fileId,
            filename,
            status: 'failed' as const,
            extractedText: null,
            error: 'Imagem muito escura ou borrada. Não foi possível extrair texto.'
          };
        }
        
        return {
          fileId,
          filename,
          status: 'completed' as const,
          extractedText: mockTexts[index % mockTexts.length],
          confidence: 0.85 + Math.random() * 0.14 // 0.85 - 0.99
        };
      }
      
      return {
        fileId,
        filename,
        status: 'processing' as const,
        extractedText: null
      };
    });
    
    const hasErrors = files.some(f => f.status === 'failed');
    const status = newProgress === totalFiles 
      ? (hasErrors ? 'completed_with_errors' : 'completed')
      : 'processing';
    
    return {
      success: true,
      data: {
        jobId,
        status,
        progress: {
          completed: newProgress,
          total: totalFiles,
          percentage
        },
        files
      }
    };
  }
}

export const mockOcrService = new MockOCRService();

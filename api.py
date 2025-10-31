
import re
import io
from fastapi import FastAPI, File, UploadFile, HTTPException
from PIL import Image
import pytesseract
import uvicorn

# Inicializa a aplicação FastAPI
app = FastAPI(
    title="API de Extração de Texto de Imagens",
    description="Uma API para extrair texto de imagens usando Tesseract OCR.",
    version="1.0.0"
)

def clean_text(text: str) -> str:
    """
    Limpa o texto extraído, removendo espaços extras e caracteres não imprimíveis.
    """
    text = re.sub(r'\s+', ' ', text)
    text = ''.join(char for char in text if char.isprintable() or char == '\n')
    return text.strip()

@app.get("/", tags=["Root"])
async def read_root():
    """
    Endpoint raiz para verificar se a API está funcionando.
    """
    return {"message": "Bem-vindo à API de Extração de Texto. Use o endpoint /extract-text para enviar uma imagem."}

@app.post("/extract-text", tags=["OCR"])
async def extract_text_from_image(file: UploadFile = File(...)):
    """
    Recebe um arquivo de imagem, extrai o texto usando OCR e o retorna.

    - **file**: O arquivo de imagem a ser processado (formatos suportados: PNG, JPG, JPEG).
    """
    # Validação do tipo de arquivo
    if file.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Tipo de arquivo inválido. Por favor, envie uma imagem PNG ou JPG.")

    try:
        # Lê o conteúdo do arquivo em memória
        image_bytes = await file.read()
        
        # Abre a imagem usando Pillow
        img = Image.open(io.BytesIO(image_bytes))

        # Converte para RGB se necessário (melhora a compatibilidade com Tesseract)
        if img.mode != 'RGB':
            img = img.convert('RGB')

        # Extrai o texto usando Tesseract OCR para o idioma português
        extracted_text = pytesseract.image_to_string(img, lang='por')
        
        # Limpa o texto extraído
        cleaned_text = clean_text(extracted_text)

        return {
            "filename": file.filename,
            "text": cleaned_text if cleaned_text else "[Nenhum texto detectado]"
        }

    except Exception as e:
        # Captura exceções genéricas durante o processamento
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro ao processar a imagem: {str(e)}")

if __name__ == "__main__":
    # Comando para rodar a API: uvicorn api:app --reload
    uvicorn.run(app, host="0.0.0.0", port=8000)

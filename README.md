# Extrator de Texto de Imagens (OCR) - API e Frontend

Este projeto é uma solução completa para extrair texto de imagens, oferecendo tanto uma aplicação de desktop quanto uma moderna interface web com uma API backend.

## Funcionalidades

- **Interface Web (React)**: Faça upload de imagens diretamente no navegador e veja o texto extraído em tempo real.
- **API Backend (FastAPI)**: Um endpoint robusto que recebe imagens e retorna o texto, servindo como a base para a interface web.
- **Aplicação Desktop (Tkinter)**: Uma aplicação nativa para Windows/Linux/Mac para extrair texto de imagens e carrosséis de redes sociais (TikTok/Instagram).

## Tecnologias Utilizadas

- **Frontend**: React, Vite, TypeScript
- **Backend**: Python, FastAPI, Uvicorn
- **OCR**: Tesseract
- **Desktop App**: Python, Tkinter

## Pré-requisitos

Antes de começar, garanta que você tem os seguintes softwares instalados:

- **Python 3.11+**
- **Node.js 18+** e **npm**
- **Tesseract OCR**: É uma dependência de sistema.
  - No Ubuntu/Debian: `sudo apt-get install tesseract-ocr tesseract-ocr-por`
  - No Windows/Mac: [Siga o instalador oficial](https://github.com/tesseract-ocr/tesseract)

## Como Rodar o Projeto

Siga os passos abaixo para ter o ambiente completo (API + Frontend) funcionando.

**1. Clone o Repositório**
```bash
git clone <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
cd text-extractor
```

**2. Configure e Rode o Backend (API)**

Abra um terminal na pasta do projeto e execute:

```bash
# Instale as dependências do Python
pip install -r requirements.txt

# Inicie o servidor da API
uvicorn api:app --reload
```
> A API estará rodando em `http://127.0.0.1:8000`.

**3. Configure e Rode o Frontend (React)**

Abra um **novo terminal** na mesma pasta do projeto e execute:

```bash
# Instale as dependências do Node.js
npm install

# Inicie a aplicação React
npm run dev
```
> A interface web estará acessível no endereço fornecido (geralmente `http://127.0.0.1:5173`).

**4. (Opcional) Rodando a Aplicação Desktop**

Se quiser usar a aplicação de desktop original, execute:

```bash
./start.sh
```

## Estrutura do Projeto

- `api.py`: O servidor da API web construído com FastAPI.
- `carousel_text_extractor.py`: A aplicação de desktop original com Tkinter.
- `index.html` e `src/`: Contém o código-fonte da aplicação frontend em React.
- `requirements.txt`: Dependências do Python (backend e desktop).
- `package.json`: Dependências do Node.js (frontend).
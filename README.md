![VX-9 Banner](URL_DA_IMAGEM_DO_BANNER_AQUI)

# 🛰️ VX-9 Extractor

**Droide Experimental de Visão e Leitura — desenvolvido por [Anakyn](https://github.com/anakyn)**

> *“Nenhum dado escapará ao meu campo de visão.”*

O **VX-9 Extractor** é um **droide de análise visual** criado para **identificar e extrair textos presentes em imagens** de forma rápida, precisa e automatizada.
Desenvolvido com tecnologia OCR avançada (*Tesseract*), o sistema oferece uma **API robusta**, uma **interface web moderna** e uma **aplicação desktop nativa**, permitindo integração completa entre visão computacional e automação.

---

## ⚙️ **Arquitetura do Droide**

* **Interface Web (React + Vite + TypeScript):**
  Faça upload de imagens diretamente do navegador e veja o texto reconhecido em tempo real.
* **API Backend (FastAPI + Uvicorn):**
  O núcleo de processamento do VX-9, responsável por interpretar as imagens e retornar o texto extraído.
* **Aplicação Desktop (Tkinter):**
  Uma versão leve e independente para uso local em Windows, Linux ou Mac. Ideal para fluxos offline e extração em massa.

---

## 🔮 **Tecnologias que Alimentam o VX-9**

| Sistema         | Tecnologia               |
| --------------- | ------------------------ |
| **Frontend**    | React, Vite, TypeScript  |
| **Backend**     | Python, FastAPI, Uvicorn |
| **OCR Engine**  | Tesseract                |
| **Desktop App** | Python, Tkinter          |

---

## 🧩 **Instalação e Inicialização do Sistema**

### 1. Clone o Repositório

```bash
git clone https://github.com/Jonathan-6dward/VX-9-Extractor.git
cd VX-9-Extractor
```

### 2. Inicie o Núcleo (API Backend)

```bash
# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor FastAPI
uvicorn api:app --reload
```

🔗 API ativa em: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 3. Ative o Painel de Controle (Frontend React)

```bash
# Instale dependências do Node.js
npm install

# Inicie o frontend
npm run dev
```

💻 Interface disponível em: **[http://127.0.0.1:5173](http://127.0.0.1:5173)**

---

### 4. (Opcional) Execute o Módulo Desktop

```bash
./start.sh
```

---

## 🧠 **Estrutura do Projeto**

```
vx9-extractor/
├── api.py                     # Núcleo FastAPI (módulo OCR)
├── carousel_text_extractor.py # Aplicação desktop (Tkinter)
├── src/                       # Interface Web (React)
├── index.html                 # Base do frontend
├── requirements.txt           # Dependências Python
├── package.json               # Dependências JavaScript
└── README.md                  # Este arquivo
```

---

## ⚔️ **Protocolo VX-9**

> “Forjado para observar, projetado para compreender.
> O VX-9 transforma visão em informação.”

**Status:** Ativo
**Versão:** 1.0.0
**Codinome:** *Vision Extractor Unit*
**Desenvolvido por:** [Anakyn](https://github.com/anakyn)

---

## 🩶 **Licença**

Este projeto segue os princípios do Código Sith — ou, mais precisamente, a [MIT License](LICENSE).

> *O conhecimento deve ser livre… e poderoso.*

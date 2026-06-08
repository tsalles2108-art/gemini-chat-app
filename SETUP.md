# 🚀 Guia de Setup - Gemini Chat App

## ⚡ Quick Start

### Opção 1: Desenvolvimento Local

#### Backend
```bash
cd backend
npm install
npm run dev
```

O servidor backend estará rodando em `http://localhost:5000`

#### Frontend (novo terminal)
```bash
cd frontend
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000`

### Opção 2: Docker Compose

```bash
docker-compose up --build
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

## 📋 Pré-requisitos

- Node.js 16+ (para desenvolvimento local)
- Docker & Docker Compose (para usar containers)
- Chave API Google Gemini (já configurada)

## ✨ Features

- ✅ Chat em tempo real com Gemini
- ✅ Análise de documentos (PDF, imagens, texto)
- ✅ Histórico de conversas
- ✅ Interface moderna com Tailwind CSS
- ✅ Responsivo
- ✅ Suporte a múltiplos formatos de arquivo

## 📝 Variáveis de Ambiente

### Backend (.env)
```
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=sua_chave_aqui
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🌐 API Endpoints

### Chat
- \`POST /api/chat\` - Enviar mensagem
- \`GET /api/chat/history\` - Obter histórico
- \`POST /api/chat/clear\` - Limpar histórico

### Documentos
- \`POST /api/documents/analyze\` - Analisar documento
- \`GET /api/documents/history\` - Histórico de análises

---

**Desenvolvido com ❤️ usando Google Gemini API**

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para ler JSON nas requisições
app.use(express.json());

// A MÁGICA ACONTECE AQUI: Serve os arquivos visuais da pasta 'public' automaticamente
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a sua API do Gemini (exemplo)
app.post('/api/chat', (req, res) => {
  // Seu código futuro de integração com o Gemini entrará aqui
  res.json({ message: "Resposta do Gemini aqui" });
});

// Qualquer outra rota que não seja da API vai abrir o index.html do frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor unificado rodando na porta ${PORT}`);
});

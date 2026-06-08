const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 10000;

// Inicializa o SDK do Google buscando a chave das variáveis de ambiente do Render
// Certifique-se de que a variável lá se chama GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota de comunicação com o modelo Gemini 2.5 Flash
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem vazia." });
  }

  try {
    // Chamada oficial usando as especificações para o gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    // Retorna o texto gerado de volta para a nossa página
    res.json({ response: response.text });
  } catch (error) {
    console.error("Erro na API do Gemini:", error);
    res.status(500).json({ response: "Ops, tive um problema ao processar isso na API do Google." });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor integrado rodando na porta ${PORT}`);
});

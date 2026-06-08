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
"multer": "^1.4.5-lts.1"
const express = require('express');
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Mantém o arquivo na memória RAM para não sujar o disco do Render

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.static('public'));
app.use(express.json());

// Rota de chat alterada para aceitar um arquivo único vindo do campo 'file'
app.post('/api/chat', upload.single('file'), async (req, res) => {
    try {
        const userMessage = req.body.message || "Analise o arquivo enviado.";
        const contents = [];

        // Se houver um arquivo, converte-o para o formato inlineData aceito pela API do Gemini
        if (req.file) {
            const filePart = {
                inlineData: {
                    data: req.file.buffer.toString("base64"),
                    mimeType: req.file.mimetype
                }
            };
            contents.push(filePart);
        }

        // Adiciona o texto do usuário
        contents.push(userMessage);

        // Envia para o modelo (o gemini-2.5-flash processa nativamente imagens, PDFs e textos)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
        });

        res.json({ response: response.text });
    } catch (error) {
        console.error("Erro na API do Gemini:", error);
        res.status(500).json({ error: "Erro interno no servidor de IA." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

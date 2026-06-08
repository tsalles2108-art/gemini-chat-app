const express = require('express');
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

const app = express();
// Configura o multer para receber o arquivo na memória RAM
const upload = multer({ storage: multer.memoryStorage() }); 

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.static('public'));
app.use(express.json());

// Rota integrada para receber texto e/ou arquivo
app.post('/api/chat', upload.single('file'), async (req, res) => {
    try {
        const userMessage = req.body.message || "Analise o arquivo enviado.";
        const contents = [];

        // Se o usuário anexou um arquivo, prepara para enviar à API do Gemini
        if (req.file) {
            contents.push({
                inlineData: {
                    data: req.file.buffer.toString("base64"),
                    mimeType: req.file.mimetype
                }
            });
        }

        // Adiciona o texto da mensagem
        contents.push(userMessage);

        // Executa a chamada com o modelo multimodal
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

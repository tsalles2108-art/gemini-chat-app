const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Servidor Backend do Gemini Chat rodando com sucesso!');
});

app.listen(PORT, () => {
  console.log(`Servidor ativo e escutando na porta ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the translation API!');
});

app.post('/translate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text to translate is required' });
  }

  try {
    const translation = await translate(text, { to: 'fr', apiKey: process.env.GOOGLE_TRANSLATE_API_KEY });
    res.json({ translation: translation.text });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

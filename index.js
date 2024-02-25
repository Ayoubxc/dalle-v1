
const express = require('express');
const Replicate = require('replicate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const replicate = new Replicate({   auth: "r8_6yGN7OMnvt84GFFL03hsS0QIZPT76wX3IpKef",
});

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`Received prompt: ${prompt}`);

    const output = await replicate.run(
      'lucataco/open-dalle-v1.1:1c7d4c8dec39c7306df7794b28419078cb9d18b9213ab1c21fdc46a1deca0144',
      { input: { prompt } }
    );

    console.log(`Response for prompt "${prompt}":`, output);

    return res.json({ result: output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

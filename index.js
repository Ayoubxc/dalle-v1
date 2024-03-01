const express = require('express');
const Replicate = require('replicate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const replicate = new Replicate({ auth: "r8_6yGN7OMnvt84GFFL03hsS0QIZPT76wX3IpKef" });

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const { text, speaker, language, cleanup_voice } = req.query;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log(`Received text: ${text}`);

    const output = await replicate.run(
      'lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e',
      {
        input: {
          text,
          speaker,
          language,
          cleanup_voice: cleanup_voice === 'true',
        },
      }
    );

    console.log(`Response for text "${text}":`, output);

    return res.json({ result: output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

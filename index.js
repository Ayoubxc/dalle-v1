const express = require('express');
const Replicate = require('replicate');

const app = express();
const replicate = new Replicate({
  auth: "r8_6yGN7OMnvt84GFFL03hsS0QIZPT76wX3IpKef",
});

app.post('/generate-audio', async (req, res) => {
  try {
    const { text, speaker, language, cleanup_voice } = req.body;
    const output = await replicate.run(
      'lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e',
      {
        input: {
          text,
          speaker,
          language,
          cleanup_voice,
        },
      }
    );
    res.json(output);
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});

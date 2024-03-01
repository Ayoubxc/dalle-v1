const express = require('express');
const Replicate = require('replicate');
const url = require('url');

const app = express();
const replicate = new Replicate({
  auth: "r8_6yGN7OMnvt84GFFL03hsS0QIZPT76wX3IpKef",
});

// معالجة طلبات favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/generate-audio', async (req, res) => {
  try {
    const queryObject = url.parse(req.url,true).query;
    const text = queryObject.text;
    const output = await replicate.run(
      'lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e',
      {
        input: {
          text,
          language: "en",
          cleanup_voice: false
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

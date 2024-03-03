const express = require('express');
const Replicate = require('replicate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const replicate = new Replicate({
  auth: "r8_6yGN7OMnvt84GFFL03hsS0QIZPT76wX3IpKef",
});

const PORT = process.env.PORT || 3000;

app.get('/synthesize', async (req, res) => {
  try {
    const output = await replicate.run(
      "lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e",
      {
        input: {
          text: req.query.text,
          speaker: req.query.speaker,
          language: req.query.language,
          cleanup_voice: req.query.cleanup_voice
        }
      }
    );
    res.json(output);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

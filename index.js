const express = require('express');
const Replicate = require('replicate');

const app = express();
const replicate = new Replicate({
  auth: "r8_IRa7if9DM8j0Hymq1MijtPWDmBfF8di2Ys5cV", // ضع مفتاح API هنا
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generateAnime', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const output = await replicate.run(
      "datong-new/anime:7d80ed77a21c6cb7addd13a6ef169d54a320f40aa060fc0efb76ba2d9c2ce782",
      {
        input: {
          prompt: "a person",
          image: image,
          lora_scale: 1,
          negative_prompt: "",
          prompt_strength: 4.5,
          denoising_strength: 0.65,
          human_face_strength: 1,
          control_depth_strength: 0.8
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

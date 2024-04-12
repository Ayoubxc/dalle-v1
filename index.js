const express = require('express');
const Replicate = require('replicate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const replicate = new Replicate({
  auth: r8_VNqij5t59t9qpapPvwzpIuMNLbuyCxc3zgESG, // تحديد المفتاح من متغير البيئة
});

const PORT = process.env.PORT || 3000;

app.post('/editImage', async (req, res) => {
  try {
    const output = await replicate.run(
      "timothybrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
      {
        input: {
          image: req.body.imageUrl,
          prompt: req.body.text,
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

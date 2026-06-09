import express from "express";
import { generateResponse } from "../services/geminiservice.js";

const router = express.Router();

router.post("/", async (req, res) => {
     console.log(req.body);
  try {
    const { message } = req.body;

    const reply = await generateResponse(message);

    res.json({
      success: true,
      reply
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
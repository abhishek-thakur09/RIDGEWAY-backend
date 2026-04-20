const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const AiRouter = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

AiRouter.post("/ai", async (req, res) => {
  try {
    const { message, events } = req.body;

    const prompt = `
Use only these events.
Return only valid JSON.

Question: ${message}

Events:
${JSON.stringify(events)}

Format:
{
  "title": "",
  "summary": "",
  "riskLevel": "",
  "actionItems": [],
  "confidence": 0
}
` ;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const raw = response.text;

    console.log("RAW AI:", raw);

    // Find JSON block
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}") + 1;

    const jsonString = raw.slice(start, end);

    const data = JSON.parse(jsonString);

    res.json(data);

  } catch (error) {
    console.log("BACKEND ERROR:", error);

    res.status(500).json({
      title: "Error",
      summary: "Backend failed.",
      riskLevel: "unknown",
      actionItems: [],
      confidence: 0
    });
  }
});

module.exports = AiRouter;
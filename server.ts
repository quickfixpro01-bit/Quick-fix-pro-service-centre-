import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with process.env.GEMINI_API_KEY and telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'QuickFixPro Bangalore API' });
});

// Gemini Multi-Turn AI Appliance Diagnostic Assistant Chat API
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const systemInstruction = `You are the Quick Fix Pro AI Assistant, Bangalore's expert doorstep appliance repair diagnostic engine.
Your role:
1. Help customers diagnose problems with home appliances:
   - Washing Machines (front load, top load, semi-automatic: drum noise, water leak, drain error, spinning issues)
   - Refrigerators (single door, double door, side-by-side: cooling failure, gas leak, compressor noise, ice build-up)
   - Air Conditioners (split, window, inverter: gas charging, water dripping, cooling loss, PCB repair)
   - Microwave Ovens (solo, grill, convection: not heating, sparking, turntable issue)
   - Water Purifiers (RO, UV, UF: filter replacement, low flow, taste issue)
   - Televisions (LED, OLED, QLED: display line, no power, sound issue)
2. Provide transparent Bangalore doorstep repair cost estimates (in ₹ INR) with typical parts range.
3. Highlight Quick Fix Pro guarantees:
   - ₹199 Inspection Fee (WAIVED on repair)
   - 6-Month Written Warranty Card
   - 90-Minute Express Doorstep Dispatch across Koramangala, Indiranagar, Whitefield, HSR Layout, Yelahanka, Electronic City, and all Bangalore zones.
   - Hotline: +91 80959 96638
4. Be polite, concise, structured, helpful, and encourage booking a doorstep technician when needed.`;

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction,
      },
    });

    // Replay conversation history if present
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' && msg.content) {
          await chat.sendMessage({ message: msg.content });
        }
      }
    }

    const response = await chat.sendMessage({ message });
    const replyText = response.text || 'I am here to assist with your appliance repair needs in Bangalore.';

    res.json({
      success: true,
      reply: replyText
    });

  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process AI Assistant message.',
      details: error?.message || 'Unknown error'
    });
  }
});

// Setup Vite middleware in dev mode or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

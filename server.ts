import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function getCliArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  const prefix = `${flag}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

const isProduction =
  process.env.NODE_ENV === 'production' ||
  process.env.npm_lifecycle_event === 'start';

const cliPort = Number(getCliArg('--port'));
const envPort = Number(process.env.PORT);
const nginxPort = Number(process.env.NGINX_PORT);
const defaultAppPort = Number(process.env.DEFAULT_APP_PORT) || 3000;

const port =
  Number.isFinite(cliPort) && cliPort > 0
    ? cliPort
    : !isProduction && nginxPort && envPort === nginxPort
      ? defaultAppPort
      : Number.isFinite(envPort) && envPort > 0
        ? envPort
        : defaultAppPort;

const host = getCliArg('--host') || '0.0.0.0';

app.use(express.json());

// Lazily initialize Gemini SDK only when needed so missing env vars do not crash server startup
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'QuickFixPro Bangalore API' });
});

// Gemini Multi-Turn AI Appliance Diagnostic Assistant Chat API
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        error: 'AI Assistant is not configured on this server.',
      });
    }

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
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process AI Assistant message.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Setup Vite middleware in dev mode or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

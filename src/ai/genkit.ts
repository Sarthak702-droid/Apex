import {config} from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI as googleAIGenkit} from '@genkit-ai/google-genai';

export const googleAI = googleAIGenkit;

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

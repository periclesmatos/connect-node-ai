import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { env } from '../env.js';

const google = createGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
});

export const gemini = google('gemini-3-flash-preview');

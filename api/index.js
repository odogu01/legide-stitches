/**
 * Legide Stitches — Vercel Serverless Function
 * Serves the static frontend on Vercel's Node.js runtime.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename)); // Go up from api/ to project root

const app = express();

// Serve static files from the project root
app.use(express.static(join(__dirname)));

// Redirect root to homepage
app.get('/', (_req, res) => {
  res.redirect('/src/pages/index.html');
});

// Export as Vercel serverless function
export default app;

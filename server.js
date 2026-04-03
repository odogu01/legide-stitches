/**
 * Legide Stitches — Development Server
 * Serves the static frontend with auto-reload via polling.
 * Run: npm run dev
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { watch } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the project root
app.use(express.static(__dirname));

// Redirect root to homepage
app.get('/', (_req, res) => {
  res.redirect('/src/pages/index.html');
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n  🧶 Legide Stitches`);
  console.log(`  ─────────────────────────`);
  console.log(`  ➜  Local:   http://localhost:${PORT}`);
  console.log(`  ➜  Home:    http://localhost:${PORT}/src/pages/index.html`);
  console.log(`  ➜  Shop:    http://localhost:${PORT}/src/pages/shop.html`);
  console.log(`  ➜  About:   http://localhost:${PORT}/src/pages/about.html`);
  console.log(`  ➜  Contact: http://localhost:${PORT}/src/pages/contact.html`);
  console.log(`  ─────────────────────────\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n  Server stopped.');
  server.close();
  process.exit(0);
});

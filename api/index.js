/**
 * Legide Stitches — Vercel Serverless Function
 * Handles routing for the static frontend.
 */

import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

export default function handler(req, res) {
  let url = req.url.split('?')[0];

  // Route clean URLs to HTML files
  if (url === '/' || url === '') {
    url = '/src/pages/index.html';
  } else if (url === '/shop') {
    url = '/src/pages/shop.html';
  } else if (url === '/about') {
    url = '/src/pages/about.html';
  } else if (url === '/contact') {
    url = '/src/pages/contact.html';
  }

  const filePath = join(__dirname, url);
  const rootPath = join(__dirname, '..');

  // Security: prevent directory traversal
  if (!filePath.startsWith(rootPath)) {
    res.status(403).send('Forbidden');
    return;
  }

  if (!existsSync(filePath)) {
    res.status(404).send(`Not Found: ${url}`);
    return;
  }

  try {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const file = readFileSync(filePath);
    res.setHeader('Content-Type', contentType);
    res.status(200).send(file);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
}

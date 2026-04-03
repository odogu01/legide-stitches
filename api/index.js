/**
 * Legide Stitches — Vercel Serverless Function
 * Handles routing for the static frontend.
 */

const { readFileSync, existsSync } = require('fs');
const { join, extname } = require('path');

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

module.exports = function handler(req, res) {
  let url = req.url.split('?')[0]; // Strip query params

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

  // Build absolute file path
  const filePath = join(__dirname, '..', url);

  // Security: prevent directory traversal
  const rootPath = join(__dirname, '..');
  if (!filePath.startsWith(rootPath)) {
    res.status(403).send('Forbidden');
    return;
  }

  // Check if file exists
  if (!existsSync(filePath)) {
    res.status(404).send(`Not Found: ${url}`);
    return;
  }

  // Read and serve the file
  try {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const file = readFileSync(filePath);
    res.setHeader('Content-Type', contentType);
    res.status(200).send(file);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

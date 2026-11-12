// Local stand-in for Vercel: serves index.html and /api/deepgram-token.
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import handler from './api/deepgram-token.js';

if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const port = Number(process.env.PORT || 5173);
createServer(async (req, res) => {
  if (req.url.startsWith('/api/deepgram-token')) {
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return res; };
    return handler(req, res);
  }
  if (req.url === '/' || req.url.startsWith('/?') || req.url === '/index.html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(readFileSync('index.html'));
  }
  res.statusCode = 404; res.end('not found');
}).listen(port, () => console.log(`RentCafe voice demo on http://localhost:${port}`));

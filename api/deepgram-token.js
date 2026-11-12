// Vercel serverless function: mints a short-lived Deepgram token so the
// browser never sees DEEPGRAM_API_KEY. The key needs the Member role.
export default async function handler(req, res) {
  const key = process.env.DEEPGRAM_API_KEY;
  if (!key) return res.status(500).json({ error: 'DEEPGRAM_API_KEY is not set' });

  const r = await fetch('https://api.deepgram.com/v1/auth/grant', {
    method: 'POST',
    headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ttl_seconds: 60 }),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) return res.status(502).json({ error: 'Deepgram grant failed', status: r.status, detail: body });

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ token: body.access_token, expires_in: body.expires_in });
}

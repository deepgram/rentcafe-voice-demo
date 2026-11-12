# RentCafe voice demo

Single-page Deepgram Voice Agent demo (Flux STT + Flux TTS) for a fictional RentCafe-style leasing site: FAQ, resident lookup, listing search, and tour booking driven by client-side function calls.

- `index.html` — the whole demo: page, data, system prompt, function definitions, agent settings, and the Tools tab.
- `api/deepgram-token.js` — Vercel function that mints a 60s Deepgram token so the API key stays server-side.
- `server.mjs` — local dev server (not deployed).

## Run locally

```sh
cp .env.example .env   # add DEEPGRAM_API_KEY
npm run dev            # http://localhost:5173
```

## Deploy

`vercel --prod`, with `DEEPGRAM_API_KEY` set as a Vercel environment variable.

Resident ID for testing: `T0482917`.

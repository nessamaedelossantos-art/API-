# API-[README.md](https://github.com/user-attachments/files/22164810/README.md)
# Chinese Proverbs API (Express.js)

A simple but unique API that serves Chinese proverbs (成语/谚语) with search, tags, pagination, random selection, and a deterministic **Proverb of the Day** feature.

## Features
- JSON responses for all endpoints
- List proverbs with pagination and optional search (`q`) and tag filters
- Get a random proverb (optionally filtered by tag, or deterministic via `seed`)
- Get **Proverb of the Day** for a given date (e.g. `?date=2025-01-01`) or today (UTC)
- Get proverb by `id`
- Submit feedback via a POST endpoint (stored locally in `data/feedback.log`)
- CORS enabled and basic security headers via Helmet

## Quick Start
```bash
git clone <your-repo-url> chinese-proverbs-api
cd chinese-proverbs-api
npm install
npm run start      # or: npm run dev  (with nodemon)
# Open: http://localhost:3000/api/v1/proverbs/random 
```

## Endpoints
Base URL: `http://localhost:3000/api/v1/proverbs/random`

- `GET /proverbs` — List with pagination and filters  
  Query: `page`, `limit`, `q` (search), `tag` (comma separated).  
  Example: `/proverbs?limit=5&tag=perseverance`

- `GET /proverbs/:id` — Proverb by id

- `GET /proverbs/random` — Random proverb  
  Query: `tag` (optional), `seed` (optional deterministic selection).  
  Example: `/proverbs/random?tag=wisdom&seed=alice`

- `GET /search?q=...` — Search all proverbs (alias for `/proverbs?q=...`)

- `GET /today` — Proverb of the Day  
  Query: `date=YYYY-MM-DD` (optional; default = today UTC).

- `POST /feedback` — Submit feedback  
  Body: JSON like:
  ```json
  {"name": "Alex", "email": "alex@example.com", "message": "Love this API!"}
  ```

### Example Responses
`GET /proverbs?limit=2`
```json
{
  "meta": { "page": 1, "limit": 2, "total": 80, "totalPages": 40 },
  "data": [
    {"id":1,"text_zh":"不入虎穴，焉得虎子","pinyin":"bù rù hǔ xué, yān dé hǔ zǐ","translation_en":"Nothing ventured, nothing gained.","tags":["risk","courage"],"source":"谚语"},
    {"id":2,"text_zh":"亡羊补牢，未为晚也","pinyin":"wáng yáng bǔ láo, wèi wéi wǎn yě","translation_en":"Mend the pen after losing sheep; it's not too late to fix mistakes.","tags":["mistakes","remedy"],"source":"谚语"}
  ]
}
```

`GET /today?date=2025-01-01`
```json
{
  "date": "2025-01-01",
  "data": {"id": 7, "text_zh": "千里之行，始于足下", "pinyin": "qiān lǐ zhī xíng, shǐ yú zú xià", "translation_en": "A journey of a thousand miles begins with a single step.", "tags": ["beginnings","perseverance"], "source": "老子"}
}
```

## Tech
- Node.js + Express
- Helmet, CORS, Morgan (logs)

## Local Development
```bash
npm run dev
```
This runs the server with **nodemon** for auto-restart on changes.

## Project Structure
```text
chinese-proverbs-api/
├─ data/
│  ├─ proverbs.json
│  └─ feedback.log (created at runtime)
├─ src/
│  └─ server.js
├─ .gitignore
├─ package.json
└─ README.md
```

## Deployment (basic)
- Set environment variable `PORT` if you need a non-default port.
- Use any Node hosting (Render, Vercel, Railway, Heroku-like, etc.). Run command: `npm start`.

## GitHub Collaboration Tips
1. Create your repo and push this project scaffold.
2. Each member creates a branch for their feature: `feature/search`, `feature/today`, etc.
3. Commit often with meaningful messages (e.g., "Add route for GET /proverbs/random").
4. Open Pull Requests; teammates review and merge.
5. Keep `main` stable; deploy from `main`.

## License
MIT — use freely for learning and demos.

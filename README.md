# Chinese Proverbs API

A RESTful API built with Express.js that serves Chinese proverbs 

## Features

- **List Proverbs:** Paginated, searchable, and filterable by tags.
- **Random Proverb:** Get a random proverb, optionally filtered by tag or deterministic via seed.
- **Proverb of the Day:** Returns a proverb for a specific date or today (UTC).
- **CORS & Security:** CORS enabled and basic security headers via Helmet.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url> chinese-proverbs-api
   cd chinese-proverbs-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm run start
   npm run dev
   ```

4. **Access the API:**
   Open [http://localhost:3000/api/v1/proverbs/random](http://localhost:3000/api/v1/proverbs/random) in your browser or API client.

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### List Proverbs

- **GET `/proverbs`**
  - Query params: `page`, `limit`, `q` (search), `tag` (comma separated)
  - Example: `/proverbs?limit=5&tag=perseverance`

### Get Random Proverb

- **GET `/proverbs/random`**
  - Query params: `tag` (optional), `seed` (optional)
  - Example: `/proverbs/random?tag=wisdom&seed=alice`

### Search Proverbs

- **GET `/search?q=...`**
  - Alias for `/proverbs?q=...`

### Proverb of the Day

- **GET `/today`**
  - Query param: `date=YYYY-MM-DD` (optional; defaults to today UTC)

## Example Requests & Responses

**Response:**
```json
{
  "meta": { "page": 1, "limit": 2, "total": 80, "totalPages": 40 },
  "data": [
    {
      "id": 1,
      "text_zh": "不入虎穴，焉得虎子",
      "pinyin": "bù rù hǔ xué, yān dé hǔ zǐ",
      "translation_en": "Nothing ventured, nothing gained.",
      "tags": ["risk", "courage"],
      "source": "谚语"
    },
    {
      "id": 2,
      "text_zh": "亡羊补牢，未为晚也",
      "pinyin": "wáng yáng bǔ láo, wèi wéi wǎn yě",
      "translation_en": "Mend the pen after losing sheep; it's not too late to fix mistakes.",
      "tags": ["mistakes", "remedy"],
      "source": "谚语"
    }
  ]
}
```

### Proverb of the Day

**Request:**
```
GET /api/v1/today?date=2025-01-01
```

**Response:**
```json
{
  "date": "2025-01-01",
  "data": {
    "id": 7,
    "text_zh": "千里之行，始于足下",
    "pinyin": "qiān lǐ zhī xíng, shǐ yú zú xià",
    "translation_en": "A journey of a thousand miles begins with a single step.",
    "tags": ["beginnings", "perseverance"],
    "source": "老子"
  }
}
```

## Project Structure

```text
chinese-proverbs-api/
├─ data/
│  ├─ proverbs.json
│  └─ feedback.log
├─ src/
│  └─ server.js
├─ .gitignore
├─ package.json
└─ README.md
```

## License

MIT — use freely for learning and demos.

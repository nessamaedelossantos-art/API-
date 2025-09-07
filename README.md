# Chinese Proverbs API

A RESTful API built with Express.js that serves Chinese proverbs.

## Features

- **List Proverbs:** Paginated, searchable, and filterable by tags.
- **Random Proverb:** Get a random proverb
- **Proverb of the Day:** Returns a proverb for a specific date or today (UTC).
- **Feedback Submission:** Accepts feedback via POST, stored locally.

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
   # Or for development with auto-restart:
   npm run dev
   ```

4. **Access the API:**
   Open [http://localhost:3000/api/v1/proverbs/random](http://localhost:3000/api/v1/proverbs/random) in your browser or API client.

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Get Random Proverb

- **GET `/proverbs/random`**
  - Example: `/proverbs/random`

### Search Proverbs

- **GET `/search?q=...`**
  - Alias for `/proverbs?q=...`

### Proverb of the Day

- **GET `/today`**
  - Query param: `date=YYYY-MM-DD` 

### Submit Feedback

- **POST `/feedback`**
  - Body (JSON):
    ```json
    {
      "name": "Alex",
      "email": "alex@example.com",
      "message": "Love this API!"
    }
    ```

## Example Requests & Responses

### List Proverbs

**Request:**
```
GET /api/v1/proverbs?limit=2
```

**Response:**
```json
{
    "meta": {
        "page": 1,
        "limit": 2,
        "total": 20,
        "totalPages": 10
    },
    "data": [
        {
            "chinese": "授人以鱼不如授人以渔。",
            "pinyin": "Shòu rén yǐ yú bùrú shòu rén yǐ yú.",
            "english": "Giving someone a fish is not as good as teaching them to fish.",
            "meaning": "Teaching skills is better than giving temporary help.",
            "author": "Confucius",
            "category": "Education"
        },
        {
            "chinese": "千里之行，始于足下。",
            "pinyin": "Qiān lǐ zhī xíng, shǐ yú zú xià.",
            "english": "A journey of a thousand miles begins with a single step.",
            "meaning": "Great achievements begin with small actions.",
            "author": "Laozi",
            "category": "Perseverance"
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
    "date": "2025-09-07",
    "data": {
        "chinese": "学而不思则罔，思而不学则殆。",
        "pinyin": "Xué ér bù sī zé wǎng, sī ér bù xué zé dài.",
        "english": "Learning without thought is labor lost; thought without learning is perilous.",
        "meaning": "Balance study with reflection.",
        "author": "Confucius",
        "category": "Education"
    }
}
```

### Submit Feedback

**Request:**
```
POST /api/v1/feedback
Content-Type: application/json

{
  "name": "Alex",
  "email": "alex@example.com",
  "message": "Love this API!"
}
```

**Response:**
```json
{
  "message": "Feedback received. Thank you!"
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

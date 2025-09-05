import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, "../data/proverbs.json");
const FEEDBACK_PATH = path.join(__dirname, "../data/feedback.log");

// Load data once into memory
const proverbs = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const VERSION = "v1";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Helpers
function hashString(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function paginate(array, page = 1, limit = 20) {
  const p = Math.max(1, parseInt(page));
  const l = Math.min(100, Math.max(1, parseInt(limit)));
  const start = (p - 1) * l;
  const end = start + l;
  const items = array.slice(start, end);
  return {
    meta: { page: p, limit: l, total: array.length, totalPages: Math.ceil(array.length / l) },
    data: items
  };
}

function filterByTag(arr, tag) {
  if (!tag) return arr;
  const tags = String(tag).toLowerCase().split(",").map(t => t.trim()).filter(Boolean);
  return arr.filter(p => {
    const ptags = (p.tags || []).map(t => String(t).toLowerCase());
    return tags.every(t => ptags.includes(t));
  });
}

function search(arr, q) {
  if (!q) return arr;
  const needle = String(q).toLowerCase();
  return arr.filter(p => {
    return (p.chinese && p.chinese.toLowerCase().includes(needle)) ||
           (p.pinyin && p.pinyin.toLowerCase().includes(needle)) ||
           (p.english && p.english.toLowerCase().includes(needle)) ||
           (p.meaning && p.meaning.toLowerCase().includes(needle)) ||
           (p.author && p.author.toLowerCase().includes(needle)) ||
           (p.category && p.category.toLowerCase().includes(needle));
  });
}

// Routes
app.get("/", (req, res) => res.redirect(`/api/${VERSION}`));

// ✅ Root now returns a random proverb with metadata
app.get(`/api/${VERSION}`, (req, res) => {
  const idx = Math.floor(Math.random() * proverbs.length);
  const proverb = proverbs[idx];
  res.json({
    name: "Chinese Proverbs API",
    version: VERSION,
    description: "A simple API that serves Chinese proverbs (成语/谚语).",
    randomProverb: proverb
  });
});

// Paginated + filtered list
app.get(`/api/${VERSION}/proverbs`, (req, res) => {
  const { page = 1, limit = 20, tag, q } = req.query;
  let list = proverbs;
  list = filterByTag(list, tag);
  list = search(list, q);
  const result = paginate(list, page, limit);
  res.json(result);
});

// Random proverb (optional seed + filter)
app.get(`/api/${VERSION}/proverbs/random`, (req, res) => {
  const { tag, seed } = req.query;
  let list = filterByTag(proverbs, tag);
  if (list.length === 0) return res.status(404).json({ error: "No proverbs for the given filter." });
  let idx;
  if (seed) {
    idx = hashString(String(seed)) % list.length;
  } else {
    idx = Math.floor(Math.random() * list.length);
  }
  res.json({ data: list[idx] });
});

// Fetch proverb by ID
app.get(`/api/${VERSION}/proverbs/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const item = proverbs.find(p => p.id === id);
  if (!item) return res.status(404).json({ error: "Proverb not found" });
  res.json({ data: item });
});

// Search
app.get(`/api/${VERSION}/search`, (req, res) => {
  const { q, page = 1, limit = 20 } = req.query;
  if (!q) return res.status(400).json({ error: "Missing q query (search text)" });
  const list = search(proverbs, q);
  res.json(paginate(list, page, limit));
});

// Proverb of the day
app.get(`/api/${VERSION}/today`, (req, res) => {
  let dateStr = req.query.date;
  if (!dateStr) {
    const d = new Date();
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    dateStr = `${y}-${m}-${day}`;
  }
  const seed = `${dateStr}`;
  const idx = hashString(seed) % proverbs.length;
  res.json({ date: dateStr, data: proverbs[idx] });
});

// Feedback endpoint
app.post(`/api/${VERSION}/feedback`, (req, res) => {
  const { name = null, email = null, message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Field 'message' is required" });
  }
  const entry = {
    ts: new Date().toISOString(),
    name, email, message
  };
  fs.appendFileSync(FEEDBACK_PATH, JSON.stringify(entry) + "\n", "utf8");
  res.status(201).json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Pretty-print JSON with 2 spaces
app.set("json spaces", 2);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Chinese Proverbs API listening on http://localhost:${PORT}/api/${VERSION}`);
});

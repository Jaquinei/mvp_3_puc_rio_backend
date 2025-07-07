import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors()); // Allow all origins (for development)
app.use(express.json());

const NOTION_DATABASE_ID = process.env.API_EXTERNA_DATABASE_ID;
const NOTION_TOKEN = process.env.API_EXTERNA_TOKEN;

app.post('/notion', async (req, res) => {
  console.log("/notion: Received request to endpoint");

  if (!NOTION_DATABASE_ID || !NOTION_TOKEN) {
    console.log('/notion: Error: TOKEN and DATABASE info missing');
    return res.status(400).json({ error: 'TOKEN and DATABASE info missing' });
  }
  const notion_api_url = `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;

  console.log('/notion: Querying Notion API URL:', notion_api_url);

  try {
    const response = await fetch(notion_api_url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2021-05-13',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('/notion: Error accessing Notion API:', response.status, response.statusText);
      return res.status(response.status).json({ error: 'Error accessing Notion API' });
    }

    console.log('/notion: Successfully accessed Notion API');
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error('/notion: Error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

if (!NOTION_DATABASE_ID || !NOTION_TOKEN) {
  console.log('[SERVER] (warning) TOKEN and DATABASE info is missing!');
  console.log('[SERVER] (warning) Requests will fail.');
  console.log('[SERVER] (info) Ensure to set API_EXTERNA_DATABASE_ID and API_EXTERNA_TOKEN environment variables.');
  console.log('\n');
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`[SERVER] Backend server running on http://localhost:${PORT}`);
});
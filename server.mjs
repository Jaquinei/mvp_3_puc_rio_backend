import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors()); // Allow all origins (for development)
app.use(express.json());

app.post('/notion', async (req, res) => {
  console.log("/notion: Received request to endpoint");

  const { token, database } = req.body;
  if (!token || !database) {
    console.log('/notion: Error: TOKEN and DATABASE info missing');
    return res.status(400).json({ error: 'TOKEN and DATABASE info missing' });
  }

  const notion_api_url = `https://api.notion.com/v1/databases/${database}/query`;

  console.log('/notion: Querying Notion API URL:', notion_api_url);

  try {
    const response = await fetch(notion_api_url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
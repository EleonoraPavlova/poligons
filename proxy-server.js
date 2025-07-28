import fetch from 'node-fetch'
import cors from 'cors'
import express from 'express'

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/proxy', async (req, res) => {
  const externalUrl = req.query.url;

  if (!externalUrl || !externalUrl.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }
  try {
    const response = await fetch(externalUrl, {
      headers: {
        'User-Agent': 'my-test-task',
      },
    });
    console.log('Response received')
    if (!response.ok) {
      return res.status(response.status).send(response.statusText);
    }

    const data = await response.json();
    res.set('Cache-Control', 's-maxage=259200, stale-while-revalidate');
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});

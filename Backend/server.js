const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/create-campaign', async (req, res) => {
  const { name, title, description, target, deadline, image } = req.body;

  if (!name || !title || !description || !target || !deadline || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO campaigns (name, title, description, target, deadline, image)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [name, title, description, target, deadline, image]);

    const newCampaign = result.rows[0];
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error("Error creating campaign", error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

app.get('/campaigns', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM campaigns');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching campaigns", error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

const port = process.env.PORT || 8082;
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server on port ${port}:`, err);
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});

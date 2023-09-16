import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { scrapeEmag } from './emag-scraper.js';
import { scrapeOlx } from './olx-scraper.js';

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post('/scrape', async (req, res) => {
  try {
    const { search } = req.body;

    const emagData = await scrapeEmag(search);
    const olxData = await scrapeOlx(search);

    // if (emagData) {
    //   fs.writeFileSync(
    //     '../data/emag-data.json',
    //     JSON.stringify(emagData, null, 2),
    //     'utf-8'
    //   );
    // }

    // if (olxData) {
    //   fs.writeFileSync(
    //     '../data/olx-data.json',
    //     JSON.stringify(olxData, null, 2),
    //     'utf-8'
    //   );
    // }

    res.status(200).json({ emagData, olxData });
  } catch (error) {
    console.error(error);
    console.log('Inside error main');
    res.status(500).json(error);
  }
});

app.get('/scrape-emag-results', (req, res) => {
  try {
    const filePath = path.join('../', 'data/', 'emag-data.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }

      const jsonData = JSON.parse(data);

      res.status(200).json(jsonData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.get('/scrape-olx-results', (req, res) => {
  try {
    const filePath = path.join('../', 'data/', 'olx-data.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
        return;
      }

      const jsonData = JSON.parse(data);

      res.status(200).json(jsonData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

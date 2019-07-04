import express from 'express';
import csv from 'csv-parser';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000

const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => { });

app.get('/', function (req, res) {
  res.send('BAMBU Backend Engineer Test - Alvin Theodora');
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

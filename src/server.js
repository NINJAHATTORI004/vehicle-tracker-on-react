// src/server.js (Mock server for vehicle position)
const express = require('express');
const app = express();
const port = 3001;

let lat = -3.745;
let lng = -38.523;

app.get('/api/vehicle-position', (req, res) => {
  lat += 0.001;
  lng += 0.001;
  res.json({ lat, lng });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
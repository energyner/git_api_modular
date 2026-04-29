// src/server/index.mjs para RENDER

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import handlers
import { handleConsumo } from './consumo-server.mjs';
import { handleFootprint } from './footprint-server.mjs';
import { handleSolar } from './solar-server.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json()); // reemplaza body-parser
app.use(express.urlencoded({ extended: true }));

// =========================
// Static files
// =========================
app.use('/main', express.static(path.join(__dirname, '..', 'main')));
app.use('/client', express.static(path.join(__dirname, '..', 'client')));

app.post('/api/consumo-energetico', handleConsumo);
app.post('/api/huella-carbono', handleFootprint);
app.post('/api/produccion-solar', handleSolar);

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


// =========================
// Frontend fallback
// =========================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// =========================
// Server start
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Energyner API running on port ${PORT}`);
});
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 🔁 Proxy hacia consumo-service

const proxyTo = (baseUrl) => async (req, res) => {
  const targetUrl = `${baseUrl}${req.originalUrl}`;
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(502).send(`Error al conectar con ${baseUrl}: ${error.message}`);
  }
};
app.use('/api/consumo', proxyTo('https://consumo-service-xxxxxx.onrender.com'));
app.use('/api/footprint', proxyTo('https://footprint-service-xxxxxx.onrender.com'));
app.use('/api/solar', proxyTo('https://solar-service-xxxxxx.onrender.com'));

app.listen(PORT, () => {
  console.log(`🚀 Proxy activo en el puerto ${PORT}`);
});
// 1- SERVIDOR EXPRESS - PUERTO 3002
import express from 'express';
import cors from 'cors';
import { calcularProduccionSolar } from '../calculations/solar-production.mjs';

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// 2- RUTAS GET PARA CADA API

// 3- PROCESADORES PARA CAPTAR POR POST LAS HOJAS DE CALCULO DE CADA API

// Importamos produccion-solar 
app.post('/api/produccion-solar', calcularProduccionSolar);

// 4- CODIGO COMUN DEL SERVIDOR 

// Iniciar servidor
const PORT = 3008;
app.listen(PORT, 'localhost', () => {
    console.log(`4 - API corriendo en http://localhost:${PORT}`);
});
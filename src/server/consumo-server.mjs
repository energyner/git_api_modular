// 1- SERVIDOR EXPRESS - PUERTO 3006
import express from 'express';
import cors from 'cors';
import { calcularConsumoEnergetico } from '../calculations/energy-consumption.mjs';


const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// 2- RUTAS GET PARA CADA API

//  Api consumo-energetico 
app.get('/api/consumo-energetico', (req, res) => {
    console.log("1 - Captando solicitud GET en /api/consumo-energetico");
    res.send('Usa POST para calcular el consumo energético de equipos.');
});

//Api produccion-solar
app.get('/api/produccion-solar', (req, res) => {
    console.log("1 - Captando solicitud GET en /api/produccion-solar");
    res.send('Usa POST para calcular la energia generada por paneles solares.');
});

// 3- PROCESADORES PARA CAPTAR POR POST LAS HOJAS DE CALCULO DE CADA API

// Importamos consumo-energetico 
app.post('/api/consumo-energetico', calcularConsumoEnergetico);


// 4- CODIGO COMUN DEL SERVIDOR 

// Iniciar servidor
const PORT = 3006;
app.listen(PORT, 'localhost', () => {
    console.log(`4 - API corriendo en http://localhost:${PORT}`);
});
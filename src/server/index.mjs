// src/server/index.mjs (Servidor Unificado para Render)
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Si lo necesitas para tus APIs internas
import path from 'path';
import { fileURLToPath } from 'url';

// Helper para simular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar la lógica de tus APIs (desde los archivos locales en src/server/)
import { handleConsumo } from './consumo-server.mjs'; // ASEGÚRATE DE QUE ESTAS FUNCIONES ESTÁN EXPORTADAS
import { handleFootprint } from './footprint-server.mjs';
import { handleSolar } from './solar-server.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Para permitir solicitudes desde el frontend al backend en el mismo servidor si es necesario
app.use(bodyParser.json()); // Para parsear cuerpos JSON en tus solicitudes API
app.use(bodyParser.urlencoded({ extended: true })); // Para parsear cuerpos URL-encoded

// 1. Servir la página principal index.html directamente desde src/
// Cuando alguien accede a la URL raíz del servidor (ej. https://energyner.onrender.com/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // '..' sube a 'src/', luego busca 'index.html'
});

// 2. Servir los archivos estáticos globales (CSS, JS, IMG) desde src/main/
// Esto hará que /main/css/style-index.css y otros assets sean accesibles
app.use('/main', express.static(path.join(__dirname, '..', 'main'))); // '..' sube a 'src/', luego entra en 'main/'
// Usamos '/main' como prefijo de URL para que las URLs en tu HTML apunten a /main/css/style.css, etc.

// 3. Servir los archivos estáticos de tus "microservicios" frontend desde src/client/
// Esto hará que archivos como /client/consumo/consumo.html sean accesibles
app.use('/client', express.static(path.join(__dirname, '..', 'client'))); // '..' sube a 'src/', luego entra en 'client/'
// Usamos '/client' como prefijo de URL para que tus enlaces en index.html funcionen (ej. /client/consumo/consumo.html)


// 4. Definir las rutas de la API (ahora manejadas directamente por este servidor)
// Estas rutas deben coincidir con lo que tu frontend espera (ej. /api/consumo-energetico)
app.post('/api/consumo-energetico', handleConsumo);
app.post('/api/huella-carbono', handleFootprint);
app.post('/api/produccion-solar', handleSolar);

// 5. Catch-all para rutas de frontend no encontradas o para SPAs
// Colócalo DESPUÉS DE TODAS las rutas de API y los middleware de express.static
app.get('*', (req, res) => {
    // Para solicitudes que no son archivos estáticos ni rutas de API
    // Redirige a index.html para manejar rutas de frontend o simplemente como fallback
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor Energyner activo en el puerto ${PORT}`);
});
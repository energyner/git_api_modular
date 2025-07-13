// src/server/footprint-server.mjs PARA RENDER
// Ya no necesitamos express ni cors aquí, ni app.listen()
import { calcularHuellaCarbono } from '../calculations/carbon-footprint.mjs';

// Exportamos la función manejadora para la ruta POST
export const handleFootprint = (req, res) => {
    console.log("3.1 - Procesando huella-carbono"); // Este log se verá en los logs de Render

    try {
        const parametros = req.body;

        // Validaciones básicas
        if (!parametros.state || parametros.state === "Select your State") {
            return res.status(400).json({ error: "Estado inválido o no seleccionado" });
        }
        if (!parametros.person || parametros.person <= 0) {
            return res.status(400).json({ error: "Número de personas debe ser mayor a 0" });
        }

        // Normalización de datos y asignación de valores predeterminados
        const datos = {
            state: parametros.state,
            elect: parseFloat(parametros.elect) || 0,
            gas: parseFloat(parametros.gas) || 0,
            water: parseFloat(parametros.water) || 0,
            lpg: parseFloat(parametros.lpg) || 0,
            gn: parseFloat(parametros.gn) || 0,
            fly: parseFloat(parametros.fly) || 0,
            cogs: parseFloat(parametros.cogs) || 0,
            person: parseInt(parametros.person) || 1,
        };

        // Llamar a la función calcularHuellaCarbono
        const resultado = calcularHuellaCarbono(datos);

        if (resultado.error) {
            return res.status(400).json({ error: resultado.error });
        }

        // Respuesta exitosa
        res.status(200).json(resultado);
        console.log("3.2 Cálculo completado para huella-carbono:", resultado);
    } catch (error) {
        console.error("Error al procesar la solicitud de huella de carbono:", error);
        res.status(500).json({ error: "Error interno del servidor. Intente nuevamente más tarde." });
    }
};

.
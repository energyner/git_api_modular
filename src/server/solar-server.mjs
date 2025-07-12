// src/server/solar-server.mjs PARA RENDER
// Ya no necesitamos express ni cors aquí, ni app.listen()
// src/server/solar-server.mjs
import { calcularProduccionSolar } from "../calculations/solar-production.mjs";

export const handleSolar = (req, res) => {
  try {
    let { area, irradiacion, eficiencia } = req.body; // Usamos 'let' para reasignar

    //  Parsear a números**
    area = parseFloat(area);
    irradiacion = parseFloat(irradiacion);
    eficiencia = parseFloat(eficiencia); // La eficiencia suele ser un decimal (ej., 0.15)

    // Opcional: Validaciones básicas de los valores numéricos parseados
    if (isNaN(area) || isNaN(irradiacion) || isNaN(eficiencia) ||
        area <= 0 || irradiacion <= 0 || eficiencia <= 0 || eficiencia > 1) { // Eficiencia debería ser entre 0 y 1 (o 0 y 100 si la usas como porcentaje)
      return res.status(400).json({ error: "Parámetros inválidos. Asegúrese de que área, irradiación y eficiencia son números positivos, y eficiencia está entre 0 y 1." });
    }

    // Asegúrate de que `calcularProduccionSolar` reciba los parámetros en el formato esperado
    // Si espera un objeto, como `{ area, irradiacion, eficiencia }`, entonces:
    const resultado = calcularProduccionSolar({ area, irradiacion, eficiencia });
    // Si espera argumentos individuales, como `calcularProduccionSolar(area, irradiacion, eficiencia);`
    // const resultado = calcularProduccionSolar(area, irradiacion, eficiencia);

    res.status(200).json(resultado);
    console.log("Cálculo de producción solar completado:", resultado);
  } catch (error) {
    console.error("Error en handleSolar:", error); // Esto te mostrará el error real que ocurrió
    res.status(500).json({ error: "Error interno del servidor al calcular producción solar." });
  }
};
// ...

// Opcional: Si quieres un manejador para la ruta GET, también lo exportas
export const getSolarInfo = (req, res) => {
  console.log("1 - Captando solicitud GET en /api/produccion-solar");
  res.send("Usa POST para calcular la produccion-solar de paneles solares.");
};


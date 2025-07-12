// src/server/consumo-server.mjs PARA RENDER
// Ya no necesitamos express ni cors aquí, ni app.listen()
// Solo importamos la lógica de cálculo
import { calcularConsumoEnergetico } from "../calculations/energy-consumption.mjs";

// Exportamos una función manejadora para la ruta POST
export const handleConsumo = (req, res) => {
  // La lógica de tu API POST de consumo
  // Asumimos que calcularConsumoEnergetico es el manejador directo para POST
  // Si calcularConsumoEnergetico es una función que toma (req, res), esto es correcto.
  // Si calcularConsumoEnergetico solo toma los parámetros de cálculo, necesitarías envolverla:
  try {
  let { potencia, horas } = req.body;
    potencia = parseFloat(potencia);
    horas = parseFloat(horas);
    if (isNaN(potencia) || isNaN(horas) || potencia < 0 || horas < 0) {
      return res.status(400).json({ error: "Parámetros inválidos para potencia u horas." });
    }
    const consumo = calcularConsumoEnergetico({ potencia, horas }); // Asumiendo que calcularConsumoEnergetico solo toma los valores
    res.status(200).json({ consumo_energetico: consumo });
  } catch (error) {
    console.error("Error en handleConsumo:", error);
    res.status(500).json({ error: "Error interno del servidor al calcular consumo." });
  }
};

// Opcional: Si quieres un manejador para la ruta GET, también lo exportas
export const getConsumoInfo = (req, res) => {
  console.log("Solicitud GET en /api/consumo-energetico");
  res.json({
    mensaje: "Usa POST para calcular el consumo energético de equipos",
  });
};


// src/calculations/energy-consumption.mjs
export function calcularConsumoEnergetico(parametros) { // Ahora 'parametros' será el objeto { potencia, horas }
    console.log("1.1 - Calculando consumo-energetico");
    const { potencia, horas } = parametros; // ¡Esto ahora desestructurará correctamente del objeto!

    try {
        console.log("Parámetros recibidos:", potencia, horas);
        // ¡IMPORTANTE! Ya no necesitas parseFloat aquí, ya se hizo en handleConsumo
        const resultado = potencia * horas; // Simplemente la operación matemática directa
        console.log("1.2 - Cálculo resuelto:", resultado);
        return resultado ;

    } catch (error) {
        console.error("Error al calcular el consumo energético:", error);
        throw new Error("Error interno en la lógica de cálculo consumo energetico: " + error.message);
    }
}
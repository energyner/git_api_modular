// src/calculations/energy-consumption.mjs
export function calcularConsumoEnergetico(parametros) { // Ahora 'parametros' será el objeto { potencia, horas }
    console.log("1.1 - Calculate Energy Consumption");
    const { potencia, horas } = parametros; // ¡Esto ahora desestructurará correctamente del objeto!

    try {
        console.log("Received parameters:", potencia, horas);
        // ¡IMPORTANTE! Ya no necesitas parseFloat aquí, ya se hizo en handleConsumo
        const resultado = potencia * horas; // Simplemente la operación matemática directa
        console.log("1.2 - Solved Calculation:", resultado);
        return resultado ;

    } catch (error) {
        console.error("Error calculating energy consumption:", error);
        throw new Error("Internal error in the energy consumption calculation logic.: " + error.message);
    }
}
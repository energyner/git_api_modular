// src/calculations/solar-production.mjs

// Esta función SOLO debe realizar el cálculo y devolver un valor.
// Recibe directamente los parámetros necesarios.
export function calcularProduccionSolar(parametros) { // Cambiamos el nombre del argumento a 'parametros' (o directamente {area, irradiacion, eficiencia})
    console.log("1.1 - Calculando produccion-solar");

    // Ya no necesitas desestructurar req.body aquí.
    // Los parámetros ya vienen directamente en 'parametros'.
    const { area, irradiacion, eficiencia } = parametros; // Desestructura directamente del objeto 'parametros'

    // *** No necesitas esta validación aquí, ya la haces en handleSolar ***
    // if (!area || !irradiacion || !eficiencia) {
    //     console.log("1.1.1 - Error: Faltan parámetros");
    //     // No debes enviar respuesta HTTP desde aquí, solo lanzar un error o devolver un valor especial
    //     throw new Error("Faltan parámetros: area, irradiacion y eficiencia son requeridos");
    // }

    // ** Ya no necesitas parseFloat aquí, ya se hizo en handleSolar **
    // const resultado = parseFloat(area) * parseFloat(irradiacion) * parseFloat(eficiencia);

    try {
        console.log("Parámetros recibidos para cálculo:", area, irradiacion, eficiencia);
        const resultado = area * irradiacion * eficiencia; // ¡Simplemente la operación matemática!
        console.log("1.2 - Cálculo resuelto:", resultado);
        return { produccion_solar: resultado }; // Devuelve el objeto con el resultado
    } catch (error) {
        console.error("Error lógico al calcular la produccion solar:", error);
        // Aquí no envíes respuesta HTTP. Lanza el error para que handleSolar lo capture.
        throw new Error("Error interno en la lógica de cálculo de producción solar: " + error.message);
    }
}
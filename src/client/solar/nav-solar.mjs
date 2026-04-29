/**Algoritmo que utilizará métodos del DOM para capturar el evento 
 * de envío de datos, manipularlo y  conectarnos al puerto del servidor local que hemos configurado */


/**  EJECUCION DE CADA API */

// API produccion solar

// Captando evento del formulario
document.getElementById('produccion-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const area = document.getElementById('area').value;
    const irradiacion = document.getElementById('irradiacion').value;
    const eficiencia = document.getElementById('eficiencia').value;

// Realizar la solicitud al servidor
    fetch('/api/produccion-solar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ area: area, irradiacion: irradiacion, eficiencia: eficiencia })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorMessage => {
                throw new Error(`Request error: ${response.status} - ${errorMessage}`);
            });
        }
        return response.json(); // Procesar la respuesta como JSON
    })
    .then(data => {
        console.log('Solar Production:', data);

// Actualizar la interfaz del navegador con el resultado
        const resultadoSolar = document.getElementById('resultadoSolar');
        resultadoSolar.textContent = `Solar Production - calculated: ${data.produccion_solar} Wh`;
        resultadoSolar.style.color = "green"; // Estilo opcional para destacar el texto
    })
    .catch(error => {
        console.error('Error calculating solar production:', error);

// Mostrar mensaje de error en el navegador
        const resultadoSolar = document.getElementById('resultadoSolar');
        resultadoSolar.textContent = `Error: ${error.message}`;
        resultadoSolar.style.color = "red"; // Estilo opcional para destacar el error
    });
});
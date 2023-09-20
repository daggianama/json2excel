

document.addEventListener('DOMContentLoaded', function () {
    const jsonInput = document.getElementById('jsonInput');
    const procesarBoton = document.getElementById('procesarBoton');
    const resultado = document.getElementById('resultado');

    procesarBoton.addEventListener('click', function () {
        // Obtén el valor del campo de entrada de texto y analízalo como JSON
        const jsonText = jsonInput.value;

        // Realiza una solicitud POST al servidor con el JSON
        fetch('/process-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonText
        })
        .then(response => response.text())
        .then(data => {
            // Muestra la respuesta del servidor en el div "resultado"
            resultado.innerHTML = data;
        })
        .catch(error => {
            // Si hay un error, muestra un mensaje de error
            resultado.innerHTML = 'Error al procesar el JSON: ' + error.message;
        });
    });
});

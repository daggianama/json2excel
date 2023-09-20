const express = require("express");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");

const path = require("path");

const app = express();

import("node-fetch").then((fetchModule) => {
    // Aquí puedes utilizar fetchModule para hacer las solicitudes fetch
    const fetch = fetchModule.default;
  });
  

// Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define una ruta GET para la página HTML
app.get("/", (req, res) => {
    // Lee el archivo HTML y envíalo como respuesta
    res.sendFile(path.join(__dirname, "index.html"));
});

// Agrega un evento click al botón "Procesar JSON"
document.addEventListener('DOMContentLoaded', function () {
    const jsonInput = document.getElementById('jsonInput');
    const procesarBoton = document.getElementById('procesarBoton');
    const resultado = document.getElementById('resultado');

    procesarBoton.addEventListener('click', function () {
        // Obtén el valor del campo de entrada de texto
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

// Inicia el servidor en el puerto 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

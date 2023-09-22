const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());  // add after 'app' is created 

// Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));

// Importa las rutas desde routes.js
const routes = require("./server/routes");

// Usa las rutas en tu aplicación Express
app.use("/", routes);






module.exports = app;
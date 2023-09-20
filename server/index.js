// Importa las rutas desde routes.js
const routes = require("../server/routes");

// ...

// Usa las rutas en tu aplicación Express
app.use("/", routes);



// Inicia el servidor en el puerto 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});


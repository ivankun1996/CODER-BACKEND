import express from 'express'
import { routerProductos } from "./Rutas/productos.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.json())

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log("Hubo un error...");
});


app.use('/api', routerProductos)
app.use(express.static('Publico'))


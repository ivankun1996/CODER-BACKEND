import { Router } from "express";
import {Contenedor} from "../Clases/contenedor.js"

const router = Router();

const db = new Contenedor ("productos.txt");



router.get("/productos", async (req, res) => {
  const arrProductos = await db.obtenerTodo();
  res.send(arrProductos);
});

router.get("/productos/:id", async (req, res) => {
  let { id } = req.params;
  const arrProductos = await db.obtenerTodo();
  const productoBuscado = arrProductos.find((p) => p.id === Number(id));
  res.send(productoBuscado);
});

router.get("/productoRandom", async (req, res) => {
  const arrProductos = await db.obtenerTodo();

  const elementoAzar =
    arrProductos[Math.floor(Math.random() * arrProductos.length)];

  res.send(elementoAzar);
});

router.post('/productos', async (req,res) =>{
    let {nombre,precio,img} = req.body;
    console.log(req.body);
    let id = await db.guardarProducto({nombre,precio,img});
    res.status(200).json({nombre,precio,img,id});
});

router.delete('/productos/:id', async (req,res) => {
  let { id } = req.params;
  const arrProductos = await db.obtenerTodo();
  const indiceAEliminar = await db.findIndex(id);
  if (indiceAEliminar > -1) {
    arrProductos.splice(indiceAEliminar,1);
    const aux = await db.guardarId(arrProductos);
    if (aux) {
      console.log("Id eliminado: " + id);
    } else {
      console.log("No existe el id: " + id);
    }
  }
});

router.put('/productos/:id', async (req,res)=>{
    let {nombre,precio,imagen} = req.body;
    let {id} = req.params;

    let newProd = await db.obtenerPorId(Number(id));
    newProd["nombre"]=nombre;
    newProd["precio"]=precio;
    newProd["imagen"]=imagen;

    let result = await db.modificarProducto(newProd);
    if (result){
       res.status(200).json(`Se modifico el producto con id ${id} exitosamente.`);
    }else{
        res.status(500).json(`Ocurrio un error al modificar el producto con id ${id}.`)
    }
});

 



export const routerProductos = router;
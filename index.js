const fs = require ('fs')

class DataBase {
    constructor (nombreArchivo){
        this.ruta = nombreArchivo
    }

    obtenerTodo = async () => {
        try{
           const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            
            return JSON.parse(contenido)            
        } catch (error){
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)

        }

    }
    guardarProducto = async producto => {
        const arrProductos = await this.obtenerTodo();
        
        let id = 1;
        if (!arrProductos){
            arrProductos = [];
        }else{
            if(arrProductos.length >0){
                let idList = arrProductos.map(element => element.id);
                id = Math.max(...idList)+1;
            }   
        }
        producto["id"]=id;
        arrProductos.push(producto);

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrProductos, null, 2))
            return producto.id
        } catch (error) {
           throw new Error('No se puede guardar') 
        }
    }
    obtenerPorId = async id => {
        const arrProductos = await this.obtenerTodo()
        const productoBuscado = arrProductos.find(p => p.id === Number(id))
        return productoBuscado
        
    }
    borrarTodo = async () =>{
        return fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
        
    } 
    findIndex = async id =>{
        try{
            let valores = await this.obtenerTodo();
            let resultIndex = valores.findIndex(elem => elem.id === Number(id));
            return resultIndex;
        }
        catch(error){
            console.log('ERROR ' + error);
            return null;
        }
    }
    deleteByID = async id => {
        const valores = await this.obtenerTodo();
        const indiceAEliminar = await this.findIndex(id);
        if(indiceAEliminar >-1){
            valores.splice(indiceAEliminar,1);
            const aux = await this.guardarId(valores);
            if(aux){
                console.log('Id eliminado: ' + id);
            }
            else{
                console.log('No existe el id: ' + id);
            }
        }
    }
    guardarId = async valores => {
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(valores,null,2));
            return true;
        }
        catch(error){
            console.log('ERROR' + error);
            return false;
        }
    }
}


module.exports = DataBase
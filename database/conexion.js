//conexion a base de datos 
const mongoose = require("mongoose")



const conexion = async() => {

    try {
        await mongoose.connect("mongodb://localhost:27017/MI_blog");
        
        console.log('Conectado correctamete a mongo ')

    } catch (error) {
        console.log(error)
        throw new Error("No se ha pdido establecer la conexion ala base de datos !!");
             
    }

}

module.exports = {
    conexion
}
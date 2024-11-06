const {
    conexion
} = require("./database/conexion")
const express = require("express")
const cors = require("cors")

//inicializar la app 
console.log("App conectada correctamente");

//conectar a la base de datos 
conexion();

//crear servidor node
const app = express();
const puerto = 3900;

//configurar cors 
app.use(cors());

//convertir body a objeto js
app.use(express.json());//recibir datos con content type app/json postmann
//opcion de form-unrencored
app.use(express.urlencoded({extended:true}));//recibir porformato de un tipo de formulario
///rutas 
const rutas_articulo = require("./rutas/articulo");

//cargo las rutas
app.use("/api", rutas_articulo)

//rutas pruebas harcore 
app.get("/pruebas", (req, res) => {
    console.log('Se han ejecutado las rutas de prueb')
    //forma uno de mandar datos con el send para mandar lo quesea   
    //  return res.status(200).send(
    //         `
    //         <div>
    //             <h1> probando la api de nodejs </h1>
    //         <ul>
    //             <li>Maste en js</li>
    //             <li>maste en php </li>
    //         </ul>
    //         </div>
    //         `
    //     )

    //forma de mandar datos json uno solo 

    // return res.status(200).json({
    //     curso: 'Master en JS',
    //     autor: 'Jesus gutierrez',
    //     url: 'jesusweb.es/master-react'
    // });

    //forma de traer una coleccion de eobjetos  json con mas de uno

    return res.status(200).json([{
            curso: 'Master en JS',
            autor: 'Jesus gutierrez',
            url: 'jesusweb.es/master-react'
        },
        {
            curso: 'Master en JS',
            autor: 'Jesus gutierrez',
            url: 'jesusweb.es/master-react'
        }
    ]);
});

app.get("/", (req, res) => {

})

//crear servidor y escuchar [peticones http 
app.listen(puerto, () => {
    console.log("servidor corriendo en el puerto " + puerto)
})
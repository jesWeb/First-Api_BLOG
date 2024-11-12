const express = require('express');
const multer = require("multer")
const router = express.Router();
//definir controllador 
const ArticuloController = require("../controladores/articulo");
const { crear } = require("../controladores/articulo");


//configuracion de m,ulter para imagens 
const almacenamiento = multer.diskStorage({
    //asigancion de almaacenamioiento 
    destination: function (req, file, cb) {
        cb(null, './imagenes/articulos/');
    },
    //nombre del archivo
    filename: function (req, file, cb) {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
})

//do`nde alamcebara la info 
const subidas = multer({ storage: almacenamiento })



//rutas de preuba 
router.get("/ruta-de-pruebas", ArticuloController.prueba);
router.get("/curso", ArticuloController.curso);

//ruta util 
router.post("/crear", ArticuloController.crear);
router.get("/articulos/:ultimos?", ArticuloController.listar);
router.get('/articulos/:id', ArticuloController.uno);
router.delete('/articulos/:id', ArticuloController.borrar);
router.put('/articulos/:id', ArticuloController.editar);
//el arreglo funciona como el middalware 
router.post('/subir-imagen/:id', [subidas.single("file0")], ArticuloController.subir);
router.post('/imagen/:fichero', ArticuloController.imagen);
router.get('/buscar/:busqueda', ArticuloController.buscador);
module.exports = router;
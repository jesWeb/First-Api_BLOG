const express = require('express');
const router = express.Router();

//definir controllador 
const ArticuloController = require("../controladores/articulo") ;
const { crear } = require("../controladores/articulo");

//rutas de preuba 
router.get("/ruta-de-pruebas", ArticuloController.prueba);
router.get("/curso", ArticuloController.curso);

//ruta util 
router.post("/crear",ArticuloController.crear);
router.get("/articulos/:ultimos?",ArticuloController.listar);
router.get('/articulos/:id',ArticuloController.uno);
router.delete('/articulos/:id',ArticuloController.borrar);
router.put('/articulos/:id',ArticuloController.editar);

module.exports = router;
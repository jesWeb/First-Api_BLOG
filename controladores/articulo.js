//elimnar  fs de node 
const fs = require("fs")
const path = require("path");

const {
    validarArticulo
} = require("../helpers/validar");

const Articulo = require("../modelos/Articulo");


const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de preuba en mi controllador"
    });
}


const curso = (req, res) => {

    console.log("se ha ejecutado el endpoint probando")

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
}

const crear = async (req, res) => {

    //recoger parametros por post a guardar
    let parametros = req.body;

    //validar datos 
    try {
        //validar datos 
        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //crear objeto a guardar 
    const articulo = new Articulo(parametros);

    //asignar valores a objeto (manual o automoatico )
    // articulos.titulo = parametros.titulo

    //guardar en base de datos 
    try {
        const articuloGuardado = await articulo.save();
        //regresar resultadO
        return res.status(200).json({
            mensaje: "success",
            articulo: articuloGuardado,
            mensaje: "guardado correctamente"
        })
    } catch (error) {

        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "no se ha guardado el post "
            });
        }
    }

    /**nota ya no acepta los callbakc osea el codigo de abajo anterior   */
}

//get articulos 
/***
  *  nota busca para que se usa el .exec 
  * esta funcion ya no es aceptada y se deve de manejar como promesas  que es para las consultas
  * 
  * Antes: Usabas exec() con un callback.
     Ahora: exec() devuelve una promesa, por lo que debes manejarlo con async/await o .then().   
     Asegúrate de revisar todo tu código y hacer estos cambios en todas las consultas que utilicen exec() con un callback.
  * 
  * 
  * 
  *   */

const listar = async function lista(req, res) {
    try {
        let consulta = Articulo.find({});
        //filtros de parametros 
        if (req.params.ultimos) {
            consulta.limit(3);
        }

        const articulos = await consulta.sort({
            fecha: -1
        });

        return res.status(200).json({
            mensaje: "success",
            contador: articulos.length,
            articulos
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "no se ha encontrado el post"
        });
    }
}

//sacar uno elemento 
const uno = async (req, res) => {

    try {

        let id = req.params.id;

        const obtenerUno = await Articulo.findById(id);

        return res.status(200).json({
            mensaje: "success has obtenido el articulo con el id ",
            obtenerUno
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "no se ha encontrado el post"
        });
    }


}
//metodo de borrar

const borrar = async (req, res) => {

    try {

        let articulo_id = req.params.id;

        const borrarArticulos = await Articulo.findOneAndDelete({
            _id: articulo_id
        });

        return res.status(200).json({
            status: 'success',
            articulo: borrarArticulos,
            mensaje: "success has eliminado el articulo con el exito ",
        });




    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "no se ha eliminado el post"
        });
    }
}
//editar 

const editar = async (req, res) => {
    try {
        //recoger elarticulo ID  a editar 
        let articuloID = req.params.id;

        //rerocger parametros del body 
        let parametros = req.body;

        //validar datos 
        validarArticulo(parametros);

        //buscar y actualizar el articlo 

        const ActualizarArt = await Articulo.findOneAndUpdate({
            _id: articuloID
        }, req.body, {
            new: true
        });

        return res.status(200).json({
            status: 'success',
            articulo: ActualizarArt,
            mensaje: "success has editado articulo con el exito ",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "No se ha podido actualizar "
        });
    }




}

const subir = async (req, res) => {


    // configurar multer 

    //recoger fichero de  imagen subido !re -> si existe
    if (!req.file && !req.files) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'imagen invalida'
        })
    }
    // console.log(req.file)

    //nombre del archivo 
    let nombreArchivo = req.file.originalname;
    //extension del archivo 
    let archivo_slpit = nombreArchivo.split('\.');
    let extension = archivo_slpit[1]
    //comprobar extsension correcta 
    if (extension != "png" && extension != "jpg" && extension != "pdf") {
        //borrar archivo y dar respuetsa
        fs.unlik(req.file.path, (error) => {
            return res.status(400).json({
                status: 'error',
                mensaje: 'imagen invalida'
            })
        })
    } else {
        try {
            //recoger elarticulo ID  a editar 
            let articuloID = req.params.id;

            const ActualizarArt = await Articulo.findOneAndUpdate({
                _id: articuloID
            }, {
                imagen: req.file.filename
            }, {
                new: true
            });

            return res.status(200).json({
                status: 'success',
                articulo: ActualizarArt,
                mensaje: "success has editado articulo con el exito ",
                fichero: req.file
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                mensaje: "No se ha podido actualizar "
            });
        }

    }
    //si va bien , actualizar el registro

    //devolver rESPUESTA
}
//returnar la imagen 

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "/imagenes/articulos/" + fichero;

    fs.stat(ruta_fisica, (error, stats) => {
        if (error) {
            // Si ocurre un error al intentar acceder al archivo
            return res.status(500).json({
                status: "error",
                mensaje: "Error al intentar acceder al archivo",
                error: error.message,
                fichero,
                ruta_fisica
            });
        }

        if (stats.isFile()) {
            // Si el archivo existe y es un archivo regular
            return res.sendFile(path.resolve(ruta_fisica));
        } else {

            return res.status(404).json({
                status: "error",
                mensaje: "No existe la imagen",
                fichero,
                ruta_fisica
            });
        }
    });
};

const buscador = async (req, res) => {
    try {
        // Obtener el string de búsqueda desde los parámetros de la URL
        let busqueda = req.params.busqueda;

        // Realizar la consulta de búsqueda con regex
        const consultaBusqueda = await Articulo.find({
            "$or": [
                {
                    "titulo": {
                        "$regex": busqueda,
                        "$options": "i"
                    }
                },
                {
                    "contenido": {
                        "$regex": busqueda,
                        "$options": "i"
                    }
                }
            ]
        })
        .sort({ fecha: -1 }); // Ordenar por fecha descendente

        // Verificar si no se encontraron resultados
        if (!consultaBusqueda || consultaBusqueda.length === 0) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se han encontrado artículos'
            });
        }

        // Si se encontraron artículos, devolverlos
        return res.status(200).json({
            status: 'success',
            articulos: consultaBusqueda
        });

    } catch (error) {
        // Manejo del error en caso de fallo en la consulta o en cualquier otra parte del código
        return res.status(500).json({
            status: 'error',
            mensaje: 'Hubo un error al realizar la búsqueda',
            error: error.message || error
        });
    }
};


module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}
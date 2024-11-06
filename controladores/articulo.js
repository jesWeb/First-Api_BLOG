const validator = require("validator");
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

        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, {
                min: 5,
                max: undefined
            });

        let validar_content = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_content) {
            throw new Error("NO se ha validado la informacion !!")
        };

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

module.exports = {
    prueba,
    curso,
    crear
}
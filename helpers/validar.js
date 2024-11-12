const validator = require("validator");

const validarArticulo = (parametros) => {
    let validar_titulo = !validator.isEmpty(parametros.titulo) &&
        validator.isLength(parametros.titulo, {
            min: 5,
            max: undefined
        });

    let validar_content = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_content) {
        throw new Error("NO se ha validado la informacion !!")
    }

}

module.exports = {
    validarArticulo
};
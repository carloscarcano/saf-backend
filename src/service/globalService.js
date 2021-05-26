var checkStatus = () => {
    var result = {};

    result.activo = true;
    result.mensaje = 'API REST OK!';

    return result;
}

var generarMensajeError = (mensaje) => {
    var result = {};

    result.error = true;
    result.mensaje = mensaje;

    return result;
}

var generarMensajeRespuesta = (error, id, mensaje, datosRecibidos) => {
    var result = {};

    result.error = error;
    result.id = id;
    result.mensaje = mensaje;
    
    if (datosRecibidos)
        result.datosRecibidos = datosRecibidos;

    return result;
}

module.exports = {
    checkStatus,
    generarMensajeError,
    generarMensajeRespuesta
}
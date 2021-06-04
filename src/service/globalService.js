var checkStatus = () => {
    var result = {};

    result.activo = true;
    result.mensaje = 'API REST OK!';

    return result;
}

var obtenerMensajeFaltanDatos = () => {
    return 'faltan datos para poder completar la acción';
}

var obtenerMensajeFormatoInvalido = () => {
    return 'tipo de dato no válido';
}

var obtenerMensajeNoExistenDatos = () => {
    return 'no se encontraron registros';
}

module.exports = {
    checkStatus,
    obtenerMensajeFaltanDatos,
    obtenerMensajeFormatoInvalido,
    obtenerMensajeNoExistenDatos
}
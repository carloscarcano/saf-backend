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

module.exports = {
    checkStatus,
    obtenerMensajeFaltanDatos,
    obtenerMensajeFormatoInvalido
}
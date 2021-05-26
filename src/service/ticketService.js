const globalService = require('./globalService');

var agregarTicket = (req) => {
    var result = {};

    result = globalService.generarMensajeRespuesta(false, 1000, 'ticket agregado correctamente', req.body);

    return result;
}

var eliminarTicket = (id) => {
    var result = {};

    result = globalService.generarMensajeRespuesta(false, id, 'ticket eliminado correctamente');
    return result;
}

var obtenerTicket = (id) => {
    var result = {};

    result = globalService.generarMensajeRespuesta(false, id, 'ticket obtenido correctamente');
    result.nombreUsuario = 'nombre del usuario';
    result.descripcionFalla = 'descripción de la falla';

    return result;
}

var modificarTicket = (req) => {
    var result = {};

    result = globalService.generarMensajeRespuesta(false, req.body.id, 'ticket modificado correctamente', req.body);

    return result;
}

module.exports = {
    agregarTicket,
    eliminarTicket,
    obtenerTicket,
    modificarTicket
}

const ticketService = require('../service/ticketService');
const globalService = require('../service/globalService');

var agregarTicket = function(req, res)
{
    var result = {};
    const { nombreUsuario, descripcionFalla, fecha } = req.body;

    // validación de datos de entrada
    if(!nombreUsuario || !descripcionFalla || !fecha)
    {
        result = globalService.generarMensajeError('faltan datos para poder completar la acción');
    } 
    else
    {
        // procesar acción
        result = ticketService.agregarTicket(req);
    }

    res.json(result);
}

var eliminarTicket = function(req, res)
{
    var result = {};
    const { id } = req.params;

    // validación de datos de entrada
    if (isNaN(id))
    {
        result = globalService.generarMensajeError('tipo de dato incorrecto');
    }
    else
    {
        // procesar acción
        result = ticketService.eliminarTicket(id);
    }
    
    res.json(result);
}

var obtenerTicket = function(req, res)
{
    var result = {};
    const { id } = req.params;

    // validación de datos de entrada
    if (isNaN(id))
    {
        result = globalService.generarMensajeError('tipo de dato incorrecto');
    }
    else
    {
        // procesar acción
        result = ticketService.obtenerTicket(id);
    }
    
    res.json(result);
}

var modificarTicket = function(req, res)
{
    var result = {};
    const { id, nombreUsuario, descripcionFalla, fecha } = req.body;

    // validación de datos de entrada
    if(!id || !nombreUsuario || !descripcionFalla || !fecha)
    {
        result = globalService.generarMensajeError('faltan datos para poder completar la acción');
    } 
    else if(isNaN(id))
    {
        result = globalService.generarMensajeError('id con formato inválido');
    }
    else
    {
        // procesar acción
        result = ticketService.modificarTicket(req);
    }

    res.json(result);
}

module.exports = {
    agregarTicket,
    eliminarTicket,
    obtenerTicket,
    modificarTicket
}

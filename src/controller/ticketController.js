const ticketService = require('../service/ticketService');
const globalService = require('../service/globalService');

var agregarTicket = function(req, res)
{
    const { idUsuario, descripcionError, fechaError } = req.body;

    // validación de datos de entrada
    if(!idUsuario || !descripcionError || !fechaError)
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFaltanDatos() });
    } 
    else
    {
        // procesar acción
        ticketService.agregarTicket(req, (result) => 
        {
            if(result.error)
            {
                res.status(500);
                res.json({ mensaje: result.mensaje });
            }
            else
            {
                res.status(201);
                res.json({ idTicket: result.idTicket, datosRecibidos: req.body });
            }
        });
    }
}

var obtenerTicket = function(req, res)
{
    const { idTicket } = req.params;

    // validación de datos de entrada
    if (isNaN(idTicket))
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFormatoInvalido() });
    }
    else
    {
        // procesar acción
        ticketService.obtenerTicket(idTicket, (result) => 
        {
            if(result.error)
            {
                res.status(500);
                res.json({ mensaje: result.mensaje });
            }
            else
            {
                res.json({ 
                    idTicket: result.idTicket,
                    idUsuario: result.idUsuario,
                    descripcionError: result.descripcionError,
                    fechaError: result.fechaError,
                    fechaTicket: result.fechaTicket, 
                    estado: result.estado,
                    datosRecibidos: req.params 
                });
            }
        });
    }
}

var modificarTicket = function(req, res)
{
    const { idUsuario, descripcionError, fechaError } = req.body;
    const { idTicket } = req.params.id;

    // validación de datos de entrada
    if(!idUsuario || !descripcionError || !fechaError)
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFaltanDatos() });
    }
    else if(isNaN(idTicket))
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFormatoInvalido() });
    } 
    else
    {
        // procesar acción
        var result = ticketService.modificarTicket(idTicket, req);

        if(result.error)
        {
            res.status(500);
            res.json({ mensaje: result.mensaje });
        }
        else
        {
            res.json({ idTicket: idTicket, datosRecibidos: req.body });
        }
    }
}

var eliminarTicket = function(req, res)
{
    const { id } = req.params;

    // validación de datos de entrada
    if (isNaN(id))
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFormatoInvalido() });
    }
    else
    {
        // procesar acción
        var result = ticketService.eliminarTicket(id);

        if(result.error)
        {
            res.status(500);
            res.json({ mensaje: result.mensaje });
        }
        else
        {
            res.json({ datosRecibidos: req.params });
        }
    }
}

module.exports = {
    agregarTicket,
    obtenerTicket,
    modificarTicket,
    eliminarTicket
}

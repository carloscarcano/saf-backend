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
        res.json({ mensaje: globalService.obtenerMensajeFormatoInvalido(), datosRecibidos: { idTicket: idTicket } });
    }
    else
    {
        // procesar acción
        ticketService.obtenerTicket(idTicket, (result) => 
        {
            if(result.error)
            {
                res.status(500);
                res.json({ mensaje: result.mensaje, datosRecibidos: { idTicket: idTicket } });
            }
            else
            {
                if(result.idTicket == null)
                {
                    res.status(404);
                    res.json({ datosRecibidos: { idTicket: idTicket } });
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
            }
        });
    }
}

var modificarTicket = function(req, res)
{
    const { idTicket } = req.params;

    // validación de datos de entrada
    if (isNaN(idTicket))
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFormatoInvalido(), datosRecibidos: { idTicket: idTicket, datosBody: req.body } });
    }
    else
    {
        // procesar acción
        ticketService.modificarTicket(idTicket, req, (result) => 
        {
            if(result.error)
            {
                res.status(500);
                res.json({ mensaje: result.mensaje, datosRecibidos: { idTicket: idTicket, datosBody: req.body } });
            }
            else
            {
                if(result.columnasModificadas == 0)
                    res.status(404);

                res.json({ datosRecibidos: { idTicket: idTicket, datosBody: req.body } });
            }
        });
    }
}

var eliminarTicket = function(req, res)
{
    const { idTicket } = req.params;

    // validación de datos de entrada
    if (isNaN(idTicket))
    {
        res.status(400);
        res.json({ mensaje: globalService.obtenerMensajeFormatoInvalido(), datosRecibidos: { idTicket: idTicket } });
    }
    else
    {
        // procesar acción
        ticketService.eliminarTicket(idTicket, (result) => 
        {
            if(result.error)
            {
                res.status(500);
                res.json({ mensaje: result.mensaje, datosRecibidos: { idTicket: idTicket } });
            }
            else
            {
                if(result.columnasEliminadas == 0)
                    res.status(404);

                res.json({ datosRecibidos: { idTicket: idTicket } });
            }
        });
    }
}

module.exports = {
    agregarTicket,
    obtenerTicket,
    modificarTicket,
    eliminarTicket
}

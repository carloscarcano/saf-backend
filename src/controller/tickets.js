var agregarTicket = function(req, res)
{
    if(!req.body.nombre)
    {
        res.json({ "error": true, "mensaje": "faltan parámetros" });
    }
    else
    {
        res.json({ "acción": "agregar ticket", "nombre": req.body.nombre });
    }
}

var eliminarTicket = function(req, res)
{
    res.json({"eliminar": "ticket"});
}

module.exports = {
    agregarTicket,
    eliminarTicket
}

const mysqlConnection = require('../dbconnection');
const globalService = require('./globalService');

var agregarTicket = (req, funcionCallBack) => {
    const { idUsuario, descripcionError, fechaError } = req.body;

    var result = {};
    var fecha = fechaError.split('/');
    var fechaErrorYMD = fecha[2] + '/' + fecha[1] + '/' + fecha[0];

    mysqlConnection.query('CALL TicketsAgregar(?, ?, ?)', [idUsuario, descripcionError, fechaErrorYMD], (err, rows, fields) => 
    {
        if(err)
        {
            result.error = true;
            result.mensaje = err;
        }
        else
        {
            var rowsJSON = JSON.parse(JSON.stringify(rows[0]));

            result.error = false;
            result.idTicket = rowsJSON[0].idTicket;
        }

        funcionCallBack(result);
    });
}

var obtenerTicket = (idTicket, funcionCallBack) => {
    var result = {};

    mysqlConnection.query('CALL TicketsObtener(?)', [idTicket], (err, rows, fields) => 
    {
        if(err)
        {
            result.error = true;
            result.mensaje = err;
        }
        else
        {
            var rowsJSON = JSON.parse(JSON.stringify(rows[0]));

            result.error = false;
            result.idTicket = rowsJSON[0].idTicket;
            result.idUsuario = rowsJSON[0].idUsuario;
            result.descripcionError = rowsJSON[0].descripcionError;
            result.fechaError = rowsJSON[0].fechaError;
            result.fechaTicket = rowsJSON[0].fechaTicket;
            result.estado = rowsJSON[0].estado;
        }

        funcionCallBack(result);
    });
}

var modificarTicket = (idTicket, req) => {
    var result = {};
    const { idUsuario, descripcionError, fechaError } = req.body;

    mysqlConnection.query('CALL TicketModificar(?, ?, ?, ?)', [idTicket, idUsuario, descripcionError, fechaError], (err, rows, fields) => {
        if(err)
        {
            result.error = true;
            result.mensaje = err;
        }
        else
        {
            result.error = false;
        }
    });

    return result;
}

var eliminarTicket = (idTicket) => {
    var result = {};

    mysqlConnection.query('CALL TicketEliminar(?)', [idTicket], (err, rows, fields) => {
        if(err)
        {
            result.error = true;
            result.mensaje = err;
        }
        else
        {
            result.error = false;
        }
    });

    return result;
}

module.exports = {
    agregarTicket,
    obtenerTicket,
    modificarTicket,
    eliminarTicket
}

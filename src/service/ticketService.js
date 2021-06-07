const mysqlConnection = require('../dbconnection');

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

            if (rowsJSON.length == 0)
            {
                result.idTicket = null;
            }
            else
            {
                result.idTicket = rowsJSON[0].idTicket;
                result.idUsuario = rowsJSON[0].idUsuario;
                result.descripcionError = rowsJSON[0].descripcionError;
                result.fechaError = rowsJSON[0].fechaError;
                result.fechaTicket = rowsJSON[0].fechaTicket;
                result.idEstadoTicket = rowsJSON[0].idEstadoTicket;
            }
        }

        funcionCallBack(result);
    });
}

var modificarTicket = (idTicket, req, funcionCallBack) => {
    var result = {};
    var { descripcionError, fechaError, idEstadoTicket } = req.body;

    if (fechaError)
    {
        var fecha = fechaError.split('/');
        var fechaErrorYMD = fecha[2] + '/' + fecha[1] + '/' + fecha[0];    
    }
    else
    {
        var fechaErrorYMD = null;
    }

    if (!descripcionError)
        descripcionError = null;

    if (!idEstadoTicket)
        idEstadoTicket = null;

    mysqlConnection.query('CALL TicketsModificar(?, ?, ?, ?)', [idTicket, descripcionError, fechaErrorYMD, idEstadoTicket], (err, rows, fields) => {
        if(err)
        {
            result.error = true;
            result.mensaje = err;
        }
        else
        {
            var rowsJSON = JSON.parse(JSON.stringify(rows));

            result.error = false;
            result.columnasModificadas = rowsJSON.affectedRows;
        }

        funcionCallBack(result);
    });
}

var eliminarTicket = (idTicket, funcionCallBack) => {
    var result = {};

    mysqlConnection.query('CALL TicketsEliminar(?)', [idTicket], (err, rows, fields) => {
        if(err)
        {
            result.error = true;
            result.mensaje = err;
        }
        else
        {
            var rowsJSON = JSON.parse(JSON.stringify(rows));

            result.error = false;
            result.columnasEliminadas = rowsJSON.affectedRows;
        }

        funcionCallBack(result);
    });
}

module.exports = {
    agregarTicket,
    obtenerTicket,
    modificarTicket,
    eliminarTicket
}

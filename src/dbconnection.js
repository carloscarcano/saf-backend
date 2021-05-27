const mysql = require('mysql');

const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'saf_user',
    password: 'saf_user',
    database: 'saf',
    multipleStatements: true
});

dbconnection.connect((err) => {
    if(err)
    {
        console.log('> error al intentar conectarse a la base de datos:', err);
        return;
    }
    else
    {
        console.log('> conectado a mysql');
    }
});

module.exports = dbconnection;
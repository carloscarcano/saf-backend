const mysql = require('mysql');
const fs = require('fs');

// local
// const dbconnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'saf',
//     multipleStatements: true
// });

// azure
const dbconnection = mysql.createConnection({
    host: 'proyectos-maestria.mysql.database.azure.com',
    user: 'proyectos@proyectos-maestria',
    password: 'UNIR100#',
    database: 'saf',
    multipleStatements: true,
    ssl: { ca: fs.readFileSync('./src/BaltimoreCyberTrustRoot.crt.pem')}
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
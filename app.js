const express = require("express");
const bodyParser = require("body-parser");

const rutas = require('./src/routes/routes');

const app = new express();
const puerto = process.env.PORT || 8085;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

app.use(rutas);

// iniciar servidor
app.listen(puerto, function() {
    console.log(`> servidor iniciado en el puerto ${puerto}`);
});

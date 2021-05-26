const express = require("express");

const app = new express();
const ruteo = require('./src/routes');

// configuración
app.set('puerto', process.env.PORT || 8085);
app.use(express.json());
app.use('/api/v1', ruteo);

// iniciar servidor
app.listen(app.get('puerto'), () => {
    console.log('> servidor iniciado en el puerto:', app.get('puerto'));
});

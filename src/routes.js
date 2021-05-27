const express = require('express');

const globalController = require('./controller/globalController');
const ticketController = require('./controller/ticketController');

var router = express.Router();

// global
router.get('/status', globalController.checkStatus);

// tickets
router.post('/ticket', ticketController.agregarTicket);
router.get('/ticket/:idTicket', ticketController.obtenerTicket);
router.put('/ticket/:id', ticketController.modificarTicket);
router.delete('/ticket/:id', ticketController.eliminarTicket);

module.exports = router;

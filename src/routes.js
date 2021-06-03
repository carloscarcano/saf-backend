const express = require('express');

const globalController = require('./controller/globalController');
const ticketController = require('./controller/ticketController');

var router = express.Router();

// global
router.get('/status', globalController.checkStatus);

// tickets
router.post('/ticket', ticketController.agregarTicket);
router.get('/ticket/:idTicket', ticketController.obtenerTicket);
router.patch('/ticket/:idTicket', ticketController.modificarTicket);
router.delete('/ticket/:idTicket', ticketController.eliminarTicket);

module.exports = router;

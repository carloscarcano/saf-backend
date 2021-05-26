const express = require('express');

const globalController = require('./controller/globalController');
const ticketController = require('./controller/ticketController');

var router = express.Router();

// global
router.get('/status', globalController.checkStatus);

// tickets
router.post('/ticket', ticketController.agregarTicket);
router.delete('/ticket/:id', ticketController.eliminarTicket);
router.get('/ticket/:id', ticketController.obtenerTicket);
router.put('/ticket', ticketController.modificarTicket);

module.exports = router;

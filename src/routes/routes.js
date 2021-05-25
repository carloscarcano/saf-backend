const express = require('express');
const ticketsController = require('../controller/tickets');

var router = express.Router();

router.post('/ticket', ticketsController.agregarTicket);
router.delete('/ticket', ticketsController.eliminarTicket);

module.exports = router;

var express = require('express');
const { getallBuses, createBus, updateBusById, deleteBusById } = require('../controller/busController');
var router = express.Router();

router.get('/get_all_buses', getallBuses);
router.post('/create_bus', createBus);
router.put('/update_bus/:id', updateBusById);
router.delete('/delete_bus/:id', deleteBusById);

module.exports = router;
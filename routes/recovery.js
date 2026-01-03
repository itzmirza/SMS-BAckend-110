var express = require('express');
const { getAllRecovery, createRecovery , deleteRecoveryById , updateRecoveryById} = require('../controllers/recoveryController');
var router = express.Router();

/* GET home page. */
router.get('/get_all_recoveries', getAllRecovery);
router.post('/create_recovery', createRecovery);
router.delete('/delete_recovery/:id', deleteRecoveryById)
router.put('/update_recovery/:id', updateRecoveryById);
module.exports = router;

var express = require("express");
const { getallDrivers, createDriver, updateDriverById, deleteDriverById } = require("../controllers/driverController");
var router = express.Router();

router.get("/get_all_drivers", getallDrivers);
router.post("/create_driver", createDriver);
router.put("/update_driver/:id", updateDriverById);
router.delete("/delete_driver/:id", deleteDriverById);

module.exports = router;

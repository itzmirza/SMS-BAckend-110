var express = require("express");
var router = express.Router();
const {
  getallDrivers,
  createDriver,
  updateDriverById,
  deleteDriverById,
} = require("../controller/driverController");

router.get("/get_all_drivers", getallDrivers);
router.post("/create_driver", createDriver);
router.put("/update_driver/:id", updateDriverById);
router.delete("/delete_driver/:id", deleteDriverById);

module.exports = router;

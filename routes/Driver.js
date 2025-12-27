var express = require("express");
const {
  getAlldrivers,
  createDriver,
  UpdateDriverById,
  deleteDriverbyId,
} = require("../controllers/driverController");
var router = express.Router();
router.get("/get_all_drivers", getAlldrivers);
router.post("/create_driver", createDriver);
router.put("/update_driver/:id", UpdateDriverById);
router.delete("/delete_driver/:id", deleteDriverbyId);

module.exports = router;

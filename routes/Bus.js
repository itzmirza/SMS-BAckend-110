var express= require("express");
const { getAllBuses, createBus, UpdateBusById, deleteBusbyId } = require("../controllers/busController");
var router= express.Router();
router.get("/get_all_buses", getAllBuses);
router.post("/create_bus", createBus);
router.put("/update_bus/:id", UpdateBusById);
router.delete("/delete_bus/:id", deleteBusbyId);


module.exports= router;
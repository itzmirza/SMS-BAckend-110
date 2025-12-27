var express = require("express");
const {
  getAllclasses,
    createClass,
    deleteClassById,
    updateClassById,
} = require("../controllers/Classescontroller");
var router = express.Router();

/* GET users listing. */
router.get("/get_all_classes",   getAllclasses,);
router.post("/create_class", createClass);
router.delete("/delete_class/:id", deleteClassById);
router.put("/update_class/:id", updateClassById);

module.exports = router;

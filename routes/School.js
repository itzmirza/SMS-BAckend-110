var express = require("express");
const {
  getAllSchools,
  createSchool,
  deleteSchoolById,
  updateSchoolById,
  addPayment,
} = require("../controllers/schoolController");
var router = express.Router();

/* GET users listing. */
router.get("/get_all_school", getAllSchools);
router.post("/create_school", createSchool);
router.delete("/delete_school/:id", deleteSchoolById);
router.put("/update_school/:id", updateSchoolById);
router.post("/add_payment/:id", addPayment);

module.exports = router;

var express = require("express");
const { getStudentById } = require("../controllers/parentController");
var router = express.Router();
router.get("/get_student_by_id", getStudentById);
module.exports = router;

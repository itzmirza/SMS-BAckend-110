var express = require("express");
const { getAllStudents, createStudent, deleteStudentById, updateStudentById } = require("../controllers/studentController");

var router = express.Router();

// Get all students
router.get("/get_all_students", getAllStudents);

// Create student
router.post("/create_student", createStudent);

// Delete student by ID
router.delete("/delete_student/:id", deleteStudentById);

// Update student by ID
router.put("/update_student/:id", updateStudentById);

module.exports = router;

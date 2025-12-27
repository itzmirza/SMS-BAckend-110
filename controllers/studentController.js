const Students = require("../modals/studentSchema");

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const studentData = await Students.find();
    if (!studentData || studentData.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No students found",
      });
    }

    return res.status(200).json({
      code: 200,
      data: studentData,
      message: "Students fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: err.message,
    });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    const existingStudent = await Students.findOne({
      email: req?.body?.email, // or rollNo / registrationNo
    });

    if (!existingStudent) {
      return res.status(400).json({
        code: 400,
        message: "Student already exists",
      });
    }

    const newStudent = await Students.create(req.body);

    return res.status(201).json({
      code: 201,
      data: newStudent,
      message: "Student created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete student by ID
const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const existingStudent = await Students.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({
        code: 404,
        message: "Student not found",
      });
    }

    await Students.findByIdAndDelete(studentId);

    return res.status(200).json({
      code: 200,
      message: "Student deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: err.message,
    });
  }
};

// Update student by ID
const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = req.body;

    const existingStudent = await Students.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({
        code: 404,
        message: "Student not found",
      });
    }

    const updatedStudent = await Students.findByIdAndUpdate(
      studentId,
      studentData,
      { new: true }
    );

    return res.status(200).json({
      code: 200,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  deleteStudentById,
  updateStudentById,
};

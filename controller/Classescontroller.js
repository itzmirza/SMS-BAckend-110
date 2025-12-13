var Class = require("../models/ClassesSchema");

// Controller function to create a new school
const getAllclasses = async (req, res) => {
  try {
    const classData = await Class.find();
    if (!classData) {
      return res.status(400).json({ code: 400, message: "no class found" });
    }
    res
      .status(200)
      .json({ code: 400, data: classData, message: "fetching data" });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const createClass = async (req, res) => {
  try {
    const existingClass = await Class.findOne({ name: req?.body?.name });
    if (existingClass) {
      return res.status(400).json({
        code: 400,
        message: "This Class Already Exist",
      });
    }
    const newClass = await Class.create(req?.body);
    if (!newClass) {
      return res.status(400).json({
        code: 400,
        message: "Something Went Wrong",
      });
    }
    return res.status(200).json({
      code: 200,
      data: newClass,
      message: "Class Created Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteClassById = async (req, res) => {
  try {
    const classId = req.params.id;

    // Check if class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({
        code: 404,
        message: "Class Not Found",
      });
    }

    // Delete class
    await Class.findByIdAndDelete(classId);

    return res.status(200).json({
      code: 200,
      message: "Class Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: err.message,
    });
  }
};


const updateClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const ClassData = req.body;
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).send({ code: 404, message: "Class Not Found" });
    }
    const UpdatedClass = await Class.findByIdAndUpdate(
      existingClass?._id,
      ClassData,
      { new: true }
    );
    if (UpdatedClass) {
      return res.status(200).send({
        code: 200,
        message: "Class Updated Successfully",
        data: UpdatedClass,
      });
    }
    return res.status(400).send({ code: 400, message: "Nothing was updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllclasses,
  createClass,
  deleteClassById,
  updateClassById,
};

var Class = require("../modals/ClassesSchema");
const teacher = require("../modals/teacher");
var Teacher = require("../modals/teacher");

// Controller function to create a new school
const getAllclasses = async (req, res) => {
  try {
    const classData = await Class.find().populate("teacherId");
    if (!classData) {
      return res.send({ code: 400, message: "no class found" });
    }
    res.send({ code: 200, data: classData, message: "fetching data" });
  } catch (err) {
    return res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const createClass = async (req, res) => {
  try {
    const existingClass = await Class.findOne({
      name: req?.body?.name,
      section: req?.body?.section,
    });
    if (existingClass) {
      return res.send({
        code: 400,
        message: "This Class Already Exist",
      });
    }
    const newClass = await Class.create(req?.body);
    if (!newClass) {
      return res.send({
        code: 400,
        message: "Something Went Wrong",
      });
    }
    return res.send({
      code: 200,
      data: newClass,
      message: "Class Created Successfully",
    });
  } catch (err) {
    return res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteClassById = async (req, res) => {
  try {
    const classId = req.params.id;

    // Check if class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.send({
        code: 404,
        message: "Class Not Found",
      });
    }
    await Teacher.updateMany({ classId: classId }, { $set: { classId: null } });
    const deleteClass = await Class.findByIdAndDelete(classId);
    if (!deleteClass) {
      return res.send({ code: 400, message: "something went wrong" });
    }
    res.send({
      code: 200,
      message: "Class Deleted Successfully",
    });
  } catch (err) {
    return res.send({
      code: 500,
      message: "Server Error",
      error: err.message,
    });
  }
};

const updateClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const { teacherId, ...ClassData } = req.body;
    const getClass = await Class.findById(classId);
    if (!getClass) {
      return res.send({ code: 404, message: "Class Not Found" });
    }
    if (ClassData.name) {
      const existingClass = await Class.findOne({
        name: ClassData.name,
        _id: { $ne: classId },
      });
      if (existingClass) {
        return res.send({ code: 400, message: "calss already exist" });
      }
    }

    const finalTeacherId = getClass.teacherId;
    if (teacherId !== undefined) {
      if (getClass.teacherId && getClass.teacherId.toString() !== teacherId) {
        await Teacher.findByIdAndUpdate(finalTeacherId, { classId: null });
      }
      if (teacherId) {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
          return res.send({ code: 400, Message: "Teacher not found" });
        }
        await Teacher.findByIdAndUpdate(teacherId, { classId });
        finalTeacherId = teacherId;
      } else {
        finalTeacherId = null;
      }
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { ...ClassData, teacherId: finalTeacherId },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.send({ code: 400, message: "Nothing was updated" });
    }
    res.send({
      code: 200,
      message: "Class Updated Successfully",
      data: updatedClass,
    });
  } catch (err) {
    return res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllclasses,
  createClass,
  deleteClassById,
  updateClassById,
};

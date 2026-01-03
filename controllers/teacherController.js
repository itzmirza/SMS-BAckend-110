const teacher = require("../modals/teacher");
const Class = require("../modals/ClassesSchema");
const Classes = require("../modals/ClassesSchema");

const getAllTeacher = async (req, res) => {
  try {
    const teachers = await teacher.find().populate("classId").sort({ createdAt: -1 });
    if (!teachers) {
      return res.send({
        code: 404,
        message: "No teachers found",
      });
    }
    res.send({
      code: 200,
      message: "Teacher fetched successfully",
      data: teachers,
    });
  } catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }

};

const createTeacher = async (req, res) => {
  try {
    const existingTeacher = await teacher.findOne({ cnic: req?.body?.cnic });
    if (existingTeacher) {
      return res.send({ code: 400, message: "Teacher already Exist" })
    }
    const newTeacher = await teacher.create(req?.body)
    if (!newTeacher) {
      return res.send({ code: 400, message: "Something went wrnng" })
    }
    await Classes.findByIdAndUpdate(req?.body?.classId, {
      teacherId: newTeacher?._id,
    });
    res.send({ code: 200, Teacher: newTeacher, message: "Teacher created Successfully" })
  } catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}



const deleteTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id
    const existingTeacher = await teacher.findById(teacherId)
    if (!existingTeacher) {
      return res.send({ code: 404, message: "Teacher not found" })
    }

    const updateClass = await Classes.findByIdAndUpdate(existingTeacher?.classId, {
      teacherId: null,
    });

    const deleteTeacher = await teacher.findByIdAndDelete(teacherId)
    if (!deleteTeacher) {
      return res.send({ code: 400, message: "Failed to delete Teacher" })
    }
    res.send({ code: 200, message: "Teacher deleted successfully " })
  } catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }

}

const updateTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id
    const teacherData = req.body
    const { classId } = req.body;
    const getTeacher = await teacher.findById(teacherId)
    if (!getTeacher) {
      return res.send({ code: 404, message: "Teacher not found" })
    }
    const existingTeacher = await teacher.findOne({ cnic: teacherData?.cnic, _id: { $ne: teacherId } })
    if (existingTeacher) {
      return res.send({ code: 400, message: "Teacher with this CNIC already exists" })
    }
    await Classes.updateMany({ teacherId: teacherId }, { $set: { teacherId: null } });

    if (classId) {
      const getTeacherClass = await Classes.findById(classId);
      if (!getTeacherClass) {
        return res.send({ code: 400, message: "Class not found" });
      }
      await Classes.findByIdAndUpdate(classId, { teacherId: teacherId });

    }
    const updateTeacher = await teacher.findByIdAndUpdate(
      teacherId,
      { ...teacherData, classId: classId || null },
      { new: true, runValidators: true });

    if (!updateTeacher) {
      return res.send({ code: 400, message: "Failed to update Teacher" })
    }
    res.send({ code: 200, message: "Teacher updated successfully " })
  } catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}
module.exports = {
  getAllTeacher,
  createTeacher,
  deleteTeacherById,
  updateTeacherById,
};
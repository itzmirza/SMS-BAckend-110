const recovery = require("../modals/recovery");
const Students = require("../modals/studentSchema");
const Class = require("../modals/ClassesSchema");


const getAllRecovery = async (req, res) => {
  try {
    const recoveries = await recovery.find()
      .populate("studentId", "firstName lastName")
      .populate("classId")
      .sort({ createdAt: -1 });
    if (!recoveries) {
      return res.send({
        code: 404,
        message: "No recoveries found"
      });
    }
    res.send({
      code: 200,
      message: "Recovery fetched successfully",
      data: recoveries,
    });
  } catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }

};

const createRecovery = async (req, res) => {
  try {

    const existingRecovery = await recovery.findOne({
      studentId: req?.body?.studentId,
      classId: req?.body?.classId,
    });
    if (existingRecovery) {
      return res.send({ code: 400, message: "Recovery already exists for this student and class" });
    }
    const newRecovery = await recovery.create(req?.body);
    if (!newRecovery) {
      return res.send({ code: 400, message: "Failed to create Recovery" })
    }
    res.send({ code: 200, Recovery: newRecovery, message: "Recovery created Successfully" })
  }
  catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}

const deleteRecoveryById = async (req, res) => {
  try {
    const recoveryId = req.params.id
    const existingRecovery = await recovery.findById(recoveryId)
    if (!existingRecovery) {
      return res.send({ code: 404, message: "Recovery not found" })
    }
    const deleteRecovery = await recovery.findByIdAndDelete(existingRecovery?._id)
    if (!deleteRecovery) {
      return res.send({ code: 400, message: "Failed to delete Recovery" })
    }
    res.send({ code: 200, message: "Recovery deleted successfully " })
  } catch (error) {
    res.send({
      code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }

}
  const updateRecoveryById = async (req, res) => {
    try {
      const recoveryId = req.params.id
      const recoveryData = req.body
      const existingRecovery = await recovery.findById(recoveryId)
      if (!existingRecovery) {
        return res.send({ code: 404, message: "Recovery not found" })
      }

      const updateRecovery = await recovery.findByIdAndUpdate(existingRecovery?._id, recoveryData)
      res.send({ code: 200, message: "Recovery updated successfully " })
    } catch (error) {
      res.send({
        code: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }


    module.exports = {
      getAllRecovery,
      createRecovery,
      deleteRecoveryById,
      updateRecoveryById,
    };
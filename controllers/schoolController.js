var School = require("../modals/schoolSchema");

// Controller function to create a new school
const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 });
    return res.status(200).json(schools);
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const createSchool = async (req, res) => {
  try {
    const existingSchool = await School.findOne({ name: req?.body?.name });
    if (existingSchool) {
      return res.status(400).json({
        code: 400,
        message: "This School Already Exist",
      });
    }
    const newSchool = await School.create(req?.body);
    if (!newSchool) {
      return res.status(400).json({
        code: 400,
        message: "Something Went Wrong",
      });
    }
    return res.status(200).json({
      code: 200,
      data: newSchool,
      message: "School Created Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteSchoolById = async (req, res) => {
  try {
    const SchoolId = req.params.id;
    const existingSchool = await School.findById(SchoolId);
    if (!existingSchool) {
      return res.status(404).send({ code: 404, message: "School Not Found" });
    }
    const deleteSchool = await School.findByIdAndDelete(existingSchool?._id);
    if (!deleteSchool) {
      return res
        .status(400)
        .send({ code: 400, message: "Something Went Wrong!" });
    }
    return res
      .status(200)
      .send({ code: 200, message: "School Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const updateSchoolById = async (req, res) => {
  try {
    const SchoolId = req.params.id;
    const SchoolData = req.body;
    const existingSchool = await School.findById(SchoolId);
    if (!existingSchool) {
      return res.status(404).send({ code: 404, message: "School Not Found" });
    }
    const UpdatedSchool = await School.findByIdAndUpdate(
      existingSchool?._id,
      SchoolData,
      { new: true }
    );
    if (UpdatedSchool) {
      return res.status(200).send({
        code: 200,
        message: "School Updated Successfully",
        data: UpdatedSchool,
      });
    }
    return res.status(400).send({ code: 400, message: "Nothing was updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

// Controller to add payment amount to a school
const addPayment = async (req, res) => {
  try {
    const schoolId = req.params.id;
    const amount = Number(req?.body?.amount);
    if (!schoolId) {
      return res
        .status(400)
        .json({ code: 400, message: "School id is required" });
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ code: 400, message: "Valid payment amount is required" });
    }

    const existingSchool = await School.findById(schoolId);
    if (!existingSchool) {
      return res.status(404).json({ code: 404, message: "School Not Found" });
    }

    // Sum the payment with any existing value
    const currentPayment = Number(existingSchool.payment) || 0;
    existingSchool.payment = currentPayment + amount;
    await existingSchool.save();

    return res.status(200).json({
      code: 200,
      message: "Payment added successfully",
      data: { schoolId: existingSchool._id, payment: existingSchool.payment },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllSchools,
  createSchool,
  deleteSchoolById,
  updateSchoolById,
  addPayment,
};

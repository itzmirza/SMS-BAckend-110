const Drivers = require("../models/driverSchema");
const getallDrivers = async (req, res) => {
  try {
    const drivers = await Drivers.find().sort({ createdAt: -1 });
    return res.status(200).json({
      code: 200,
      data: drivers,
      message: "Drivers Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDriver = async (req, res) => {
  try {
     const existingDriver = await Drivers.findOne({ name: req?.body?.name });
  if (existingDriver) {
    return res.status(400).json({
      code: 400,
      message: "This Driver Already Exist",
    });
  }
    const newDriver = await Drivers.create(req?.body);
    if (!newDriver) {
      return res.status(400).json({
        code: 400,
        message: "Something Went Wrong",
      });
    }
    return res.status(200).json({
      code: 200,
      data: newDriver,
      message: "Driver Created Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const updateDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    const driverData = req.body;
    const existingDriver = await Drivers.findById(driverId);
    if (!existingDriver) {
      return res.status(404).send({ code: 404, message: "Driver Not Found" });
    }
    const updatedDriver = await Drivers.findByIdAndUpdate(
      existingDriver?._id,
      driverData,
      { new: true }
    );
    return res.status(200).json({
      code: 200,
      data: updatedDriver,
      message: "Driver Updated Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    const existingDriver = await Drivers.findById(driverId);
    if (!existingDriver) {
      return res.status(404).send({ code: 404, message: "Driver Not Found" });
    }
    await Drivers.findByIdAndDelete(existingDriver?._id);
    return res.status(200).json({
      code: 200,
      message: "Driver Deleted Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getallDrivers,
  createDriver,
  updateDriverById,
  deleteDriverById,
};

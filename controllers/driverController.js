const Drivers = require("../modals/driverSchema");
const Buses = require("../modals/busSchema"); // ✅ zaroori

const getAlldrivers = async (req, res) => {
  try {
    const getDrivers = await Drivers.find()
      .populate("busId")
      .sort({ createdAt: -1 });
    if (!getDrivers) {
      return res.send({ code: 400, message: "No Driver Found" });
    }
    res.send({ code: 200, message: "Fetching Drivers", data: getDrivers });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const createDriver = async (req, res) => {
  try {
    const existingDriver = await Drivers.findOne({
      licenseNumber: req?.body?.licenseNumber,
    });
    if (existingDriver) {
      return res.send({ code: 400, message: "Driver Already Exist" });
    }
    const newDriver = await Drivers.create(req.body);
    if (!newDriver) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    await Buses.findByIdAndUpdate(req.body.busId, {
      driverId: newDriver._id,
    });
    res.send({ code: 200, message: "Driver Created Successfully" });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const UpdateDriverById = async (req, res) => {
  try {
    const findDriverId = await Drivers.findById(req.params.id);
    const driverData = req.body;
    const existingDriver = await Drivers.findOne({
      licenseNumber: req?.body?.licenseNumber,
      _id: { $ne: req.params.id },
    });
    if (existingDriver) {
      return res.send({ code: 400, message: "Driver Already Exist" });
    }
    const updatedDriver = await Drivers.findByIdAndUpdate(
      findDriverId,
      driverData,
      {
        new: true,
      }
    );
    if (!updatedDriver) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    res.send({ code: 200, message: "Driver updated Successfully" });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};
const deleteDriverbyId = async (req, res) => {
  try {
    const findDriverId = await Drivers.findById(req.params.id);
    if (!findDriverId) {
      return res.send({ code: 400, message: "Driver Not Exist" });
    }
    const deletedDriver = await Drivers.findByIdAndDelete(req.params.id);

    if (!deletedDriver) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    if (findDriverId.busId) {
      await Buses.findByIdAndUpdate(findDriverId.busId, {
        driverId: null,
      });
    }
    res.send({ code: 200, message: "Driver Deleted Successfully" });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAlldrivers,
  createDriver,
  UpdateDriverById,
  deleteDriverbyId,
};

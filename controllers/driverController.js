const Drivers = require("../modals/driverSchema");
const Buses = require("../modals/busSchema");

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
    const driverId = req.params.id;
    const driverData = req.body;
    const { busId } = req.body;
    const driver = await Drivers.findById(driverId);
    if (!driver) {
      return res.send({ code: 400, message: "Driver not found" });
    }
    const existingDriver = await Drivers.findOne({
      licenseNumber: driverData.licenseNumber,
      _id: { $ne: driverId },
    });
    if (existingDriver) {
      return res.send({ code: 400, message: "Driver already exists" });
    }
    await Buses.updateMany(
      { driverId: driverId },
      { $set: { driverId: null } }
    );
    if (busId) {
      const getbus = await Buses.findById(busId);
      if (!getbus) {
        return res.send({ code: 400, message: "Bus not found" });
      }
      await Buses.findByIdAndUpdate(busId, { driverId });
    }
    const updatedDriver = await Drivers.findByIdAndUpdate(
      driverId,
      { ...driverData, busId: busId || null },
      { new: true, runValidators: true }
    );
    res.send({
      code: 200,
      message: "Driver updated & bus synced successfully",
      data: updatedDriver,
    });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteDriverbyId = async (req, res) => {
  try {
    const driverId = req.params.id;
    const getdriver = await Drivers.findById(driverId);
    if (!getdriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    const updateBus = getdriver.busId;
    if (updateBus) {
      await Buses.findByIdAndUpdate(updateBus, {
        driverId: null,
      });
    }
    const deletedDriver = await Drivers.findByIdAndDelete(driverId);
    if (!deletedDriver) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    res.send({ code: 200, message: "Driver deleted successfully" });
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

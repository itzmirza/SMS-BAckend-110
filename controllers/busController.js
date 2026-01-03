const Buses = require("../modals/busSchema");
const Drivers = require("../modals/driverSchema");

const getAllBuses = async (req, res) => {
  try {
    const getBuses = await Buses.find()
      .populate("driverId")
      .sort({ createdAt: -1 });
    if (!getBuses) {
      return res.send({ code: 400, message: "No Buses Found" });
    }
    res.send({ code: 200, message: "Fetching Data", data: getBuses });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const createBus = async (req, res) => {
  try {
    const existingBus = await Buses.findOne({
      registrationNumber: req?.body?.registrationNumber,
    });
    if (existingBus) {
      return res.send({ code: 400, message: "Bus Registration Already Exist" });
    }
    const newBus = await Buses.create(req.body);
    if (!newBus) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    res.send({ code: 200, message: "Bus Created Successfully" });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const UpdateBusById = async (req, res) => {
  try {
    const busId = req.params.id;
    const { driverId, ...busData } = req.body;
    const getBus = await Buses.findById(busId);
    if (!getBus) {
      return res.send({ code: 400, message: "Bus not found" });
    }
    //focus
    if (busData.registrationNumber) {
      const existingBus = await Buses.findOne({
        registrationNumber: busData.registrationNumber,
        _id: { $ne: busId },
      });
      if (existingBus) {
        return res.send({ code: 400, message: "Bus already exists" });
      }
    }

    const finalDriverId = getBus.driverId;
    if (driverId !== undefined) {
      if (getBus.driverId && getBus.driverId.toString() !== driverId) {
        await Drivers.findByIdAndUpdate(finalDriverId, {
          busId: null,
        });
      }
      if (driverId) {
        const driver = await Drivers.findById(driverId);
        if (!driver) {
          return res.send({ code: 400, message: "Driver not found" });
        }
        await Drivers.findByIdAndUpdate(driverId, { busId });
        finalDriverId = driverId;
      } else {
        finalDriverId = null;
      }
    }
    const updatedBus = await Buses.findByIdAndUpdate(
      busId,
      { ...busData, driverId: finalDriverId },
      { new: true, runValidators: true }
    );
    res.send({
      code: 200,
      message: "Bus updated & Driver synced successfully",
      data: updatedBus,
    });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteBusbyId = async (req, res) => {
  try {
    const busId = req.params.id;
    const getBus = await Buses.findById(busId);
    if (!getBus) {
      return res.send({ code: 400, message: "Bus not found" });
    }
    await Drivers.updateMany({ busId: busId }, { $set: { busId: null } });
    const deletedBus = await Buses.findByIdAndDelete(busId);
    if (!deletedBus) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    res.send({ code: 200, message: "Bus deleted successfully" });
  } catch (err) {
    return res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllBuses,
  createBus,
  UpdateBusById,
  deleteBusbyId,
};

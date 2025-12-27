const Buses = require("../modals/busSchema");

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
      return res.send({ code: 400, message: "Bus Already Exist" });
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
    const findBusId = await Buses.findById(req.params.id);
    const busData = req.body;
    const existingBus = await Buses.findOne({
      registrationNumber: req?.body?.registrationNumber,
      _id: { $ne: req.params.id },
    });
    if (existingBus) {
      return res.send({ code: 400, message: "Bus Already Exist" });
    }
    const updatedBus = await Buses.findByIdAndUpdate(findBusId, busData, {
      new: true,
    });

    if (!updatedBus) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    res.send({ code: 200, message: "Bus updated Successfully" });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteBusbyId = async (req, res) => {
  try {
    const findBusId = await Buses.findById(req.params.id);
    if (!findBusId) {
      return res.send({ code: 400, nessage: "Bus Not Exist" });
    }
    const deletedBus = await Buses.findByIdAndDelete(findBusId);
    if (!deletedBus) {
      return res.send({ code: 400, message: "Something Went Wrong" });
    }
    res.send({ code: 200, message: "Bus Deleted Successfully" });
  } catch (err) {
    res.send({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getAllBuses,
  createBus,
  UpdateBusById,
  deleteBusbyId,
};

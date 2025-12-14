const Buses = require("../modals/busSchema");

const getallBuses = async (req, res) => {
  try {
    const buses = await Buses.find({});
    return res.status(200).json({
      code: 200,
      data: buses,
      message: "Buses Fetched Successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};
const createBus = async (req, res) => {
  try {
    const existingBus = await Buses.findOne({
      registrationNumber: req?.body?.registrationNumber,
    });
    if (existingBus) {
      return res.status(400).json({
        code: 400,
        message: "This Bus Already Exist",
      });
    }
    const newBus = await Buses.create(req?.body);
    if (!newBus) {
      return res.status(400).json({
        code: 400,
        message: "Something Went Wrong",
      });
    }
    return res.status(200).json({
      code: 200,
      data: newBus,
      message: "Bus Created Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const updateBusById = async (req, res) => {
  try {
    const busId = req.params.id;
    const busData = req.body;
    const existingBus = await Buses.findById(busId);
    if (!existingBus) {
      return res.status(404).send({ code: 404, message: "Bus Not Found" });
    }
    const updatedBus = await Buses.findByIdAndUpdate(
      existingBus?._id,
      busData,
      { new: true }
    );
    return res.status(200).json({
      code: 200,
      data: updatedBus,
      message: "Bus Updated Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

const deleteBusById = async (req, res) => {
  try {
    const busId = req.params.id;
    const existingBus = await Buses.findById(busId);
    if (!existingBus) {
      return res.status(404).send({ code: 404, message: "Bus Not Found" });
    }
    const deleteBus = await Buses.findByIdAndDelete(existingBus?._id);
    if (!deleteBus) {
      return res
        .status(400)
        .send({ code: 400, message: "Something Went Wrong!" });
    }
    return res.status(200).json({
      code: 200,
      data: deleteBus,
      message: "Bus Deleted Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ code: 500, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getallBuses,
  createBus,
  updateBusById,
  deleteBusById,
};

const Students = require("../modals/studentSchema");
const Teachers = require("../modals/teacher");
const Classes = require("../modals/ClassesSchema");
const Drivers = require("../modals/driverSchema");
const Buses = require("../modals/busSchema");
const Recovery = require("../modals/recovery");

const getDashboardCounts = async (req, res) => {
  try {
    const [
      students,
      teachers,
      classes,
      drivers,
      buses,
      recovery,
    ] = await Promise.all([
      Students.countDocuments(),
      Teachers.countDocuments(),
      Classes.countDocuments(),
      Drivers.countDocuments(),
      Buses.countDocuments(),
      Recovery.countDocuments(),
    ]);

    res.status(200).json({
      students,
      teachers,
      classes,
      drivers,
      buses,
      recovery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard counts",
      error: error.message,
    });
  }
};

module.exports = { getDashboardCounts };

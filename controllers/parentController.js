const Students = require("../modals/studentSchema");

const getStudentById = async (req, res) => {
  const findStudent = await Students.findOne({
    
  });
};
module.exports = {
  getStudentById,
};

const teacher = require("../modals/teacher");
const getAllTeacher = async (req, res) => {
  try {
     const teachers = await teacher.find().sort({ createdAt: -1 });
    return res.status(200).json({
      code:200,
      message:"Teacher fetched successfully",
      data:teachers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
  
};

const createTeacher = async (req,res) => {
  const newTeacher = await teacher.create(req?.body);
  // if(existingTeacher){
  //   return res.send({code:400,message: "Teacher already Exist"})
  // }
  // const newTeacher = await teacher.create(req?.body)
  // if(!newTeacher){
  //   return res.send({code:400,message: "Something went wrnng"})
  // }
  res.send({code:200,Teacher: newTeacher,message: "Teacher created Successfully"})
}




const deleteTeacherById = async(req,res)=>{
  const teacherId = req.params.id
  const existingTeacher = await teacher.findById(teacherId)
  if(!existingTeacher){
    return res.send({code:404,message:"Teacher not found"})
  }

  const deleteTeacher = await teacher.findByIdAndDelete(existingTeacher?._id)
  res.send({code:200,message:"Teacher deleted successfully "})
}



const updateTeacherById = async(req,res)=>{
  const teacherId = req.params.id
  const teacherData = req.body
  const existingTeacher = await teacher.findById(teacherId)
  if(!existingTeacher){
    return res.send({code:404,message:"Teacher not found"})
  }

  const updateTeacher = await teacher.findByIdAndUpdate(existingTeacher?._id,teacherData)
  res.send({code:200,message:"Teacher updated successfully "})
}


module.exports = {
  getAllTeacher,
  createTeacher,
  deleteTeacherById,
  updateTeacherById,
};
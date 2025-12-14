const recovery = require("../modals/recovery");
const getAllRecovery = async (req, res) => {
  try {
     const recoveries = await recovery.find().sort({ createdAt: -1 });
    return res.status(200).json({
      code:200,
      message:"Recovery fetched successfully",
      data:recoveries,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
  
};

const createRecovery = async (req,res) => {
  const newRecovery = await recovery.create(req?.body);

  res.send({code:200,Recovery: newRecovery,message: "Recovery created Successfully"})
}




const deleteRecoveryById = async(req,res)=>{
  const recoveryId = req.params.id
  const existingRecovery = await recovery.findById(recoveryId)
  if(!existingRecovery){
    return res.send({code:404,message:"Recovery not found"})
  }

  const deleteRecovery = await recovery.findByIdAndDelete(existingRecovery?._id)
  res.send({code:200,message:"Recovery deleted successfully "})
}



const updateRecoveryById = async(req,res)=>{
  const recoveryId = req.params.id
  const recoveryData = req.body
  const existingRecovery = await recovery.findById(recoveryId)
  if(!existingRecovery){
    return res.send({code:404,message:"Recovery not found"})
  }

  const updateRecovery = await recovery.findByIdAndUpdate(existingRecovery?._id,recoveryData)
  res.send({code:200,message:"Recovery updated successfully "})
}


module.exports = {
  getAllRecovery,
  createRecovery,
  deleteRecoveryById,
  updateRecoveryById,
};
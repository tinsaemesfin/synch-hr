const mongoose = require("mongoose");

const WorkingHourSchema = new mongoose.Schema(
  {
    workingHourTime: { type: Object, required: true},    
    statusOfWorkingHour:{type:String, required:true},
    haveWorkingHour:{type:Boolean, required:true},
    canBeRemote:{type:Boolean,required:true},
    _employeeId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Employee'},    
    // workingHour:{type:Object,required:true}
    },
  { timestamps: true }
);

module.exports = mongoose.model("WorkingHour", WorkingHourSchema);



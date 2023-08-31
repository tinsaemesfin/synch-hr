
import { statusOfWorkingHour } from "@/types/workingHour";
import mongoose from "mongoose";



const WorkingHourSchema = new mongoose.Schema(
  {
    workingHourTime: { type: Object, required: true},    
    statusOfWorkingHour:{type:String,enum:statusOfWorkingHour, required:true},
    canBeRemote:{type:Boolean,required:true},
    _employeeId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Employee'},
    tenantId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Tenant'},
    haveOverNightShift: {type:Boolean,required:true},
    
    // workingHour:{type:Object,required:true}
    },
  { timestamps: true }
);


const WorkingHour = mongoose.models.WorkingHour || mongoose.model("WorkingHour", WorkingHourSchema,"WorkingHour");
export default WorkingHour;



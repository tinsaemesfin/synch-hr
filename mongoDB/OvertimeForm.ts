import mongoose from "mongoose";

const OvertimeFormSchema = new mongoose.Schema(
  {
    
    _employeeId:{type:mongoose.Schema.Types.ObjectId,required:true ,ref:'Employee'},
    monthYear:{type:Date,required:true},
    numberOfDays:{type:Number,required:true},
    hourDetails:{type:Object,required:true},
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    
    // in Hour Detail it will be an object and have
    // {01:{hours:1:30,startsFrom:05:00,endsOn:06:30,type:holyDay,status:filled}}
   },

  { timestamps: true }
);

const OvertimeForm = mongoose.models.OvertimeForm || mongoose.model("OvertimeForm", OvertimeFormSchema);  

export default OvertimeForm;

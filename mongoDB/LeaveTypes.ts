import mongoose from "mongoose";



const LeaveTypesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    slag:{type:String,required:true,unique:true},
    percentToDays:{type:Array,required:true}, // {100:30} 100percent for 30 days
    availableFrequency: {type:String,required:true},//annually => ye amentun mewesed yechelale ----duration => eskahun yeqoyebeten becha new mewesed yemichelew ------- oneTime=> hule mewsed yechelale limit yelewm(Family,withoutpay)
    updateData:{type:Object,required:true},
    followUpLeaveSlag:{type:String},
    expireData:{type:Object,required:true},
    status:{type:String,enum:['Active','Deactivated'],required:true},
    isFrequencyBasedOnEmployedDate:{type:Boolean,required:true},
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    

    },
  { timestamps: true }
);

const LeaveTypes = mongoose.models.LeaveTypes || mongoose.model("LeaveTypes", LeaveTypesSchema,'LeaveTypes');
export default LeaveTypes;

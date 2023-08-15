import mongoose from "mongoose";

const UploadedAttendanceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    path:{type:String,required:true},
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    
    },
  { timestamps: true }
);

const UploadedAttendance = mongoose.models.UploadedAttendance || mongoose.model("UploadedAttendance", UploadedAttendanceSchema);
export default UploadedAttendance;
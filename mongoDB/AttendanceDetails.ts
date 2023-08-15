import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AttendanceDetailsSchema = new Schema(
    {
      
      employeeAttendanceId:{type:Number,required:true},
      monthYear:{type:Date,required:true},
      numberOfDays:{type:Number,required:true},
      timeSheet:{type:Object,required:true},
      tenantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      }
      // in Hour Detail it will be an object and have
      // {01:{hours:1:30,startsFrom:05:00,endsOn:06:30,type:holyDay,status:filled}}
     },
  
    { timestamps: true }
  );
  const AttendanceDetails =
  mongoose.models.AttendanceDetails ||
  mongoose.model(
    "AttendanceDetails",
    AttendanceDetailsSchema,
    "AttendanceDetails"
  );

export default AttendanceDetails;

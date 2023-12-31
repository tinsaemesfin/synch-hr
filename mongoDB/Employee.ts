import { statusOfEmployee } from "@/types/employee";
;
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String },
    employedDate: { type: Date, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: Object, required: true },
    emergency: { type: Object, required: true },
    emergency2: { type: Object, required: false },
    activeContract: { type: Object, required: true },
    activeWorkingHour: { type: Object, required: true },
    activeOvertime: { type: Object, required: true },
    activeAllowance: { type: Object},
    statusOfEmployee: {
      type: String,
      enum: statusOfEmployee,
      required: true,
    },
    nationality: { type: String, required: true },
    address: { type: Object, required: false },
    beginningLeaveInfo: { type: Object, required: false },
    bankName: { type: String, required: true },
    bankNumber: { type: Number, required: true },
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    
    employeeAttendanceId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);


const Employee =
  mongoose.models.Employee ||
  mongoose.model("Employee", employeeSchema, "Employee");
export default Employee;

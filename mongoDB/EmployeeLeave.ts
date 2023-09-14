import { statusOfEmployeeLeave } from "@/types/employeeLeave";
import mongoose from "mongoose";

const EmployeeLeaveSchema = new mongoose.Schema(
  {
    _employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee",required:true},
    slag: { type: String, ref: "LeaveTypes", required: true },
    statusOfLeave: {
      type: String,
      required: true,
      enum: statusOfEmployeeLeave,
    },
    date: {
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
    }, // {totalDays,startDay,EndDay}
    comment: { type: String, required: false },
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    }
  },
  { timestamps: true }
);
/*
Pending: This status indicates that the leave application has been submitted by the employee but is yet to be reviewed or approved by the relevant authority.

Approved: This status indicates that the leave application has been reviewed and approved by the appropriate authority. The employee has been granted permission to take the requested leave.

Rejected: This status indicates that the leave application has been reviewed and rejected by the relevant authority. The employee's request for leave has been denied.

Canceled: This status is used when the employee or the authority cancels the previously approved leave. It indicates that the leave request has been revoked or invalidated.

Completed: This status indicates that the leave period has ended, and the employee has returned to work as scheduled.


*/
const EmployeeLeave = mongoose.models.EmployeeLeave || mongoose.model("EmployeeLeave", EmployeeLeaveSchema,'EmployeeLeave');
export default EmployeeLeave;

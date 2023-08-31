
import { statusOfAllowance } from "@/types/allowance";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AllowanceSchema = new Schema(
  {
   _employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    _companyAllowanceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CompanyAllowance",
    },
    amount: { type: mongoose.Types.Decimal128, required: true },
    isNet: { type: Boolean, required: true, default: false },
    statusOfAllowance: {
      type: String,
      enum: statusOfAllowance,
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
  },
  { timestamps: true }
);
const Allowance =
  mongoose.models.Allowance ||
  mongoose.model("Allowance", AllowanceSchema, "Allowance");
export default Allowance;

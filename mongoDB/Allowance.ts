import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AllowanceSchema = new Schema(
  {
    name: { type: String, required: true },
    slag: { type: String, required: true },
    _employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    _companyAllowanceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'CompanyAllowance'
    },
    amount: { type: mongoose.Types.Decimal128, required: true },
    statusOfAllowance: {
      type: String,
      enum: ["Active", "Pending", "Rejected", "Expired"],
      required: true,
    },
    net: { type: Boolean, required: true },
    history: { type: Array, required: true },
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    }
  },
  { timestamps: true }
);
const Allowance =
  mongoose.models.Allowance ||
  mongoose.model("Allowance", AllowanceSchema, "Allowance");
export default Allowance;

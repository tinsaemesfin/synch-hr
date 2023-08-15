import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    statusOfContract: { type: String,enum:['Active,Deactivated','Expired','Ended'], required: true },
    typeOfContract: { type: String, required: true },
    permanentOrContract: { type: String, required: true },
    titleOfPosition: { type: String, required: true },
    department: { type: String, required: true },
    startsFrom: { type: Date, required: true },
    endsOn: { type: Date },
    grossSalary: { type: mongoose.Types.Decimal128, required: true },
    rateOfSalary: { type: String, required: true },
    reason: { type: String, required: true },
    _employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
  },

  { timestamps: true }
);

const Contract = mongoose.models.Contract || mongoose.model("Contract", ContractSchema,'Contract');
export default Contract;
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CompanyAllowanceSchema = new Schema(
  {
    name: { type: String, required: true },
    slag: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    minTaxable: { type: mongoose.Types.Decimal128, required: true },
    minTaxableManager: { type: mongoose.Types.Decimal128, required: true },
    statusOfAllowance: { type: String, required: true },
    frequency: { type: String, required: true },
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    }
  },
  { timestamps: true }
);
const CompanyAllowance =
  mongoose.models.CompanyAllowance ||
  mongoose.model(
    "CompanyAllowance",
    CompanyAllowanceSchema,
    "CompanyAllowance"
  );

export default CompanyAllowance;

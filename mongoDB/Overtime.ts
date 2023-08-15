import mongoose from "mongoose";

const OvertimeSchema = new mongoose.Schema(
  {
    before5Pm: { type: mongoose.Types.Decimal128, required: true },
    after5Pm: { type: mongoose.Types.Decimal128, required: true },
    weekend: { type: mongoose.Types.Decimal128, required: true },
    holyday: { type: mongoose.Types.Decimal128, required: true },
    statusOfOvertime: { type: String, enum:['Active','Deactivated'], required: true },
    _employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    

    // workingHour:{type:Object,required:true}
  },
  { timestamps: true }
);

const Overtime =mongoose.models.Overtime || mongoose.model("Overtime", OvertimeSchema,'Overtime');

export default Overtime;

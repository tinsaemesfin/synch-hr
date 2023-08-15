import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CompanySettingsSchema = new Schema(
    {
      savedWorkingHour: { type: Array },
      savedOvertime: { type: Array },
      attendanceBufferTime:{type:Object },
      tenantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      }
    },
    { timestamps: true }
  );
  const CompanySettings = mongoose.models.CompanySettings || mongoose.model('CompanySettings', CompanySettingsSchema,'CompanySettings');
  export default CompanySettings;
import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    }
    // workingHour:{type:Object,required:true}
    },
  { timestamps: true }
);

const Department = mongoose.models.Department || mongoose.model("Department", DepartmentSchema,'Department');
export default Department;


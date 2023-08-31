import { statusOfEmployeePermission } from "@/types/CustomStatus/status";
import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    _employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee",required:true},
    date:{type:Object,required:true},
    statusOfPermission: {
      type: String,
      required: true,
      enum: statusOfEmployeePermission
    },

    reason:{type:String,required:true},
    tenantId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    
    

    },
  { timestamps: true }
);
const Permission = mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
export default Permission;
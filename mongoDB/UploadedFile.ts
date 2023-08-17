import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UploadedFileSchema = new Schema(
    {
      url:{type:String,required:true, unique:true},
      toWhat:{type:String,required:true},
      tenantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      }
    },
    { timestamps: true }
  );
  const UploadedFile = mongoose.models.UploadedFile || mongoose.model('UploadedFile', UploadedFileSchema,'UploadedFile');
  export default UploadedFile;
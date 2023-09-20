import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tenant =
  mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema, "Tenant");
export default Tenant;

// model Tenant{
//     id  String  @id @default(auto()) @map("_id") @db.ObjectId
//     name          String
//     description   String
//     createdAt     DateTime @default(now())
//     updatedAt     DateTime @updatedAt
// }

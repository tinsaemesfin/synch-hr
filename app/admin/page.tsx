// import { Separator } from "@radix-ui/react-separator";

// import prismadb from "@/Prisma";
import {format} from "date-fns";
import AdminClient from "./components/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ObjectId } from "bson";
import Tenant from "@/mongoDB/Tenant";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }

  const tenants = await Tenant.find({
   
        _id:{$ne: session.user.tenantId}
      });
  const formattedTenants = tenants.map((tenant) => ({
    id: tenant.id,
    name: tenant.name,    
    createdAt:format(tenant.createdAt,'MMMM dd, yyyy') ,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdminClient data={form}  />
      </div>
    </div>
  );
}


import React from "react";
import { ObjectId } from "bson";
import axios from "axios";
import { toast } from "react-hot-toast";
import dbConnect from "@/mongoDB/dbConnect";
import Tenant from "@/mongoDB/TENANT";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";



const TenantForm = async ({ params }: { params: { tenantId: string } }) => {
  let data=null;
  if(!isValidObjectId(params.tenantId)) {
  notFound();
  }
  await dbConnect();
  const tenant = await Tenant.findById({
    where: {
      id: params.tenantId ,
    },
  });
  console.log(tenant)
  // if(tenant) {


  //   const users = await prismadb.user.findFirst({
  //     where: {        
  //         tenantId:  params.tenantId,
  //         role: "tenantSuperAdmin",        
  //     },

  //   });
  //   if(users) {

  //   data ={
  //     tenantId: tenant.id,
  //     tenantName: tenant.name,
  //     tenantDescription: tenant.description,
  //     tenantCreatedAt: tenant.createdAt,
  //     tenantSuperAdminId: users.id,
  //     tenantSuperAdminName: users.name,
  //     tenantSuperAdminRole: users.role,
  //     tenantSuperAdminUsername: users.username,
  //     tenantSuperAdminEmail: users.email,
  //     tenantSuperAdminPassword: users.hashedPassword,
  //   }
    
  //   }
  // }
  //  axios.get(`/api/tenants/${params.tenantId}`).then((res) => {
  //   console.log('first')
  //   // data = res.data;
  // }).catch((err) => {
  //   toast.error("something went wrong");
  //   console.log(err)
  // });
  console.log(data)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6"> file</div>
    </div>
  );
};

export default TenantForm;

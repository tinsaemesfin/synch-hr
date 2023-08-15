import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/mongoDB/dbConnect";
import Tenant from "@/mongoDB/Tenant";
import User from "@/mongoDB/User";

export const POST = async (req: NextRequest) => {
  const token  = await getToken({req,raw:true})
  console.log(token)
  try {
    const { name, description,adminName,username,email,role} = await req.json();
    if (!name || !description || !adminName || !username || !email || !role) {
      return NextResponse.json({ message: "invalid Data" }, { status: 422 });
    }
    await dbConnect();
    const newTenant =  new Tenant({      
        name,
        description,      
    });
    const savedTenant = await newTenant.save()
    const hashedPassword = await bcrypt.hash(username, 10);
    const newUser = await new User({
      name:adminName,
      role,
      email,
      username,
      tenantId :newTenant._id,
      hashedPassword,
    })
    const savedUser = await newUser.save();
    

    return NextResponse.json({ newTenant },{status:201});
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  } 
};



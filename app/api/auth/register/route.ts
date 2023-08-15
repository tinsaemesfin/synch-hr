import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/mongoDB/dbConnect";
import User from "@/mongoDB/User";
// import { ObjectId } from "bson";
import mongoose, { isValidObjectId } from "mongoose";
import {ObjectId as objectId} from "mongodb";
import Tenant from "@/mongoDB/Tenant";

export const POST = async (req: Request) => {
  console.log("post register");
  try {
    const { name, email, password, username } = await req.json();
    if (!name || !email || !password || !username) {
      return NextResponse.json({ message: "invalid Data" }, { status: 422 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    const newUser = new Tenant({       
      name:'superAdmin',
      description:'this tenant is only for super admin',
    });
  
    const savedUser = await newUser.save();
    const iddd='64d2027de0848782ba145df6'
     const t = isValidObjectId(iddd)
    const user = await Tenant.find();
    return NextResponse.json({user }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  } finally {
  }
};

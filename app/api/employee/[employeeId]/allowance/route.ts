import { _id } from '@next-auth/mongodb-adapter';
import Allowance from "@/mongoDB/Allowance";
import CompanyAllowance from "@/mongoDB/CompanyAllowance";
import Contract from "@/mongoDB/Contract";
import dbConnect from "@/mongoDB/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'bson';

export const GET = async (
    req: NextRequest,
    { params }: { params: { employeeId: string } }
  ) => {
    
    const token = await getToken({ req });
    if (!token || !token.tenantId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!params.employeeId)
      return NextResponse.json(
        { error: "employeeId is required" },
        { status: 400 }
      );
  
    try {
      await dbConnect();
      await CompanyAllowance.find({_id: new ObjectId('60f6b8b0e6b3a1b2a4b9b3e0')});
      const employeeResponse = await Allowance.find({
        tenantId: token.tenantId,
        _employeeId: params.employeeId,
      }).populate("_companyAllowanceId").sort({ createdAt: -1 });
      if (!employeeResponse)
        return NextResponse.json(
          { error: "employee not found" },
          { status: 404 }
        );
        const sortedResponse = employeeResponse.sort((a, b) => {
          // First, compare the statusOfAllowance property
          if (a.statusOfAllowance === "Active" && b.statusOfAllowance !== "Active") {
            return -1;
          } else if (a.statusOfAllowance !== "Active" && b.statusOfAllowance === "Active") {
            return 1;
          }
      
          // If the statusOfAllowance properties are equal, compare the createdAt property
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
  
      return NextResponse.json( [...employeeResponse ], { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: e }, { status: 500 });
    }
  };
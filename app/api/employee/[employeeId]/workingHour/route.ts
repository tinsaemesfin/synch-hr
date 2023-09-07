import WorkingHour from "@/mongoDB/WorkingHour";
import dbConnect from "@/mongoDB/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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
      const employeeResponse = await WorkingHour.find({
        tenantId: token.tenantId,
        _employeeId: params.employeeId,
      }).sort({ createdAt: -1 });
      if (!employeeResponse)
        return NextResponse.json(
          { error: "employee not found" },
          { status: 404 }
        );
  
      return NextResponse.json( [...employeeResponse ], { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: e }, { status: 500 });
    }
  };
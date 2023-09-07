import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/mongoDB/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Employee from "@/mongoDB/Employee";
import { getServerSession } from "next-auth";
import { _id } from "@next-auth/mongodb-adapter";

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
    const employeeResponse = await Employee.findOne({
      tenantId: token.tenantId,
      _id: params.employeeId,
    });
    if (!employeeResponse)
      return NextResponse.json(
        { error: "employee not found" },
        { status: 404 }
      );

    return NextResponse.json({ ...employeeResponse }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) => {
  const token = await getToken({ req });
  const body = await req.json();
    const { bankName, bankNumber } = body;
  if (!token || !token.tenantId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!params.employeeId)
    return NextResponse.json(
      { error: "employeeId is required" },
      { status: 400 }
    );
    console.log(bankName)

  try {
    await dbConnect();
    const employeeResponse = await Employee.findOneAndUpdate({
      tenantId: token.tenantId,
      _id: params.employeeId,
    },{
      bankName,
      bankNumber
    });
    if (!employeeResponse)
      return NextResponse.json(
        { error: "employee not Updated" },
        { status: 404 }
      );

    return NextResponse.json({ ...employeeResponse }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

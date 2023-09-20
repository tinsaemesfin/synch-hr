import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import dbConnect from "@/mongoDB/dbConnect";
import Tenant from "@/mongoDB/Tenant";

interface IParams {
  tenantId: string;
}
export const GET = async (
  req: Request,
  { params }: { params: IParams }
) => {
    const { tenantId } = params;

  try {
    
    if (!tenantId) {
      return NextResponse.json({ message: "invalid Data" }, { status: 422 });
    }
    dbConnect()
    const tenant = await Tenant.findOne({      
    _id: tenantId,      
    });
    return NextResponse.json({ tenant }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    console.log("nothing");
  }
};

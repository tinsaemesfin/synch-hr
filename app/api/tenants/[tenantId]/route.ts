import { NextResponse } from "next/server";
import prismadb from "@/Prisma";
import { getSession } from "next-auth/react";

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
    const tenant = await prismadb.tenant.findUnique({
      where: {
        id: tenantId,
      },
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

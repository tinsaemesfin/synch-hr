import prismadb from "@/Prisma";
import { connectToDatabase } from "@/libs/server-helpers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name, description} = await req.json();
    if (!name || !description) {
      return NextResponse.json({ message: "invalid Data" }, { status: 422 });
    }
    await connectToDatabase();
    const newTenant = await prismadb.tenant.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json({ newTenant },{status:201});
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
};

import prismadb from "@/Prisma";
import { connectToDatabase } from "@/libs/server-helpers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name, email, password, username } = await req.json();
    if (!name || !email || !password || !username) {
      return NextResponse.json({ message: "invalid Data" }, { status: 422 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const newUser = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        username,
        role: "superAdmin",
        tenantId: '64d2210a1be452ef56c8eb6c',
      },
    });
    return NextResponse.json({ newUser },{status:201});
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
};

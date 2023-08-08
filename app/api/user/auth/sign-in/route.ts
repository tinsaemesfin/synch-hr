import  bcrypt from 'bcrypt';
import prismadb from '@/Prisma';
import { connectToDatabase } from '@/libs/server-helpers';
import { NextResponse } from 'next/server';


export const GET = async (req: Request) => {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
        return NextResponse.json({ message: "invalid Data" }, { status: 422 });
        }
        await connectToDatabase();
        const user = await prismadb.user.findFirst({
        where: {
            username,
        },
        });
        if (!user) {
        return NextResponse.json({ message: "invalid Data" }, { status: 422 });
        }
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (!match) {
        return NextResponse.json({ message: "invalid Auth Data" }, { status: 422 });
        }
        return NextResponse.json({ user });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    } finally {
        await prismadb.$disconnect();
    }
    }
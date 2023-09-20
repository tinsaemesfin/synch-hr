import User from '@/mongoDB/User';
import dbConnect from '@/mongoDB/dbConnect';
import  bcrypt from 'bcrypt';

import { NextResponse } from 'next/server';


export const GET = async (req: Request) => {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
        return NextResponse.json({ message: "invalid Data" }, { status: 422 });
        }
        await dbConnect();
        const user = await User.findOne({       
            username:username,       
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
    }
    }
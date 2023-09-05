import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';
import dbConnect from "@/mongoDB/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Employee from '@/mongoDB/Employee';
import { getServerSession } from 'next-auth';

export const GET = async (req: NextRequest) => {  
    // console.log(req)  
    const token = await getToken({req});
    // console.log(token)
    if(!token) return NextResponse.json({error:"Unauthorized"}, {status:401});
    // console.log(token.tenantId);
    

    try {
        await dbConnect();
        const employee = await Employee.find({tenantId:token.tenantId});
       return NextResponse.json({employee},{status:200})
    } catch (e) {
        console.log(e);
        return NextResponse.json({error:e},{status:500})
    }
    }
import { getToken } from 'next-auth/jwt';
import dbConnect from "@/mongoDB/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Employee from '@/mongoDB/Employee';

export const GET = async (req: NextRequest) => {    
    const token = await getToken({req})

    try {
        await dbConnect();
        const employee = await Employee.find({tenantId:token?.tenantId});
        NextResponse.json({employee},{status:200})
    } catch (e) {
        console.log(e);
        return NextResponse.json({error:e},{status:500})
    }
    }
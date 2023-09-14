import AttendanceDetails from "@/mongoDB/AttendanceDetails";
import Employee from "@/mongoDB/Employee";
import EmployeeLeave from "@/mongoDB/EmployeeLeave";
import Permission from "@/mongoDB/Permission";
import dbConnect from "@/mongoDB/dbConnect";
import { statusOfEmployeeLeave } from "@/types/employeeLeave";
import { statusOfEmployeePermission } from "@/types/permission";
import { getToken } from "next-auth/jwt";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { employeeId: string } }
  ) => {
    
    console.log(req.nextUrl.searchParams.get('from'))
    
    const token = await getToken({ req });
    // @ts-ignore
    const startDay = req.nextUrl.searchParams.get('from') ? new Date(req.nextUrl.searchParams.get('from')) : null;
    // @ts-ignore
    const endDate = req.nextUrl.searchParams.get('to') ? new Date(req.nextUrl.searchParams.get('to')) : null;

    
    // const { startDay, endDate,withPenalty } = body;
    // console.log('body')
    if (!token || !token.tenantId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!params.employeeId)
      return NextResponse.json(
        { error: "employeeId is required" },
        { status: 400 }
      );
      if(!startDay || !endDate)
      {
        return NextResponse.json(
          { error: "startDay and endDate is required" },
          { status: 400 }
        );
      }
  
    try {
      console.log('TM')
      await dbConnect();
      const employeeResponse = await Employee.findOne({
        _id:params.employeeId
      });
      if(!employeeResponse)
      {
        return NextResponse.json(
          { error: "employee not found in the Database" },
          { status: 404 }
        );
      }
      const iD = new Date(startDay).getTime() - 5259600000 ;
      const eD = new Date(endDate).getTime() + 5259600000 ;
  
      const attendanceResponse = await AttendanceDetails.find({
        tenantId: token.tenantId,
        employeeAttendanceId: employeeResponse.employeeAttendanceId,
        monthYear: {
          $gte: new Date(iD).toISOString(),
          $lte: new Date(eD).toISOString(),          
        },
      }).sort({ createdAt: -1 });
      const permissionResponse = await Permission.find({
        tenantId: token.tenantId,
        _employeeId: employeeResponse._id,
       'date.from' : { $gte: new Date(iD).toISOString(), $lte: new Date(eD).toISOString() },
          'data.to': { $gte: new Date(iD).toISOString(), $lte: new Date(eD).toISOString() },
          statusOfPermission:statusOfEmployeePermission.Approved        
      });
      const employeeLeaveResponse = await EmployeeLeave.find({
        tenantId: token.tenantId,
        _employeeId: employeeResponse._id,
       'date.from' : { $gte: new Date(iD).toISOString(), $lte: new Date(eD).toISOString() },
          'data.to': { $gte: new Date(iD).toISOString(), $lte: new Date(eD).toISOString() },
          statusOfLeave:statusOfEmployeeLeave.Approved        
      })

      if (!attendanceResponse)
        return NextResponse.json(
          { error: "Attendance not found" },
          { status: 404 }
        );
  
      return NextResponse.json({employee:employeeResponse,attendance:attendanceResponse,employeeLeaveResponse,permissionResponse}, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: e }, { status: 500 });
    }
  };
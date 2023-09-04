import React from "react";
import Employee from "@/mongoDB/Employee";
import EmployeeClient from "./components/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { EmployeeColumn } from "./components/column";
import dbConnect from "@/mongoDB/dbConnect";

const EmployeePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const page = searchParams['page'] ??'1';
    const per_page = searchParams['per_page'] ??'10';
    const start = (Number(page)-1)*Number(per_page);
    const end = start+Number(per_page);
    const NPerPage = Number(per_page);

  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  await dbConnect();
  const employees = await Employee.find({
    tenantId:session.user.tenantId
  }).select({
    _id: 1,
    fullName: 1,
    employedDate: 1,
    statusOfEmployee: 1,
    phoneNumber: 1,    
  }).sort({
    employedDate:'desc'
  }).limit(NPerPage).skip(start);

  console.log('employees', employees.length)
  
  const formattedEmployees:EmployeeColumn[]=employees.map((employee)=>(
    {
        id:String(employee._id),
        fullName:employee.fullName,
        employedDate:employee.employedDate,
        statusOfEmployee:employee.statusOfEmployee,
        phoneNumber:employee.phoneNumber.primaryPhone,
    }
  ));
  return (
    <>
      <EmployeeClient data={formattedEmployees}  />
    </>
  );
};

export default EmployeePage;

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Employee from "@/mongoDB/Employee";
import dbConnect from "@/mongoDB/dbConnect";
import { getServerSession } from "next-auth";
import React from "react";
import { Profile } from "./(tabs)/(profile)/profile";
import { IEmployee } from "@/types/employee";
import axios, { AxiosResponse } from "axios";
import {cookies} from 'next/headers'

const page = async ({ params }: { params: { employeeId: string } }) => {
  let employee: IEmployee | null = null;
  
  try {
    await dbConnect();
    const cookieStore = cookies()
  const token = cookieStore.get('next-auth.session-token')
  if(!token) return null

    // FIXME :  JUST FOR MAKING EASY FOR CHECKING
    const employeeResponse : AxiosResponse = await axios.get(`${process.env.BASE_URL}/api/employee/${params.employeeId}`,{
      headers:{Authorization:'Bearer '+ token.value}
    });
    employeeResponse.status === 200 && (employee = employeeResponse.data._doc) 

    
    // make an axios request to get the employee data
    // use axios its a must

  } catch (error) {
    console.log('ERRRORRR');
  }
  if(!employee) return new Error('Employee not found');

  return (
    <div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-normal">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="workingHour">WorkingHour</TabsTrigger>
          <TabsTrigger value="overtime">Overtime</TabsTrigger>
          <TabsTrigger value="allowance">Allowance</TabsTrigger>
          <TabsTrigger value="otForm">Ot-Form</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leaveAndPermission">
            Leave and Permission
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile employee={employee} />
       
        </TabsContent>
        <TabsContent value="contract">Contract.</TabsContent>
        <TabsContent value="workingHour">Working Hour.</TabsContent>
        <TabsContent value="overtime">OverTime.</TabsContent>
        <TabsContent value="allowance">Allowance.</TabsContent>
        <TabsContent value="otForm">OtForm.</TabsContent>
        <TabsContent value="attendance">Attendance</TabsContent>
        <TabsContent value="leaveAndPermission">
          Leave and Permission
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
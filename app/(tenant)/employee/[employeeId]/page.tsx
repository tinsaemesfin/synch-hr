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
import { create } from "zustand";
import { useAnEmployee } from "@/state/useEmployee";
import { Contract } from "./(tabs)/(contract)/contract";
import { WorkingHour } from "./(tabs)/(workingHour)/workingHour";
import { Overtime } from "./(tabs)/(overtime)/overtime";
import { Allowance } from "./(tabs)/(allowance)/allowance";
import Attendance from "./(tabs)/(attendance)/attendance";
import Table from "./(tabs)/(attendance)/test";


const Page = async ({ params }: { params: { employeeId: string } }) => {
  let employee: IEmployee | null = null;
  let token :string|undefined='kjiuyugyugyugygyuhugiu' ;
  const cookieStore =  cookies()
  // const rawToken = cookieStore.get('__Secure-next-auth.session-token');
  const rawToken = cookieStore.get('next-auth.session-token');
  
  token = rawToken?.value
  if(!token) return null


  
  try {
    await dbConnect();  

    // FIXME :  JUST FOR MAKING EASY FOR CHECKING
    const employeeResponse : AxiosResponse = await axios.get(`${process.env.BASE_URL}/api/employee/${params.employeeId}`,{
      headers:{Authorization:'Bearer '+ token}
    });
    employeeResponse.status === 200 && (employee = employeeResponse.data._doc) 
    

    
    // make an axios request to get the employee data
    // use axios its a must

  } catch (error) {
    console.log('Error In page employee/[employeeId] ');
    console.log(error)
  }
  if(!employee||!token) return new Error('Employee not found');

  

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
          <Profile employee={employee} token={token} />       
        </TabsContent>
        <TabsContent value="contract">
          <Contract employee={employee} token={token} />
        </TabsContent>
        <TabsContent value="workingHour">
          <WorkingHour employee={employee} token={token} />
           </TabsContent>
        <TabsContent value="overtime"> <Overtime employee={employee} token={token} /> </TabsContent>
        <TabsContent value="allowance"><Allowance employee={employee} token={token} /> </TabsContent>
        <TabsContent value="otForm">OtForm.<Table /></TabsContent>
        <TabsContent value="attendance"><Attendance employee={employee} token={token} /></TabsContent>
        <TabsContent value="leaveAndPermission">
          Leave and Permission
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

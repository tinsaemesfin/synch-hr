import { IEmployee, activeOvertime } from "@/types/employee";
import { PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAnEmployee } from "@/state/useEmployee";
import { useStore } from "@/state/useExample";
import axios from "axios";
import dbConnect from "@/mongoDB/dbConnect";
import { IAllowance } from "@/types/allowance";
import { ICompanyAllowance } from "@/types/companyAllowance";

interface IProps {
  employee: IEmployee;
  token: string;
}
export const Allowance: React.FC<IProps> = async ({ employee, token }) => {
  let allowance: IAllowance[] | null = null;

  try {
    await dbConnect();
    const response = await axios.get(`${process.env.BASE_URL}/api/employee/${employee._id}/allowance`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 200 && response.data.length > 0) {
      allowance = [...response.data];
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching allowance");
  }

  if (!allowance || allowance.length === 0) return <div>allowance not found</div>;
 
  //
  return (
    <>
      <div>
        <ul role="list" className="-mb-8">
          {allowance.map((allowance, i) => {
            // @ts-ignore
            const companyAllowance:ICompanyAllowance =  allowance._companyAllowanceId ;
            
           return( <div
              className="bg-white shadow overflow-hidden sm:rounded-lg mt-10"
              key={i}
            >
               
              <div className="border-t border-gray-200 shadow-md">
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-6">
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Name
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {companyAllowance.name}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Allowance Frequency
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {companyAllowance.frequency}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Status
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {allowance.statusOfAllowance}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Created On
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {allowance.createdAt && new Date(allowance.createdAt).toDateString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Amount
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      { 
                      allowance.amount.$numberDecimal}
                    </div>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      IsNet?
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {allowance.isNet ? "Yes" : "No"}
                    </div>
                  </div>                  
                </div>
              </div>
            </div>
          )})}
        </ul>
      </div>
    </>
  );
};

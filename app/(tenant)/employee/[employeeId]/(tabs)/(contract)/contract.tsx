import { IContract } from "@/types/contract";
import { IEmployee, activeOvertime } from "@/types/employee";
import { IOvertime } from "@/types/overTime";
import { PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import UpdateBankAlertDialog from "./(UpdateDialogs)/updateBankAlertDialog";
import { useAnEmployee } from "@/state/useEmployee";
import { useStore } from "@/state/useExample";
import axios from "axios";
import dbConnect from "@/mongoDB/dbConnect";

interface IProps {
  employee: IEmployee;
  token: string;
}
export const Contract: React.FC<IProps> = async ({ employee, token }) => {
  let contract: IContract[] | null = null;

  try {
    await dbConnect();
    const response = await axios.get(`${process.env.BASE_URL}/api/employee/${employee._id}/contract`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 200 && response.data.length > 0) {
      contract = [...response.data];
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching contract");
  }

  if (!contract || contract.length === 0) return <div>Contract not found</div>;
  //
  return (
    <>
      <div>
        <ul role="list" className="-mb-8">
          {contract.map((contract, i) => (
            <div
              className="bg-white shadow overflow-hidden sm:rounded-lg mt-10"
              key={i}
            >
              <div className="border-t border-gray-200">
                <div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Status
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contract.statusOfContract}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Contract Starts
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(contract.startsFrom).toDateString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Contract Until
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contract.endsOn
                        ? new Date(contract.endsOn).toDateString()
                        : "-"}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Type Of Contract
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contract.typeOfContract}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Type Of Employee
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contract.permanentOrContract}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Department
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contract.department}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Salary
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {String(contract.grossSalary.$numberDecimal)} ETB{" "}
                      {contract.rateOfSalary}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Title of position
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {contract.titleOfPosition}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

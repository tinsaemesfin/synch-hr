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
export const Overtime: React.FC<IProps> = async ({ employee, token }) => {
  let overtime: IOvertime[] | null = null;

  try {
    await dbConnect();
    const response = await axios.get(
      `${process.env.BASE_URL}/api/employee/${employee._id}/overtime`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (response.status === 200 && response.data.length > 0) {
      overtime = [...response.data];
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching overtime");
  }

  if (!overtime || overtime.length === 0) return <div>Overtime not found</div>;

  console.log(overtime);
  //
  return (
    <>
      <div>
        <ul role="list" className="-mb-8">
          {overtime.map((ot, i) => (
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
                      {ot.statusOfOvertime}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Created On
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {ot.createdAt && new Date(ot.createdAt).toDateString()}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-1 sm:px-6">
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-500">
                        Before 10 Pm
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ot.before10Pm.$numberDecimal}
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-500">
                        After 10 Pm
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ot.after10Pm.$numberDecimal}
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-500">
                        Weekend
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ot.weekend.$numberDecimal}
                      </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-500">
                        Holyday
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {ot.holyday.$numberDecimal}
                      </div>
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

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
import { IWorkingHour } from "@/types/workingHour";

interface IProps {
  employee: IEmployee;
  token: string;
}
export const WorkingHour: React.FC<IProps> = async ({ employee, token }) => {
  let workingHour: IWorkingHour[] | null = null;

  try {
    await dbConnect();
    const response = await axios.get(
      `${process.env.BASE_URL}/api/employee/${employee._id}/workingHour`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (response.status === 200 && response.data.length > 0) {
      workingHour = [...response.data];
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error in fetching WorkingHour");
  }

  if (!workingHour || workingHour.length === 0)
    return <div>Working Hour not found</div>;

  //
  return (
    <>
      <div>
        <ul role="list" className="-mb-8">
          {workingHour.map((workingHour, i) => (
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
                      {workingHour.statusOfWorkingHour}
                    </div>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Working Hour Starts
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {workingHour.createdAt &&
                        new Date(workingHour.createdAt).toISOString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="text-sm font-medium text-gray-500">
                      Does Employee Have Known Night Shifts)
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {workingHour.haveOverNightShift ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-1 sm:px-6"
                      >
                  {Object.keys(workingHour.workingHourTime).map(function (day) {
                    return (
                      <div
                        key={day}
                        className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <div className="text-sm font-medium text-gray-500">
                          {day}
                        </div>
                        <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {
                            // @ts-ignore

                            workingHour.workingHourTime[day]
                          }
                          <br />
                        </div>
                      </div>
                    );
                  })}
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

"use client";

import UploadAttendanceButton from "@/app/(tenant)/attendance/components/uploadAttendance";
import LoadingModel from "@/components/modals/loading-Model";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAttendanceDetails } from "@/types/attendanceDetails";
import { IEmployee } from "@/types/employee";
import { IEmployeeLeave } from "@/types/employeeLeave";
import { IPermission } from "@/types/permission";
import axios, { AxiosResponse } from "axios";
import { CldUploadWidget } from "next-cloudinary";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import AttendaceList from "./attendaceList";
interface IProps {
  employee: IEmployee;
  token: string;
}
export interface IattendaceEmployee {
  employee: IEmployee;
  attendance: IAttendanceDetails[] | [];
  permissionResponse:IPermission[]|[];
  employeeLeaveResponse:IEmployeeLeave[]|[]
}

const Attendance: React.FC<IProps> = ({ employee, token }) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [withPenality, setWithPenality] = React.useState<boolean>(false);
  const [attendance, setAttendance] = React.useState<
  IattendaceEmployee | undefined
  >();
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (date?.to && date?.from) {
        try {
          const getAttendance = async () => {
            setLoading(true);
            const attendaceResponse: AxiosResponse = await axios.get(
              `/api/employee/${employee._id}/attendance`,
              {
                headers: { Authorization: "Bearer " + token },
                params: {
                  from: date.from,
                  to: date.to,
                  withPenalty: withPenality, // fixed typo
                },
              }
            );
            setLoading(false);
            console.log(attendaceResponse)
            attendaceResponse.status === 200 &&
              setAttendance(attendaceResponse.data);
          };
          getAttendance();
          console.log(attendance) // call the function
        } catch (error) {
          setLoading(false);
          console.log(error);
          throw new Error("Error in fetching Attendance");
        }
      }
    })();
    // 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, withPenality, employee._id, token]); // added missing dependencies

  const renderTableHeader = () => {
    let headers = [];
    if (!date?.from || !date?.to) return null;
    let loopDate = new Date(date?.from);
    let index = 0;
    while (loopDate <= date?.to) {
      headers.push(
        <TableHead key={index}>{loopDate.toDateString()}</TableHead>
      );
      loopDate.setDate(loopDate.getDate() + 1);
      ++index;
    }
    return headers;
  };
  if(loading)
  return <LoadingModel />

  return (
    <div className="flow-root">
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
          <h1 className="text-lg font-semibold text-gray-900">
            <time dateTime="2022-01">
              {new Date().toLocaleString("en-us", { month: "long" }) + " 2023"}
            </time>
          </h1>
          <Switch
            checked={withPenality}
            onChange={() => setWithPenality(!withPenality)}
          />
          <div className="flex items-center">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </header>
        {attendance && date && date.from && date.to && attendance?.attendance?.length < 0 && (
              <h1>Could not found attendance Details</h1>
            )}

        {attendance && attendance?.attendance?.length > 0 &&  date && date.from && date.to && (
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            
            <Table>
              <TableCaption>
                Employee Attendance from {date?.from?.toDateString()} to{" "}
                {date?.to?.toDateString()}
              </TableCaption>
              <TableHeader>
                <TableRow>{renderTableHeader()}</TableRow>
              </TableHeader>
              <TableBody>
    <TableRow>
      {AttendaceList(date,attendance)}
    </TableRow>
  </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;

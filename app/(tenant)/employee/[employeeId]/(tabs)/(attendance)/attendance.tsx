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
import React, { useEffect, useRef } from "react";
import { DateRange } from "react-day-picker";
import AttendaceList from "./attendaceList";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import autoTable, {
  CellWidthType,
  OverflowType,
  Styles,
} from "jspdf-autotable";
interface IProps {
  employee: IEmployee;
  token: string;
}
export interface IattendaceEmployee {
  employee: IEmployee;
  attendance: IAttendanceDetails[] | [];
  permissionResponse: IPermission[] | [];
  employeeLeaveResponse: IEmployeeLeave[] | [];
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
  const [ReadyData, setReadyData] = React.useState();
  const [MyReactNode, setMyReactNode] = React.useState<
    React.ReactNode[] | null
  >(null);
  const pdfRef = useRef(null);

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

            attendaceResponse.status === 200 &&
              setAttendance(attendaceResponse.data);
          };
          getAttendance();
          // call the function
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

  useEffect(() => {
    if (attendance && date && date.from && date.to) {
      setMyReactNode(AttendaceList(date, attendance));
    }
  }, [attendance, date]);

  if (loading) return <LoadingModel />;

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

          <ReactToPrint
            bodyClass="print-agreement"
            content={() => pdfRef.current}
            trigger={() => (
              <Button
                disabled={
                  attendance &&
                  attendance?.attendance?.length > 0 &&
                  date &&
                  date.from &&
                  date.to
                    ? false
                    : true
                }
              >
                {" "}
                Download Pdf{" "}
              </Button>
            )}
          />

          <div className="flex items-center">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </header>
        {attendance &&
          date &&
          date.from &&
          date.to &&
          attendance?.attendance?.length < 0 && (
            <h1>Could not found attendance Details</h1>
          )}

        <div
          ref={pdfRef}
          id="ToSavePdf"
          className="max-w-96 mx-auto  pt-10 pb-10 "
        >
          <h1 className="print:block hidden text-center">
            {employee.fullName}
          </h1>
          <h1 className="print:block hidden text-center">{`From - ${date?.from?.toDateString()} To - ${date?.to?.toDateString()}`}</h1>
          <div className="flex flex-wrap">
            {MyReactNode === null ? (
              <div>No Attendance Data Found</div>
            ) : (
              MyReactNode.map((node, index) => <>{node}</>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

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
import jsPDF from "jspdf";
import autoTable, { CellWidthType, OverflowType, Styles } from "jspdf-autotable";
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

  useEffect(() => {}, [attendance]);

  const downloadPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Employee Attendance";
    const pdfHeaders: number[] = [1, 2];
    const pdfBody: string[] = [];
    for (let i = 3; i < 33; i++) {
      pdfHeaders.push(i);
    }
    for (let i = 0; i < 30; i++) {
      let temp: string = i + " Date";
      pdfBody.push(temp);
    }

    const pdfData = attendance?.attendance;
    let content = {
      startY: 50,
      head: [pdfHeaders],
      body: [pdfBody],
    };
    doc.text(title, marginLeft, 100);
    let attendaceLength = 50;
    const columnStyles:Record<number, { cellWidth: CellWidthType, overflow :OverflowType}> = {};
    console.log(attendaceLength)
    for (let i = 0; i < attendaceLength; i++) {
      columnStyles[i] = { cellWidth: "wrap", overflow:'linebreak'  };
    }
  

    // autoTable(doc, content);
    console.log(columnStyles)
    autoTable(doc, { html: "#attendanceTable", columnStyles:{...columnStyles},rowPageBreak:'auto',styles:{overflow:'linebreak', minCellHeight:40, minCellWidth:90,}});

    doc.save("attendaceReport.pdf");

    console.log("download pdf");
  };

  const renderTableHeader = (isForDownload = false) => {
    if (!date?.from || !date?.to) return null;

    if (isForDownload) {
      let headers = [];
      let loopDate = new Date(date?.from);
      let index = 0;
      while (loopDate <= date?.to) {
        headers.push(loopDate.toDateString());
        loopDate.setDate(loopDate.getDate() + 1);
        ++index;
      }
      
      return headers;
    }

    let headers = [];
    let loopDate = new Date(date?.from);
    let index = 0;
    while (loopDate <= date?.to) {
      headers.push(
        <TableHead key={index} className="whitespace-nowrap">{loopDate.toDateString()}</TableHead>
      );
      loopDate.setDate(loopDate.getDate() + 1);
      ++index;
    }
    headers.push(<TableHead key={index+1} className="whitespace-nowrap">{'Total '}</TableHead>)
    return headers;
  };
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
            onClick={downloadPdf}
          >
            {" "}
            Download Pdf{" "}
          </Button>
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

        {attendance &&
          attendance?.attendance?.length > 0 &&
          date &&
          date.from &&
          date.to && (
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table id="attendanceTable" className="table-auto">
                <TableCaption>
                  Employee Attendance from {date?.from?.toDateString()} to{" "}
                  {date?.to?.toDateString()}
                </TableCaption>
                <TableHeader>
                  <TableRow>{renderTableHeader()}</TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>{AttendaceList(date, attendance)}</TableRow>
                </TableBody>
              </Table>
            </div>
          )}
      </div>
    </div>
  );
};

export default Attendance;

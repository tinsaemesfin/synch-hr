import dbConnect from "@/mongoDB/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import * as fsPromise from "fs/promises";

// import { writeFile } from "fs/promises";
import UploadedFile from "@/mongoDB/UploadedFile";
import { ObjectId } from "bson";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { readFile } from "fs";

import AttendanceDetails from "@/mongoDB/AttendanceDetails";
import axios, { AxiosResponse } from "axios";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const { fileUrl, toWhat } = await req.json();

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthenticated" });
  }
  if (!fileUrl) {
    return NextResponse.json({ success: false });
  }
  

  try {
    await dbConnect();
    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const newFile = new UploadedFile({
      url: fileUrl,
      toWhat,
      tenantId: new ObjectId(session.user.tenantId),
    });
    console.log("newFile", newFile);
    const SavedFile = await newFile.save();
    console.log("SavedFile%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    const SavedAttendanceResponse = await saveAttendanceToEmployee(
      newFile.url,
      session
    );

    return NextResponse.json({ SavedAttendanceResponse }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 501 });
  }
};

const saveAttendanceToEmployee = async (filUrl: string, session: Session) => {
  const fileData: AxiosResponse = await axios.get(filUrl);
  //  console.log(fileData.data)
  //  const fileData=  await fsPromise.readlink(filUrl,'utf-8');
  const FinalizedData: {
    empId: number;
    monthYear: Date;
    timeSheet: { [key: number]: Date[] };
  }[] = [];

  const updatedArray: { id: number; monthYear: Date; time: Date }[] = [];
  const sortedByMonthYear: { id: number; monthYear: Date; time: Date[] }[] = [];

  let arrayD = fileData.data.split(/\r?\n/);
  const gg = Object.entries(arrayD)[10];
  // console.log(typeof valuess);
  //   for (const [key, line] of Object.entries(arrayD)) {
  //   console.log(typeof value);
  // }

  //   return;

  // arrayD.forEach((line, index) => {
  for (const [keyOfAD, lineOfAD] of Object.entries(arrayD)) {
    const index = Number(keyOfAD);
    const line = String(lineOfAD);
    if (index == 0) {
      if (line) {
        let lineArray = line.split(/\r?\t/);
        if (
          !(
            lineArray[0] == "ID" &&
            lineArray[1] == "Name" &&
            lineArray[2] == "Department" &&
            lineArray[3] == "Time"
          )
        ) {
          return { error: "unsupported Format" };
        }
      }
    } else if (index != 0) {
      if (line) {
        let lineArray = line.split(/\r?\t/);
        let empId = Number(lineArray[0]);
        let dateTime = lineArray[3].split("     ");
        let date = dateTime[0].trim();
        const Ddate = new Date(date);
        const selectedMonth = new Date(Ddate).getMonth() + 1;
        const selectedYear = new Date(Ddate).getFullYear();
        const selectedDate = new Date(Ddate).getDate();

        let monthYear = new Date(selectedYear, selectedMonth - 1, 1, 12);
        let time = dateTime[1];

        let UpdatedTime = time.split(":");
        let hourTime = new Date(
          selectedYear,
          selectedMonth - 1,
          selectedDate,
          Number(UpdatedTime[0]),
          Number(UpdatedTime[1]),
          Number(UpdatedTime[2])
        );
        updatedArray.push({ id: empId, monthYear, time: hourTime });
      }
    }
  }

  updatedArray.forEach((updatedArray, index) => {
    if (sortedByMonthYear.length === 0) {
      sortedByMonthYear.push({
        id: updatedArray.id,
        monthYear: updatedArray.monthYear,
        time: [updatedArray.time],
      });
    } else {
      let found =false;
      sortedByMonthYear.forEach((sorted, index) => {
        // console.log({index,id:sorted.id +' '+ updatedArray.id,monthYear:new Date(sorted.monthYear).getTime()+' '+new Date(updatedArray.monthYear).getTime()})
        if (
          Number(sorted.id) == Number(updatedArray.id) &&
          new Date(sorted.monthYear).getTime() == new Date(updatedArray.monthYear).getTime()
        ) {
          found=true;
          console.log("got the Date");
          const duplicate = sorted.time.find(
            (time) => new Date(time).getTime() === new Date(updatedArray.time).getTime()
          );
          if (!duplicate) {
            sortedByMonthYear[index].time = [
              ...sortedByMonthYear[index].time,
              updatedArray.time,
            ];
            return;
            
          }          
        } 
      });
      if(!found)
      {        
          sortedByMonthYear.push({
            id: updatedArray.id,
            monthYear: updatedArray.monthYear,
            time: [updatedArray.time],
          });         
        
      }
    }
  });

  // console.log(sortedByMonthYear);
  // );

  // updatedArray.forEach((line, index) => {
  //   let searchedObj:{id: number, monthYear:Date, time: Date}|undefined = sortedByMonthYear.find(
  //     (o:{id: number, monthYear:Date, time: Date[] },index:number) =>{
  //       if(o.id === line.id && o.monthYear === line.monthYear)
  //       return {...o,index}
  //     });
  //   if(searchedObj){
  //     const duplicate = searchedObj.time.find((time)=>time===line.time);
  //     if(!duplicate){
  //       sortedByMonthYear[searchedObj.index].time = [...sortedByMonthYear[searchedObj.index].time,line.time]
  //     }
  //   }
  //   else (!searchedObj) {
  //     let arrayOfSameEmployeeMonthYear:{id: number, monthYear:Date, time: Date }[] = updatedArray.filter(function (data) {
  //       return data.id === line.id && data.monthYear === line.monthYear;
  //     });
  //     arrayOfSameEmployeeMonthYear &&
  //       sortedByMonthYear.push(arrayOfSameEmployeeMonthYear);
  //   }
  // });
  // console.log(sortedByMonthYear)

  sortedByMonthYear.forEach((data, index) => {
    let employeeOnaMonth;
    let empId = data.id;
    let monthYear = data.monthYear;
    let timeSheet:{[key:number]:Date[]}=[];

    data.time.forEach((time, index) => {
      const valueMonth = new Date(time).getMonth() + 1;
      const valueYear = new Date(time).getFullYear();
      const valueDate = new Date(time).getDate();

      let dateOfFingerPrint = new Date(time);
      if (Object.hasOwnProperty.bind(timeSheet)(valueDate)) {
        timeSheet = {
          ...timeSheet,
          [valueDate]: [
            ...timeSheet[valueDate],
             dateOfFingerPrint,
          ],
        };
      } else {
        timeSheet = {
          ...timeSheet,
          [valueDate]: [dateOfFingerPrint],
        };
      }
    });

    FinalizedData.push({ empId, monthYear, timeSheet });
  });

  if (!sortedByMonthYear) return null;
  const errorData: {
    empId: number;
    monthYear: Date;
    timeSheet: { [key: number]: Date[] };
  }[] = [];
  const successData: {
    empId: number;
    monthYear: Date;
    timeSheet: { [key: number]: Date[] };
  }[] = [];

  // console.log(FinalizedData)
  // FIXME: HERE THERE IS A RUN TIME ERROR CHECK IF EVERY DETAILED IS SAVED SUCESSFULLY


  FinalizedData.forEach(async (data, index) => {
    try {
      const foundAttendance = await AttendanceDetails.findOne({
        employeeAttendanceId: data.empId,
        monthYear:new Date(data.monthYear),
        tenantId: new ObjectId(session.user.tenantId),
      });
      if (foundAttendance) {
        const merged: { [key: number]: Date[] } = {};

        for (const keyString of Object.keys(foundAttendance.timeSheet)) {
          const key = parseInt(keyString);
          const datesA = foundAttendance.timeSheet[key];
          const datesB = data.timeSheet[key] || [];
          const mergedSet = new Set([...datesA, ...datesB]);
          const mergedArray = Array.from(mergedSet);
          merged[key] = mergedArray;
        }

        for (const keyString of Object.keys(data.timeSheet)) {
          const key = parseInt(keyString);
          if (!foundAttendance.timeSheet[key]) {
            const datesB = data.timeSheet[key];
            const mergedSet = new Set([...datesB]);
            const mergedArray = Array.from(mergedSet);
            merged[key] = mergedArray;
          }
        }

        // const toUpdateTimeSheet = { ...foundAttendance, timeSheet: merged };

        await AttendanceDetails.findByIdAndUpdate(foundAttendance._id, {
          timeSheet: merged,
        });
      } else {
        const selectedMonth = new Date(data.monthYear).getMonth() + 1;
        const selectedYear = new Date(data.monthYear).getFullYear();
        const numberOfDays = new Date(selectedYear, selectedMonth, 0).getDate();
        for (const keyString of Object.keys(data.timeSheet)) {
          const key = parseInt(keyString);
          const array = data.timeSheet[key];
          const set = new Set(array);
          const newArray = Array.from(set);
          data.timeSheet[key] = newArray;
        }

        const newAttendance = new AttendanceDetails({
          employeeAttendanceId: data.empId,
          monthYear: new Date(data.monthYear),
          timeSheet: data.timeSheet,
          numberOfDays: numberOfDays,
          tenantId: new ObjectId(session.user.tenantId),
        });
        await newAttendance.save();
      }

      successData.push(data);
    } catch (error) {
      console.log(error);
      errorData.push(data);
    }
  });

  return { successData, errorData, sortedByMonthYear,updatedArray,FinalizedData};
};


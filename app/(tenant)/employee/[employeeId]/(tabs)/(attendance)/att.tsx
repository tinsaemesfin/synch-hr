import React, { useState } from "react";
import { IattendaceEmployee } from "./attendance";
import { DateRange } from "react-day-picker";
import Table from "./test";
import { IContract } from "@/types/contract";
import { IWorkingHour } from "@/types/workingHour";
import { getMinMaxDates, isSameMonthYear } from "./AttendaceAlgortism";

type attendanceTypeBeforeMap = {
  attendanceTimes?: Date[];
} & (workingDay | NotWorkingDay);
type FinalizedAttendanceType = Map<Date,attendanceTypeBeforeMap >;

// type FinalizedAttendanceType = {
//     date: Date;
//     attendanceTimes?: Date[];
//     isWeekend:boolean;
//     workingDay:boolean;
//     ot?: { before10Pm?: number; after10Pm?: number,FullDayOT?: number}
//     penalty?: {
//         lateIn?: number;
//         earlyOut?: number;
//         missedPunch?: number;
//         absent?: number;
//       };
//     employeeLeave?:{
//         leaveType:string;
//         leaveId:string;
//         leaveHours:number;
//       }
//     permission?:{
//             permissionType:string;
//             permissionId:string;
//             permissionHours:number;
//         }
//   };
  
type NotWorkingDay = {
  workingDay: false;
} & weekend;

type workingDay = {
  workingDay: true;
  penalty?: {
    lateIn?: number;
    earlyOut?: number;
    missedPunch?: number;
    absent?: number;
  };
  employeeLeave?:{
    leaveType:string;
    leaveId:string;
    leaveHours:number;
  }
    permission?:{
        permissionType:string;
        permissionId:string;
        permissionHours:number;
    }
} & (weekend);
type weekend = {
  weekend: true;
  ot?: { FullDayOT?: number };
} | notWeekend ;
type notWeekend = {
  weekend: false;
  ot?: { before10Pm?: number; after10Pm?: number };
};

// type NotWorkingDayType={
//     isWorkingDay:false;
// }
// type WorkingDayType={
//     isWorkingDay:true;
//     attendanceTimes:AttendanceTimes;
// }

// type AttendanceTimes=Date[]|[]

// type workingDayType={
// isWorkingDay:true;
// }

// export const DisplayAllAttendance = (
//   employeeAttendance: IattendaceEmployee,
//   date: DateRange
// ) => {
//    let FinalizedAttendance:FinalizedAttendanceType;
//    const [AttendnaceData,setAttendnaceData] = useState<FinalizedAttendanceType>()
//   const { attendance, employee, employeeLeaveResponse, permissionResponse } =
//     employeeAttendance;
//   const workingDayHour =
//     employee.activeWorkingHour &&
//     "workingHourTime" in employee.activeWorkingHour
//       ? (employee.activeWorkingHour as IWorkingHour).workingHourTime
//       : null;
//   const activeContract =
//     employee.activeContract && "grossSalary" in employee.activeContract
//       ? (employee.activeContract as IContract)
//       : null;
//   // id employee has no working day then return null
//   if (!workingDayHour || !activeContract) return null;

//   //  if there is no attendance data found
//   if (attendance?.length < 0 || date.from == undefined || !date.to) {
//     return <div>No Attendance Data Found</div>;
//   }

//   // then there is attendance data so we will loop through date.from to date.to and check if there is attendance data for that date

//   let loopDate = new Date(date.from);
//   let index = 0;

//   while (loopDate <= date.to) {
//     const dateNum = loopDate.getDate();
//     const dayName = loopDate
//       .toLocaleString("en-us", { weekday: "long" })
//       .toLowerCase();
//     const dayNameIn = dayName + "In";
//     const dayNameOut = dayName + "Out";
//     let foundMonthYear = false;
//     const isWeekend = dayName === "saturday" || dayName === "sunday";

//     attendance.forEach((attendance) => {
//       const todaysAttendanceTimes = attendance.timeSheet[dateNum] ?? [];
//       if (isSameMonthYear(new Date(attendance.monthYear), loopDate)) {
//         foundMonthYear = true;
//         if (
//             !(
//               workingDayHour &&
//               (workingDayHour[dayNameIn as keyof typeof workingDayHour] ||
//                 workingDayHour[dayNameOut as keyof typeof workingDayHour])
//             )
//           ) {
//             if(todaysAttendanceTimes.length ===1)
//             {
                
//                 FinalizedAttendance.set(loopDate,{
//                     workingDay:false,
//                     weekend:isWeekend,
//                     attendanceTimes:todaysAttendanceTimes                    
//                 })
//             }
//             else if(todaysAttendanceTimes.length >1)
//             {
//                 const { minDate, maxDate } = getMinMaxDates(todaysAttendanceTimes);
//                 const diffInMinutes = Math.floor((maxDate.getTime() - minDate.getTime()) / (1000 * 60));
//                 const diffInHours = Math.floor(diffInMinutes / 60);
//                 const remainingMinutes = diffInMinutes % 60;
                
//                 const OtNumber = diffInHours+Number((remainingMinutes/60).toFixed(2));
//                 if(isWeekend)
//                 {
//                     FinalizedAttendance.set(loopDate,{
//                         workingDay:false,
//                         weekend:true,
//                         attendanceTimes:todaysAttendanceTimes,
//                         ot:{FullDayOT:OtNumber}
//                     })
//                 }
//                 else{
//                     FinalizedAttendance.set(loopDate,{
//                         workingDay:false,
//                         weekend:false,
//                         attendanceTimes:todaysAttendanceTimes,
//                         ot}
//                     })
//                 }
                


//             }
        
//         }
//       }
//     });
//   }

//   return <Table />;
// };

// const att = () => {
//   return (
//     <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//       <div>att</div>
//     </div>
//   );
// };

// export default att;

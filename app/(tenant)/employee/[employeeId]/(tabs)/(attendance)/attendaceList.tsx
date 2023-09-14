import { TableCell } from "@/components/ui/table";
import { IAttendanceDetails } from "@/types/attendanceDetails";
import React, { ReactComponentElement } from "react";
import { IattendaceEmployee } from "./attendance";
import { IWorkingHour } from "@/types/workingHour";
import { DateRange } from "react-day-picker";

const AttendaceList = (
  date: DateRange,
  employeeAttendance: IattendaceEmployee
) => {
  const { attendance, employee, employeeLeaveResponse, permissionResponse } =
    employeeAttendance;
  // attendaceEmployee

  let body: React.JSX.Element[] = [];
  if (!date?.from || !date?.to) return null;
  let loopDate = new Date(date?.from);
  let index = 0;

  const workingDayHour =
      employee.activeWorkingHour &&
      "workingHourTime" in employee.activeWorkingHour
        ? (employee.activeWorkingHour as IWorkingHour).workingHourTime
        : null;
        // id employee has no working day then return null
    if (!workingDayHour) return null;

  
  while (loopDate <= date?.to) {
    const dateNum = loopDate.getDate();
    const dayName = loopDate
          .toLocaleString("en-us", { weekday: "long" })
          .toLowerCase();
        const dayNameIn = dayName + "In";
        const dayNameOut = dayName + "Out";
    
    // loop through the given date range from the date picker 
    attendance.forEach((attendance) => {
      // loop through the attendance date saved in DB      
      const todaysAttendanceTimes = attendance.timeSheet[dateNum] ?? [];      
      if (isSameMonthYear(new Date(attendance.monthYear), loopDate)) {
        if (
          !(
            workingDayHour &&
            (workingDayHour[dayNameIn as keyof typeof workingDayHour] ||
              workingDayHour[dayNameOut as keyof typeof workingDayHour])
          )
        ) {
          body.push(<TableCell key={index} className="text-red-800">-------</TableCell>);
        } else if (todaysAttendanceTimes.length < 1) {
          body.push(<TableCell key={index} className="text-red-800">Absent</TableCell>);
        } else if (todaysAttendanceTimes.length === 1) {
          body.push(
            <TableCell key={index}>
              <span className="text-blue-600">
                {todaysAttendanceTimes[0].toDateString()}{" "}
              </span>{" "}
              <br />
              <span className="text-red-700">miss</span>
            </TableCell>
          );
        }
        else if(todaysAttendanceTimes.length >1)
        {
            const{minDate,maxDate} = getMinMaxDates(todaysAttendanceTimes);
            const inPenalty = calculateAttendance(workingDayHour[dayNameIn as keyof typeof workingDayHour],minDate,true);
            const outPenalty= calculateAttendance(workingDayHour[dayNameOut as keyof typeof workingDayHour],maxDate,false);

            

            body.push(
                <TableCell key={index}>
                  <span className="text-blue-600">
                    In - {minDate.getHours()}{":"}{minDate.getMinutes()}
                  </span>{" "}
                  <br />
                  {inPenalty?.penaltyTimeNumber && inPenalty?.penaltyTimeText  && inPenalty?.penaltyTimeNumber > 0 &&(
                       <span className="text-red-700">Late {' '} {inPenalty?.penaltyTimeText} </span> 
                  )}
                  <br />

<span className="text-blue-600">
                    Out - {maxDate.getHours()}{":"}{maxDate.getMinutes()}
                  </span>{" "}
                  <br />
                  {outPenalty?.penaltyTimeNumber && outPenalty?.penaltyTimeText  && outPenalty?.penaltyTimeNumber > 0 &&(
                       <span className="text-red-700">Early {' '} {outPenalty?.penaltyTimeText} </span> 
                  )}
                </TableCell>
              );

        }
        else{
            body.push(<TableCell key={index} className="text-red-800">This Can not be reached </TableCell>);
        }

      } else {
        if (
          !(
            workingDayHour &&
            (workingDayHour[dayNameIn as keyof typeof workingDayHour] ||
              workingDayHour[dayNameOut as keyof typeof workingDayHour])
          )
        ) {
          body.push(<TableCell key={index} className="text-red-800">-------</TableCell>);
        }
        else{
          body.push(<TableCell key={index} className="text-red-800">Absent</TableCell>);
        }
      }
    });

    loopDate.setDate(loopDate.getDate() + 1);
    index=index+1;
  }
  return body;
};

function isSameMonthYear(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}
function getMinMaxDates(dates: Date[]): { minDate: Date, maxDate: Date } {
  console.log(dates)
    const sortedDates = dates.sort((a, b) => (new Date(a)).getTime() - (new Date(b)).getTime());
    const minDate = new Date(sortedDates[0]);
    const maxDate = new Date(sortedDates[sortedDates.length - 1]);
    return { minDate, maxDate };
  }
function calculateAttendance(time: string|undefined, date: Date, isIn: boolean):{penaltyTimeNumber:number,penaltyTimeText:string}|null{
    if(!time){
        return null;
    }

const [hour, minute] = time.split(':');
let  workingHourWithT = new Date(date);
 workingHourWithT.setHours(Number(hour),Number(minute),0,0)
const workingHour = workingHourWithT.getTime();
const attendanceTime = new Date(date).getTime();
let diff = 0;
if(isIn)
{
    diff = workingHour - attendanceTime;
    if(diff>0){
        diff = 0
    }
   
}
else{
    diff = attendanceTime - workingHour;
    console.log(diff,date,workingHourWithT)

    if(diff>0){
        diff = 0
    }
}
if(diff ===0)
{
    return null;
}

const minutesLate = Math.abs(diff / 60000);
const diffInHours = Math.floor(minutesLate / 60);
const diffInMinutes =Math.ceil(minutesLate % 60);
console.log(minutesLate)
//  return  like 1.5 hour mean 1 hour 30 minutes only in  two decimal points mean not 1.556 but like 1.55 


let penaltyTimeNumber = Number (diffInHours) + Number((diffInMinutes / 60).toFixed(2));
let penaltyTimeText = `${diffInHours.toString().padStart(2, '0')}:${diffInMinutes.toString().padStart(2, '0')}`;





return{penaltyTimeNumber,penaltyTimeText}
}

//   const fromDate = new Date('2019-01-01');
// const toDate = new Date('2019-01-31');

// const documents = await MyModel.find({
//   'data.from': { $gte: fromDate, $lte: toDate },
//   'data.to': { $gte: fromDate, $lte: toDate }
// });

export default AttendaceList;

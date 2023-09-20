import { TableCell } from "@/components/ui/table";
import { IAttendanceDetails } from "@/types/attendanceDetails";
import React, { ReactComponentElement } from "react";
import { IattendaceEmployee } from "./attendance";
import { IWorkingHour } from "@/types/workingHour";
import { DateRange } from "react-day-picker";
import { compareTimes } from "./AttendaceAlgortism";
import { IContract } from "@/types/contract";

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
  const activeContract =
    employee.activeContract && "grossSalary" in employee.activeContract
      ? (employee.activeContract as IContract)
      : null;
  // id employee has no working day then return null
  if (!workingDayHour) return null;

  if (!activeContract) {
    console.log("NO Contrcat Foundddddddddddddddd");
    return null;
  }

  const penaltyTotal = new Map<
    Date,
    {
      lateIn: number | null;
      earlyOut: number | null;
      absent: number | null;
      missedPunch: number;
    }
  >();

  const totalPenality = { lateIn: 0, earlyOut: 0, absent: 0, missedPunch: 0 };

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
          body.push(
            <TableCell key={index} className="text-red-800">
              -------
            </TableCell>
          );
        } else if (todaysAttendanceTimes.length < 1) {
          let absentTime = 0;
          if (
            workingDayHour[dayNameIn as keyof typeof workingDayHour] !==
              undefined &&
            workingDayHour[dayNameOut as keyof typeof workingDayHour] !==
              undefined
          ) {
            // @ts-ignore
            absentTime = compareTimes(workingDayHour[dayNameIn as keyof typeof workingDayHour],
              workingDayHour[dayNameOut as keyof typeof workingDayHour]
            );
            absentTime = absentTime > 8 ? 8 : absentTime;
            totalPenality.absent += absentTime;
          }

          body.push(
            <TableCell key={index}>
              <span className="text-red-800">Absent</span> <br />
              <span className="text-red-700">
                {" "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  absentTime
                )}{" "}
                Birr
              </span>{" "}
            </TableCell>
          );
        } else if (todaysAttendanceTimes.length === 1) {
          totalPenality.missedPunch += 1;
          body.push(
            <TableCell key={index}>
              <span className="text-blue-600">
                {todaysAttendanceTimes[0].toDateString()}{" "}
              </span>{" "}
              <br />
              <span className="text-red-700">miss</span>
              <span className="text-red-700">
                {" "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  1
                )}{" "}
                Birr
              </span>{" "}
            </TableCell>
          );
        } else if (todaysAttendanceTimes.length > 1) {
          const { minDate, maxDate } = getMinMaxDates(todaysAttendanceTimes);
          const inPenalty = calculateAttendance(
            workingDayHour[dayNameIn as keyof typeof workingDayHour],
            minDate,
            true
          );
          const outPenalty = calculateAttendance(
            workingDayHour[dayNameOut as keyof typeof workingDayHour],
            maxDate,
            false
          );
          inPenalty?.penaltyTimeNumber &&
                inPenalty?.penaltyTimeText &&
                inPenalty?.penaltyTimeNumber > 0 && (totalPenality.lateIn += inPenalty?.penaltyTimeNumber)
          outPenalty?.penaltyTimeNumber &&
                outPenalty?.penaltyTimeText &&
                outPenalty?.penaltyTimeNumber > 0 && (totalPenality.earlyOut += outPenalty?.penaltyTimeNumber)
          /**
           * 
           * Below is the REnder boady and the above is the data


           */
          
          
          
                body.push(
            <TableCell key={index}>
              <span className="text-blue-600">
                In - {minDate.getHours()}
                {":"}
                {minTwoDigits(minDate.getMinutes())}
              </span>{" "}
              <br />
              {inPenalty?.penaltyTimeNumber &&
                inPenalty?.penaltyTimeText &&
                inPenalty?.penaltyTimeNumber > 0 && (
                  <>
                    {/* {totalPenality.lateIn += inPenalty?.penaltyTimeNumber} */}
                    <span className="text-red-700 shadow-sm bg-slate-400">
                      Late {inPenalty?.penaltyTimeText} <br />-
                      {PenaltyMoneyCalculator(
                        activeContract.grossSalary.$numberDecimal,
                        inPenalty?.penaltyTimeNumber
                      )}{" "}
                      Birr
                    </span>
                  </>
                )}
              <br />
              <span className="text-blue-600 ">
                Out - {maxDate.getHours()}
                {":"}
                {minTwoDigits(maxDate.getMinutes())}
              </span>{" "}
              <br />
              {outPenalty?.penaltyTimeNumber &&
                outPenalty?.penaltyTimeText &&
                outPenalty?.penaltyTimeNumber > 0 && (
                  <>
                    {/* {(totalPenality.earlyOut += outPenalty?.penaltyTimeNumber)} */}
                    <span className="text-red-700 shadow-sm bg-slate-400">
                      Early {outPenalty?.penaltyTimeText} <br />-
                      {PenaltyMoneyCalculator(
                        activeContract.grossSalary.$numberDecimal,
                        outPenalty?.penaltyTimeNumber
                      )}{" "}
                      Birr
                    </span>
                  </>
                )}
            </TableCell>
          );
        } else {
          body.push(
            <TableCell key={index} className="text-red-800">
              This Can not be reached{" "}
            </TableCell>
          );
        }
      } else {
        if (
          !(
            workingDayHour &&
            (workingDayHour[dayNameIn as keyof typeof workingDayHour] ||
              workingDayHour[dayNameOut as keyof typeof workingDayHour])
          )
        ) {
          body.push(
            <TableCell key={index} className="text-red-800">
              -------
            </TableCell>
          );
        } else {
          let absentTime = 0;
          if (
            workingDayHour[dayNameIn as keyof typeof workingDayHour] !==
              undefined &&
            workingDayHour[dayNameOut as keyof typeof workingDayHour] !==
              undefined
          ) {
            // @ts-ignore
            absentTime = compareTimes(workingDayHour[dayNameIn as keyof typeof workingDayHour],
              workingDayHour[dayNameOut as keyof typeof workingDayHour]
            );
            absentTime = absentTime > 8 ? 8 : absentTime;
            totalPenality.absent += absentTime;
          }
          body.push(
            <TableCell key={index} className="text-red-800">
              <span>Absent </span> <br />
              <span className="text-red-700">
                {" "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  absentTime
                )}{" "}
                Birr
              </span>{" "}
            </TableCell>
          );
        }
      }
    });

    loopDate.setDate(loopDate.getDate() + 1);
    index = index + 1;

    if (!(loopDate <= date?.to)) {
      body.push(
        <TableCell key={index} className="text-black">
          {totalPenality?.absent > 0 && (
            <>
              <span className="text-red-700">
                {"Absent  "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  totalPenality?.absent
                )}{" "}
                Birr
              </span>{" "}
              <br />
            </>
          )}

{totalPenality?.missedPunch > 0 && (
            <>
              <span className="text-red-700">
                {"Missed Punch  "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  totalPenality?.missedPunch
                )}{" "}
                Birr
              </span>{" "}
              <br />
            </>
          )}

{totalPenality?.lateIn > 0 && (
            <>
              <span className="text-red-700">
                {"Late In  "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  totalPenality?.lateIn
                )}{" "}
                Birr
              </span>{" "}
              <br />
            </>
          )}

{totalPenality?.earlyOut > 0 && (
            <>
              <span className="text-red-700">
                {"Early Out  "}
                -
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  totalPenality?.earlyOut
                )}{" "}
                Birr
              </span>{" "}
              <br />
            </>
          )}
        </TableCell>
      );
    }
  }
  return body;
};

function isSameMonthYear(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}
function getMinMaxDates(dates: Date[]): { minDate: Date; maxDate: Date } {
  const sortedDates = dates.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const minDate = new Date(sortedDates[0]);
  const maxDate = new Date(sortedDates[sortedDates.length - 1]);
  return { minDate, maxDate };
}
function calculateAttendance(
  time: string | undefined,
  date: Date,
  isIn: boolean
): { penaltyTimeNumber: number; penaltyTimeText: string } | null {
  if (!time) {
    return null;
  }

  const [hour, minute] = time.split(":");
  let workingHourWithT = new Date(date);
  workingHourWithT.setHours(Number(hour), Number(minute), 0, 0);
  const workingHour = workingHourWithT.getTime();
  const attendanceTime = new Date(date).getTime();
  let diff = 0;
  let diffInHours= 0;
  let diffInMinutes = 0;
  if (isIn) {
    diff = (workingHour - (attendanceTime-600000));
    // 10 minite buffer Zone
    if (diff > 0) {
      return null;
    }
    const minutesLate = Math.abs(diff / 60000);
   diffInHours = Math.floor(minutesLate / 60);
   diffInMinutes = Math.floor(minutesLate % 60);
  } else {
    diff = attendanceTime - workingHour;
    if (diff > 0) {
      return null;
    }
    const minutesLate = Math.abs(diff / 60000);
  diffInHours = Math.floor(minutesLate / 60);
  diffInMinutes = Math.ceil(minutesLate % 60);
  }
  

  

  //  return  like 1.5 hour mean 1 hour 30 minutes only in  two decimal points mean not 1.556 but like 1.55

  let penaltyTimeNumber =
    Number(diffInHours) + Number((diffInMinutes / 60).toFixed(2));
  let penaltyTimeText = `${diffInHours
    .toString()
    .padStart(2, "0")}:${diffInMinutes.toString().padStart(2, "0")}`;

  return { penaltyTimeNumber, penaltyTimeText };
}

function PenaltyMoneyCalculator(grossSalary: number, hours: number) {
  return Number(((grossSalary / 192) * hours).toFixed(2));
}

export const minTwoDigits = (n:number) => {
  return (n < 10 ? "0" : "") + n;
};

//   const fromDate = new Date('2019-01-01');
// const toDate = new Date('2019-01-31');

// const documents = await MyModel.find({
//   'data.from': { $gte: fromDate, $lte: toDate },
//   'data.to': { $gte: fromDate, $lte: toDate }
// });

export default AttendaceList;

import { TableCell } from "@/components/ui/table";
import { IAttendanceDetails } from "@/types/attendanceDetails";
import React, { ReactComponentElement } from "react";
import { IattendaceEmployee } from "./attendance";
import { IWorkingHour } from "@/types/workingHour";
import { DateRange } from "react-day-picker";
import {
  OtMoneyCalculator,
  PenaltyMoneyCalculator,
  calculateAttendance,
  compareTimes,
  getMinMaxDates,
  isSameMonthYear,
  minTwoDigits,
} from "./AttendaceAlgortism";
import { IContract } from "@/types/contract";
import NotWorkingDay from "./_componets/NotWorkingDay";
import Absent from "./_componets/Absent";

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

  const totalPenality = { lateIn: 0, earlyOut: 0, absent: 0, missedPunch: 0 };
  const totalOt = { inOt: 0, outOt: 0, fullDayOt: 0 };
  // console.log(loopDate, date?.to)

  while (loopDate <= date?.to) {
    const dateNum = loopDate.getDate();
    const dayName = loopDate
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const dayNameIn = dayName + "In";
    const dayNameOut = dayName + "Out";
    let foundMonthYear= false
    // console.log(attendance)

    // loop through the given date range from the date picker
    attendance.forEach((attendance) => {
      // console.log(attendance.timeSheet)

      // loop through the attendance date saved in DB
      const todaysAttendanceTimes = attendance.timeSheet[dateNum] ?? [];
      if (isSameMonthYear(new Date(attendance.monthYear), loopDate)) {
        foundMonthYear = true
        /*
         *
         *  The loop Date and the Attendance Details have the same month and year
         *
         */
        if (
          !(
            workingDayHour &&
            (workingDayHour[dayNameIn as keyof typeof workingDayHour] ||
              workingDayHour[dayNameOut as keyof typeof workingDayHour])
          )
        ) {
          /*
           *
           *  The loop Date is On the weekend or not in working day for the employee
           *
           */
          if(todaysAttendanceTimes.length ===1)
          {
            body.push(
              <TableCell key={index} className="whitespace-nowrap">
                <span className="text-blue-600">
                  {new Date(new Date(todaysAttendanceTimes[0]).getTime()-(180*60000)).toDateString()}{" "}
                </span>{" "}
                <br />
                <span className="text-red-700">Ot-Missed</span>                
              </TableCell>
            );

          }
          else if(todaysAttendanceTimes.length > 1)
          {
          const { minDate, maxDate } = getMinMaxDates(todaysAttendanceTimes);
          const isWeekend = minDate.getDay() === 0 || minDate.getDay() === 6;
          const diffInMinutes = Math.floor((maxDate.getTime() - minDate.getTime()) / (1000 * 60));
const diffInHours = Math.floor(diffInMinutes / 60);
const remainingMinutes = diffInMinutes % 60;
const OtText = `${diffInHours} hours and ${ remainingMinutes<10 ? '0'+remainingMinutes :remainingMinutes} minutes`;
const OtNumber = diffInHours+Number((remainingMinutes/60).toFixed(2));
const OtMoney = OtMoneyCalculator(activeContract.grossSalary.$numberDecimal,OtNumber,isWeekend);
totalOt.fullDayOt += OtNumber;

          body.push(
            <TableCell key={index} className="whitespace-nowrap">
              <span className="text-blue-600">
                In - {minDate.getHours()}
                {":"}
                {minTwoDigits(minDate.getMinutes())}
              </span>{" "}
              <br />              
              <br />              
              
              <span className="text-blue-600 ">
                Out - {maxDate.getHours()}
                {":"}
                {minTwoDigits(maxDate.getMinutes())}
              </span>{" "}
              <br />

              <span className="text-blue-600 ">
                OT - {OtText}
              </span>{" "}
              <br />
              <span className="text-blue-600 ">
                {OtMoney}{" "}Birr
              </span>{" "}
              <br />
              
              
            </TableCell>
          );

          }
          else{
            body.push(<NotWorkingDay index={index} />);
          }
        } else if (todaysAttendanceTimes.length < 1) {
          let absentTime = 0;
          if (
            workingDayHour[dayNameIn as keyof typeof workingDayHour] !==
              undefined &&
            workingDayHour[dayNameOut as keyof typeof workingDayHour] !==
              undefined
          ) {
            // @ts-ignore @prettier-ignore
            absentTime = compareTimes(workingDayHour[dayNameIn as keyof typeof workingDayHour],
              workingDayHour[dayNameOut as keyof typeof workingDayHour]
            );
            absentTime = absentTime > 8 ? 8 : absentTime;
            totalPenality.absent += absentTime;
            let penaltyMoney = PenaltyMoneyCalculator(
              activeContract.grossSalary.$numberDecimal,
              absentTime
            );

            body.push(<Absent index={index} penaltyMoney={penaltyMoney} />);
          }
        } else if (todaysAttendanceTimes.length === 1) {
          totalPenality.missedPunch += 1;
          body.push(
            <TableCell key={index} className="whitespace-nowrap">
              <span className="text-blue-600">
                {new Date(todaysAttendanceTimes[0]).toDateString()}{" "}
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
          const isWeekend = minDate.getDay() === 0 || minDate.getDay() === 6;
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
          const inOt = inPenalty?.penaltyTimeNumber && inPenalty?.penaltyTimeNumber > 0 ? {penaltyTimeNumber:0,penaltyTimeText:'00:00'}: calculateAttendance(
            workingDayHour[dayNameIn as keyof typeof workingDayHour],
            minDate,
            true,
            true
          );
          const outOt = outPenalty?.penaltyTimeNumber && outPenalty?.penaltyTimeNumber >0 ? {penaltyTimeNumber:0,penaltyTimeText:'00:00'} : calculateAttendance(
            workingDayHour[dayNameOut as keyof typeof workingDayHour],
            maxDate,
            false,
            true
          );
          inPenalty?.penaltyTimeNumber &&
            inPenalty?.penaltyTimeText &&
            inPenalty?.penaltyTimeNumber > 0 &&
            (totalPenality.lateIn += inPenalty?.penaltyTimeNumber);
          outPenalty?.penaltyTimeNumber &&
            outPenalty?.penaltyTimeText &&
            outPenalty?.penaltyTimeNumber > 0 &&
            (totalPenality.earlyOut += outPenalty?.penaltyTimeNumber);

          inOt?.penaltyTimeNumber &&
            inOt?.penaltyTimeText &&
            inOt?.penaltyTimeNumber > 0 &&
            (totalOt.inOt += inOt?.penaltyTimeNumber);
          outOt?.penaltyTimeNumber &&
            outOt?.penaltyTimeText &&
            outOt?.penaltyTimeNumber > 0 &&
            (totalOt.outOt += outOt?.penaltyTimeNumber);

          /**
           * 
           * Below is the REnder boady and the above is the data


           */

          body.push(
            <TableCell key={index} className="whitespace-nowrap">
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
                    <span className="text-red-700 shadow-sm bg-slate-100">
                      Late {inPenalty?.penaltyTimeText} <br />-
                      {PenaltyMoneyCalculator(
                        activeContract.grossSalary.$numberDecimal,
                        inPenalty?.penaltyTimeNumber
                      )}{" "}
                      Birr
                    </span>
                    <br />
                  </>
                )}
              {inOt?.penaltyTimeNumber &&
                inOt?.penaltyTimeText &&
                inOt?.penaltyTimeNumber > 0 && (
                  <>
                    <span className="text-green-800 shadow-sm bg-slate-100">
                      OT {inOt?.penaltyTimeText} <br />-
                      {OtMoneyCalculator(
                        activeContract.grossSalary.$numberDecimal,
                        inOt?.penaltyTimeNumber,
                        isWeekend
                      )}{" "}
                      Birr
                    </span>
                    <br />
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
                    <span className="text-red-700 shadow-sm bg-slate-100">
                      Early {outPenalty?.penaltyTimeText} <br />-
                      {PenaltyMoneyCalculator(
                        activeContract.grossSalary.$numberDecimal,
                        outPenalty?.penaltyTimeNumber
                      )}{" "}
                      Birr
                    </span>
                  </>
                )}
              {outOt?.penaltyTimeNumber &&
                outOt?.penaltyTimeText &&
                outOt?.penaltyTimeNumber > 0 && (
                  <>
                    <span className="text-green-800 shadow-sm bg-slate-100">
                      OT {outOt?.penaltyTimeText} <br />-
                      {OtMoneyCalculator(
                        activeContract.grossSalary.$numberDecimal,
                        outOt?.penaltyTimeNumber,
                        isWeekend
                      )}{" "}
                      Birr
                    </span>
                  </>
                )}
            </TableCell>
          );
        } else {
          body.push(
            <TableCell key={index} className="text-red-800 whitespace-nowrap">
              This Can not be reached{" "}
            </TableCell>
          );
        }
      } 
      
    });
    if(!foundMonthYear)
    {
      
        if (
          !(
            workingDayHour &&
            (workingDayHour[dayNameIn as keyof typeof workingDayHour] ||
              workingDayHour[dayNameOut as keyof typeof workingDayHour])
          )
        ) {
          body.push(<NotWorkingDay index={index} />);
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
            <TableCell key={index} className="text-red-800 whitespace-nowrap">
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

    loopDate.setDate(loopDate.getDate() + 1);
    index = index + 1;

    if (!(loopDate <= date?.to)) {
      body.push(
        <TableCell key={index} className="text-black whitespace-nowrap">
          {totalPenality?.absent > 0 && (
            <>
              <span className="text-red-700">
                {"Absent  "}-
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
                {"Missed Punch  "}-
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
                {"Late In  "}-
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
                {"Early Out  "}-
                {PenaltyMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  totalPenality?.earlyOut
                )}{" "}
                Birr
              </span>{" "}
              <br />
            </>
          )}

          {totalOt?.fullDayOt > 0 && (
            <>
              <span className="text-green-800">
                {"Full Day OT  "}-
                {OtMoneyCalculator(
                  activeContract.grossSalary.$numberDecimal,
                  totalOt?.fullDayOt,
                  true
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


//   const fromDate = new Date('2019-01-01');
// const toDate = new Date('2019-01-31');

// const documents = await MyModel.find({
//   'data.from': { $gte: fromDate, $lte: toDate },
//   'data.to': { $gte: fromDate, $lte: toDate }
// });

export default AttendaceList;

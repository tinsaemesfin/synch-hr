"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { employeeData } from "@/types/employeeWithOutName/EmployeeMerged";
import moment from "moment";
import { Separator } from "@/components/ui/separator";

const columnHelper = createColumnHelper<employeeData>();

export const columns: ColumnDef<employeeData>[] = [
  
  columnHelper.group({
    id: "personal",
    header: () => (
      <span className="text-blue-700 col-span-5">Personal Information</span>
    ),
    columns: [
      {
        accessorKey: "personal.fullName",
        header: "Full Name",
        id: "fullName",
      },
      {
        accessorKey: "personal.phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => (
          <div className="flex-col items-center gap-y-1">
            {row.original.personal.phoneNumber.primaryPhone}
            {row.original.personal.phoneNumber.secondaryPhone ?? null}
          </div>
        ),
      },
      {
        accessorKey: "personal.gender",
        header: "Gender",
      },
      {
        accessorKey: "personal.phoneNumber.primaryPhone",
        header: "Address",
        cell: ({ row }) => (
          <div className="flex-col items-center gap-y-1">
            {row.original.personal?.address?.city ?? null}
            {row.original.personal?.address?.state ?? null}
            {row.original.personal?.address?.street ?? null}
            {row.original.personal?.address?.zip ?? null}
          </div>
        ),
      },

      {
        accessorKey: "personal.nationality",
        header: "Nationality",
      },
      {
        accessorKey: "personal.employedDate",
        header: "Employed Date",
        cell: ({ row }) => (
          <>
            {new Date(row.original.personal.employedDate).toDateString()}
          </>
        ),
      },
      {
        accessorKey: "personal.emergency.contact",
        header: "Emergency Name",
        cell: ({ row }) => (
          <>
            {row.original.personal.emergency.contact} <br />
            {row.original.personal.emergency2?.contact ?? null}
          </>
        ),
      },
      {
        accessorKey: "personal.emergency.phoneNumber",
        header: "Emergency Phone",
        cell: ({ row }) => (
          <>
            {row.original.personal.emergency.phoneNumber} <br />
            {row.original.personal.emergency2?.phoneNumber ?? null}
          </>
        ),
      },
      {
        accessorKey: "personal.email",
        header: "Email",
        cell: ({ row }) => <>{row.original.personal.email ?? null}</>,
      },
      {
        accessorKey: "personal.employeeAttendanceId",
        header: "Attendance Id",
        cell: ({ row }) => (
          <>{row.original.personal.employeeAttendanceId ?? null}</>
        ),
      },
      {
        accessorKey: "personal.bankName",
        header: "Bank Name",
      },
      {
        accessorKey: "personal.bankNumber",
        header: "Account Number",
      },
      {
        accessorKey: "personal.birthDate",
        header: "Birth Date",
        cell: ({ row }) => (
          <>
            {moment().diff(
              moment(
                new Date(
                  Date.UTC(0, 0, Number(row.original.personal.birthDate))
                )
              ),
              "years"
            )}
          </>
        ),
      },
    ],
  }),
  columnHelper.group({
    id: "contract",
    header: () => (
      <span className="text-blue-700 col-span-5">Contact Information</span>
    ),

    columns: [
      {
        accessorKey: "contract.permanentOrContract",
        header: "Contract Type",
        id: "permanentOrContract",
      },
      {
        accessorKey: "contract.typeOfContract",
        header: "PartTime/FullTime",
      },
      {
        accessorKey: "contract.grossSalary",
        header: "Gross Salary",
        cell: ({ row }) =>
          row.original.contract.grossSalary.toFixed(2) +
          " Per " +
          row.original.contract.rateOfSalary,
      },
      {
        accessorKey: "contract.titleOfPosition",
        header: "Title",
      },
      {
        accessorKey: "contract.department",
        header: "Department",
      },
      {
        accessorKey: "contract.startsFrom",
        header: "Duration",
        cell: ({ row }) => (
          <>
            {new Date(
              Date.UTC(0, 0, Number(row.original.contract.startsFrom))
            ).toDateString()}
            {" - "}
            {row.original.contract.endsOn
              ? new Date(
                  Date.UTC(0, 0, Number(row.original.contract.endsOn))
                ).toDateString()
              : null}
          </>
        ),
      },
    ],
  }),
  columnHelper.group({
    id: "allowance",
    header: () => <span className="text-blue-700 col-span-5">Allowance</span>,
    columns: [
      {
        accessorKey: "allowance.name",
        header: "Allowance Type",
        // size: 200,
        cell: ({ row }) => (
          <div className="flex-col items-center gap-y-1 w-[200px]">
            {row.original.allowance.map((allowance) => (
              <div key={allowance.allowanceName}>
                {allowance.allowanceName}-{allowance.amount}-
                {allowance.isNet ? "Net" : "Gross"}
              </div>
            ))}
          </div>
        ),
      },
    ],
  }),

  columnHelper.group({
    id: "overtime",
    header: () => <span className="text-blue-700 col-span-5">OverTime</span>,
    columns: [
      {
        accessorKey: "overtime.data",
        header: "OverTime Rate",
        size: 200,
        cell: ({ row }) => (
          <div className="flex-col items-center gap-y-1 w-[200px]">
            <p>
              {" "}
              {"After 10PM "}
              {row.original.overtime.after10Pm}{" "}
            </p>
            <p>
              {" "}
              {"Before 10PM "}
              {row.original.overtime.before10Pm}{" "}
            </p>
            <p>
              {"Weekend "}
              {row.original.overtime.weekend}{" "}
            </p>
            <p>
              {" "}
              {"Holiday "}
              {row.original.overtime.holyday}{" "}
            </p>
          </div>
        ),
      },
    ],
  }),

  columnHelper.group({
    id: "workingHour",
    header: () => (
      <span className="text-blue-700 col-span-5">Working Hour Shift</span>
    ),

    columns: [
      {
        accessorKey: "workingHour.data",
        header: "Working Hour",
        size: 180,
        // minSize:300,

        cell: ({ row }) => (
          <div className="flex-col items-center justify-start  gap-y-4 w-[300px]">
            <p>
              {" "}
              {row.original.workingHour.mondayIn &&
                "Monday In " + row.original.workingHour.mondayIn + " "}
              {row.original.workingHour.mondayOut &&
                "Monday Out " + row.original.workingHour.mondayOut}{" "}
            </p>
            <p>
              {" "}
              {row.original.workingHour.tuesdayIn &&
                "Tuesday In " + row.original.workingHour.tuesdayIn + " "}
              {row.original.workingHour.tuesdayOut &&
                "Tuesday Out " + row.original.workingHour.tuesdayOut}{" "}
            </p>

            <p>
              {" "}
              {row.original.workingHour.wednesdayIn &&
                "Wednesday In " + row.original.workingHour.wednesdayIn + " "}
              {row.original.workingHour.wednesdayOut &&
                "Wednesday Out " + row.original.workingHour.wednesdayOut}{" "}
            </p>
            <p>
              {" "}
              {row.original.workingHour.thursdayIn &&
                "thursday In " + row.original.workingHour.thursdayIn + " "}
              {row.original.workingHour.thursdayOut &&
                "Thursday Out " + row.original.workingHour.thursdayOut}{" "}
            </p>
            <p>
              {" "}
              {row.original.workingHour.fridayIn &&
                "friday In " + row.original.workingHour.fridayIn + " "}
              {row.original.workingHour.fridayOut &&
                "friday Out " + row.original.workingHour.fridayOut}{" "}
            </p>
            <p>
              {row.original.workingHour.saturdayIn &&
                "saturday In " + row.original.workingHour.saturdayIn + " "}
              {row.original.workingHour.saturdayOut &&
                "saturday Out " + row.original.workingHour.saturdayOut}{" "}
            </p>
            <p>
              {" "}
              {row.original.workingHour.sundayIn &&
                "sunday In " + row.original.workingHour.sundayIn + " "}
              {row.original.workingHour.sundayOut &&
                "sunday Out " + row.original.workingHour.sundayOut + " "}{" "}
            </p>
            <p>{row.original.workingHour.canBeRemote && "can be remote"} </p>
            <p>
              {" "}
              {row.original.workingHour.haveOverNightShift &&
                "have over night shift"}{" "}
            </p>
          </div>
        ),
      },
    ],
  }),
];

"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { employeeData } from "@/types/employeeWithOutName/EmployeeMerged";
import moment from "moment";

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
        accessorKey: "personal.phoneNumber.primaryPhone",
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
            {new Date(
              Date.UTC(0, 0, Number(row.original.personal.employedDate))
            ).toDateString()}
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
        accessorKey: "contract.PartimeOrFullTime",
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

  {
    accessorKey: "allowance.name",
    header: "Allowance Type",
    
    size: 200,
        cell: ({ row }) => (
      <div className="flex-col items-center gap-y-1 w-20 bg-red-700">
        {row.original.allowance.map((allowance)=>(
         <div key={allowance.allowanceName} >
         {allowance.allowanceName}-{allowance.amount}-{allowance.isNet}
       </div>
        ))}
      </div>
    ),
  },
];

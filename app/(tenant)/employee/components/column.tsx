"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ObjectId } from "bson";

export type EmployeeColumn = {
  id: ObjectId;
  fullName: string;
  employedDate: string;
  statusOfEmployee: string;
  phoneNumber: string; 
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "employedDate",
    header: "Employed Date",
  },
  {
    accessorKey: "statusOfEmployee",
    header: "Status",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
 
  
//   {
//     id: "actions",
//     cell: ({ row }) => <CellAction data={row.original} />,
//   },
];

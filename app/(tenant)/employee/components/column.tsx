"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CellAction } from "./cellAction";

export type EmployeeColumn = {
  id: string;
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
    cell: ({ row }) => (
      <>
        {new Date(row.original.employedDate).toDateString()}
      </>
    ),
  },
  {
    accessorKey: "statusOfEmployee",
    header: "Status",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },  
  {
    id: "actions",
    header: 'View',
    cell: ({ row }) => <CellAction id={row.original.id}/>,
  },
];


import React from 'react'
import { ColumnDef } from "@tanstack/react-table"

export type AdminColumn={
    id: string;
    name:string;
    createdAt: string;
}

export const Columns :ColumnDef<AdminColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "createdAt",
        header: "Date",
      }, 
    //   {
    //     id:'actions',
    //     cell:({row})=><CellAction data={row.original}/>,
    //   }
]

export default Columns
"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/libs/utils";
import { employeeData } from "@/types/employeeWithOutName/EmployeeMerged";
import { companyAllowanceTypeBulk } from "@/types/employeeUpload/bulkCompanyAllowance";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import ClipLoader from "react-spinners/ClipLoader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  preparedEmployeeData:employeeData[];
  preparedCompanyData:companyAllowanceTypeBulk[];
}

export function DataTableBulkEmployee<TData, TValue>({
  columns,
  data,
  searchKey, 
  preparedEmployeeData,
  preparedCompanyData
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  const OnSubmit = async ()=>{
    if(preparedCompanyData)
    {
      try {
        setLoading(true);
       const res =  await axios.post('/api/companyAllowance',preparedCompanyData); 
       console.log(res);
       setLoading(false)

       toast.success('Company Allowance loaded Successfully')         
        } catch (error) {
          setLoading(false)
          toast.error('Something went wrong while accessing Company Allowance');
          return new Error('@E Something went wrong while accessing Company Allowance');
        }
      }
      try {
        setLoading(true)
       const res=await axios.post('/api/employee/bulkUpload/uploadEmployees',preparedEmployeeData)
        setLoading(false)
       console.log(res)
       toast.success('Employees loaded Successfully')
      
      } catch (error) {
        setLoading(false)
        toast.error('Error Unable to upload Employees ')
        return new Error('@E Error Unable to upload Employees');
      }

    


   
  }
  
  if(loading) return (
    <Dialog open >
<DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription className="items-center justify-center">
      <ClipLoader
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="flex justify-center items-center"
      />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
  

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={`${header.colSpan>1 && 'text-center'}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell,i) => {
                    
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn('bg-blue-800',table.getCanNextPage() ? 'hidden' : 'block')}
          onClick={() => OnSubmit()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

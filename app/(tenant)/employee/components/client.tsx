"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { EmployeeColumn, columns } from "./column";
interface EmployeeClientProps {
    data :EmployeeColumn[]
}

const EmployeeClient:React.FC<EmployeeClientProps> = ({
    data
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Manege Employees`}
          description="Manage Your Company Employees"
        />
        <div className="space-x-2">
        <Button className='bg-blue-800' onClick={() => router.push(`/employee/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Register New Employee
        </Button>
        <Button onClick={() => router.push(`/employee/uploadBulk`)}>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Bulk Employees
        </Button>
        </div>
        
      </div>
      <Separator />
      <DataTable searchKey="fullName" columns={columns} data={data} />
      
    </>
  );
};

export default EmployeeClient;

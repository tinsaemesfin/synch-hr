'use client';
import { Heading } from "@/components/ui/heading";
import React from "react";
import Columns, { AdminColumn } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
;
interface Props {
  data:AdminColumn[] ;
}

const AdminClient:React.FC<Props> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Dashboard" description="Welcome to Sync-HR " />
        <Button onClick={()=> router.push(`/admin/tenants/new`)}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={Columns} />
    </>
  );
};

export default AdminClient;

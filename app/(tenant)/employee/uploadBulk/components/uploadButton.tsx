"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import axios, { AxiosProgressEvent } from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Sheet } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import DataViewForUpload from "./DataViewForUpload";
import { useEmployeeFile } from "@/hooks/useEmployeeFile";

interface fileProps {
  preview: string;
  data: File | null;
}
const UploadButton = () => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { file, isFileReady,setFile,setIsFileReady } = useEmployeeFile();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = async (result: any) => {
    setFile(result.info.secure_url);
      
  };

  const onUploadSubmit = async () => {
    if (!file) {
      console.log("no File ");
      return null;
    }
    try {
      const response = await axios.post("/api/employee/bulkUpload", {
        fileUrl: file,
        toWhat: "EmployeeBulkUpload",
      });
      console.log(response)

      toast.success("File Uploaded Successfully");
    router.refresh();      
      router.push(`/employee/uploadBulk/${response.data.SavedFile._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error Happened" + error);
    }
  };

  if (!isMounted) return null;

   
    return (
      <>
        <div // make this on submit to upload the file
          className="relative mt-4 h-40 block w-full border-2 border-gray-700 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CldUploadWidget
            onUpload={onUpload}
            uploadPreset="ttfph8g2"
            options={{
              sources: ["local"],
            }}
          >
            {({ open }) => {
              const onClick = () => {
                open();
              };
              return (
                <Button
                  onClick={onClick}
                  variant={"link"}
                  className="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
                >
                  <Sheet className="h-4 w-4 mr-2" />
                  Upload an XLSX
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
        <Button
          type="button"
          disabled={!file}
          onClick={() => {
            onUploadSubmit();
          }}
          className="mt-5"
        >
          Upload
        </Button>
      </>
    );
  
};

export default UploadButton;

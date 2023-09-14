'use client'
import LoadingModel from '@/components/modals/loading-Model';
import { Button } from '@/components/ui/button';
import { useEmployeeFile } from '@/hooks/useEmployeeFile';
import axios from 'axios';
import { Sheet } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

const UploadAttendanceButton = () => {
    const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [file, setFile] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = async (result: any) => {
    setFile(result.info.secure_url);
      
  };

  const onUploadSubmit = async () => {
    setLoading(true)
    if (!file) {
      console.log("no File ");
      setLoading(false);
      return null;
    }
    try {
      const response = await axios.post("/api/attendance/bulkUpload", {
        fileUrl: file,
        toWhat: "AttendanceUploadBulk",
      });
      console.log(response.data)

      toast.success("File Uploaded Successfully");
    router.refresh();
    setLoading(false);   
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error Happened" + error);
    }
  };

  if (!isMounted) return null;

  if(loading) return <LoadingModel/>

  return (
    <>
    <div // make this on submit to upload the file
      className="relative mt-4  block w-full border-2 border-gray-700 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              className="absolute top-0 left-0 right-0 bottom-0 h-full w-full p-3"
            >
              <Sheet className="h-4 w-4 mr-2" />
              Upload an TXT
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
  )
}

export default UploadAttendanceButton
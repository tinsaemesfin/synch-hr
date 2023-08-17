'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { publicRequest } from "@/mongoDB/request-methods";
import { cn } from "@/libs/utils";
import axios, { AxiosProgressEvent } from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
interface fileProps{
    preview:string,
    data:File | null 
}
const UploadButton = () => {
    const [file, setFile] = useState<File|null>(null);
    const [progress,setProgress] = useState(0);
const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
  console.log(e.target?.files)
    if(!e.target.files) return;
    // const files = {
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     data: e.target.files[0],
    // };
    setFile(e.target.files[0]);
    
};

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    if(!file) return;
    formData.append("file", file);
    const response = await axios.post('/api/employee/bulkUpload', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent:AxiosProgressEvent) => {
                if (progressEvent.total != null) {
                    setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                }
            }
    })
  };

  return (
    <>
    <Progress value={progress} max={100} className={cn('mt-10',progress > 0 ? 'block' :'hidden')} />
    <form onSubmit={handleSubmit}>
      <Button  variant={'link'}    type="button"          // make this on submit to upload the file
        className="relative mt-4 h-40 block w-full border-2 border-gray-700 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Input onChange={handleFileChange} type="file" className="absolute opacity-0 top-0 left-0 right-0 bottom-0 h-full w-full" accept=".xlsx"/>
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>
        <span className="mt-2 block text-sm font-medium text-gray-900">
          Upload Employees in Bulk{" "}
        </span>
      </Button>
      <Button type="submit" disabled ={!file||progress>0} className='mt-5' >
        Upload
      </Button>
    </form>
    </>
    
  );
};

export default UploadButton;

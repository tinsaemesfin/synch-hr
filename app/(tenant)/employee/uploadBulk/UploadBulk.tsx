'use client';
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, DownloadIcon, Link, SheetIcon } from "lucide-react";

import React, { useState } from "react";
import UploadButton from "./components/uploadButton";
import DataViewForUpload from "./components/DataViewForUpload";
import { create } from "zustand";
import { useEmployeeFile } from "@/hooks/useEmployeeFile";
interface warningInterface {
  name: string;
  description: string;
}
const Warnings: warningInterface[] = [
  {
    name: "All Red Fields are Required",
    description: " All Red Fields are Required in all Sheets ",
  },
  {
    name: "Date Fields",
    description: " All Date Fields must be Valid Dates of Excel Format ",
  },
  {
    name: "Phone Number",
    description:
      "All Phone Numbers must be Valid Phone Numbers With country code like `+251 ",
  },
  {
    name: "Permanent And Contractual",
    description:
      "Permanent for Permanent Employees and Contract for Contractual Employees",
  },
  {
    name: "FullTime And PartTime",
    description: " Full-Time for FullTimers and Part-Time for PartTimers ",
  },
  {
    name: "Rate Of Salary",
    description: " monthly for Monthly Salary and hourly for Hourly Salary",
  },
  {
    name: "Allowance Sheet",
    description:
      " On Allowance Sheet Each Entry must be a valid Allowance Name and The Name must be in side of CompanyAllowance Sheet",
  },
  {
    name: "Over-Time Sheet",
    description:
      " OverTime Sheet is for accepting ot Rates for each Employee Not For Entering Overtime Money",
  },

  {
    name: "Working Hour Sheet",
    description:
      "if there is no in time or out time you can leave it empty and if the day will change in between employees attendance time make dateChangeBetweenInAndOut 1",
  },
  {
    name: "can be Remote",
    description:
      "if the employee can work remotely or if you want to exclude an employee from attendance penalities make it 1 ",
  },
  {
    name: "Company Allowance Sheet",
    description:
      "Fill The Fields Carefully since you need to use the names in Allowance Sheet ",
  },
];

const UploadBulk = () => {
  const { file, isFileReady } = useEmployeeFile();

  if (isFileReady && file) {
    return (
      <>
        {" "}
        <DataViewForUpload fileUrl={file} />{" "}
      </>
    );
  } else {
    return (
      <>
        <Heading
          title={`Manege Employees`}
          description="Manage Your Company Employees"
        />
        <Separator className="" />
        <div className="bg-white">
          <div className="mx-auto py-16 px-4 sm:px-6 lg:py-2 lg:px-5 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div>
              <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">
                A Short Guide for
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                Uploading Multiple Employees At Once
              </p>
              <p className="mt-4 text-md text-gray-500">
                here you can download a sample Excel file that helps you to
                format your employee&rsquo;s data
              </p>
              <a href="/excellFiles/ex.xlsx">
                <Button className="mt-2">
                  <SheetIcon className="mr-2 h-4 w-4" />
                  Download Sample Sheet
                </Button>
              </a>
              {/* make the below button onclick and open a file upload with file type of xlsx */}
              <UploadButton />
            </div>
            <div className="mt-2 lg:mt-0 lg:col-span-2">
              <dl className="space-y-1 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-6 sm:grid-flow-col sm:gap-x-4 sm:gap-y-10 lg:gap-x-5">
                {Warnings.map((warning) => (
                  <div key={warning.name} className="relative">
                    <dt>
                      <CheckIcon
                        className="absolute h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                        {warning.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-9 text-base text-gray-500">
                      {warning.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default UploadBulk;

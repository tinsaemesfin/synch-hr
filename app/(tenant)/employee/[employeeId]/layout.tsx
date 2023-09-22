import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Employee from "@/mongoDB/Employee";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import Avatar from "../../../../public/Avatar.png";
import React, { Suspense } from "react";
import { cn } from "@/libs/utils";
import dbConnect from "@/mongoDB/dbConnect";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { employeeId: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  await dbConnect();
  const employee = await Employee.findOne({
    _id: params.employeeId,
    tenantId: session.user.tenantId,
  });
  if (!employee) redirect("/employee");
  return (
    <>
      <Suspense fallback={<div>loading Layout.....................</div>}>
        <div className="shadow-header border border-cardBorder bg-white rounded relative flex flex-col">
          <div className="p-4">
            <div className="profile-view relative">
              <div className="xs:mx-auto sm:absolute w-[120px] h-[120px] bg-white overflow-hidden">
                <div className="w-full mx-auto">
                  <Image
                    //   className="h-8 w-auto"
                    className="rounded-full"
                    src={Avatar}
                    alt="Workflow"
                    //   width={200}
                    //   height={200}
                  />
                </div>
              </div>
              <div className="sm:pl-[140px] sm:pr-[50px]">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="sm:mt-[15px] mt-auto sm:text-center md:text-center sm:border-b-2 md:border-b-0 sm:border-dashed  sm:border-[#cccccc] sm:pb-5 md:pb-0 md:mb-[68px] lg:!mb-0 md:border-r-2 md:border-dashed md:border-[#cccccc]">
                    <h3 className="text-[#333333] text-2xl leading-[1.2] capitalize">
                      {employee.fullName}
                    </h3>
                    <h6 className="text-secondary-foreground text-xs mb-2">
                      {employee.activeContract?.department
                        ? employee.activeContract?.department
                        : ""}{" "}
                      Team
                    </h6>
                    <small className="text-secondary-foreground">
                      {employee.activeContract.titleOfPosition}
                    </small>
                    <div className="text-sm mt-[5px] font-medium">
                      Employee ID : {employee.id}
                    </div>
                    <div className="text-[13px] text-secondary-foreground">
                      Date of Join :{" "}
                      {employee.employedDate &&
                        new Date(employee.employedDate).toDateString()}
                    </div>
                  </div>
                  <ul className="personal-info w-full">
                    <li className="mb-[10px]">
                      <span className="inline-block float-left w-1/4 font-medium mr-[30px] text-[#4f4f4f] text-[15px]">
                        Phone:
                      </span>
                      <span className="text-[#0d6efd] text-[15px] block overflow-hidden">
                        {employee.phoneNumber.primaryPhone}
                      </span>
                    </li>
                    <li className="mb-[10px]">
                      <span className="inline-block float-left w-1/4 font-medium mr-[30px] text-[#4f4f4f] text-[15px]">
                        Email:
                      </span>
                      {/* <span className="text-[#0d6efd] text-[15px] block overflow-hidden"> */}
                      <span
                        className={cn(
                          "text-[15px] block overflow-hidden text-blue-600",
                          employee.email ? "text-[#0d6efd]" : "text-red-800"
                        )}
                      >
                        {employee.email ? employee.email : "No Email Address"}
                      </span>
                    </li>
                    <li className="mb-[10px]">
                      <span className="inline-block float-left w-1/4 font-medium mr-[30px] text-[#4f4f4f] text-[15px]">
                        Birthday:
                      </span>
                      <span className="text-[#8e8e8e] text-[15px] block overflow-hidden">
                        {employee.birthDate
                          ? new Date(employee.birthDate).toDateString()
                          : " "}
                      </span>
                    </li>
                    <li className="mb-[10px]">
                      <span className="inline-block float-left w-1/4 font-medium mr-[30px] text-[#4f4f4f] text-[15px]">
                        Address:
                      </span>
                      <span className="text-[#8e8e8e] text-[15px] block overflow-hidden">
                        {employee.address?.state ? employee.address?.state : ""}
                        {employee.address?.city ? employee.address?.city : ""}
                        {employee.address?.street
                          ? employee.address?.street
                          : ""}
                        {employee.address?.zip ? employee.address?.zip : ""}
                      </span>
                    </li>
                    <li className="mb-[10px]">
                      <span className="inline-block float-left w-1/4 font-medium mr-[30px] text-[#4f4f4f] text-[15px]">
                        Gender:
                      </span>
                      <span className="text-[#8e8e8e] text-[15px] block overflow-hidden">
                        {employee.gender}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      {children}
    </>
  );
};

export default Layout;

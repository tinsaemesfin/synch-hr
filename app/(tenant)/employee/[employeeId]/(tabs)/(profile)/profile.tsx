"use client";
// TODO: update emergency Contacts and informations with the Attendnace Id

import { IContract } from "@/types/contract";
import { IEmployee, activeOvertime } from "@/types/employee";
import { IOvertime } from "@/types/overTime";
import { PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import UpdateBankAlertDialog from "./(UpdateDialogs)/updateBankAlertDialog";
import { useAnEmployee } from "@/state/useEmployee";
import { useStore } from "@/state/useExample";

interface IProfileProps {
  employee: IEmployee;
  token:string
}
export const Profile: React.FC<IProfileProps> = ({ employee,token }) => {
  const anEmployee = useAnEmployee();
  
  useEffect(()=>{
    anEmployee.setToken(token);
    anEmployee.setEmployee(employee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const emergency = [employee.emergency];
  const contract = employee.activeContract as IContract;
  const ot = employee.activeOvertime as activeOvertime;
  employee.emergency2 && emergency.push(employee.emergency2);
 

  
  // 
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Bank bankName={employee.bankName} bankNumber={employee.bankNumber} />

        <EmergencyContact emergency={emergency} />
        <LatestContract contract={contract} ot={ot} />
        <AttendanceId attendaceId={employee.employeeAttendanceId ?? 0} />
      </div>
    </>
  );
};

const Bank = ({
  bankName,
  bankNumber,
}: {
  bankName: string;
  bankNumber: number;
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className="card shadow-header border border-cardBorder relative flex flex-col min-h-[150px] mb-[30px]">
        <div className="p-4 flex-grow flex-shrink basis-auto">
          <h3 className="text-xl mb-5">
            Bank Information{" "}
            <span
              // onClick={}
              onClick={() => {
                setShowModal(true);
              }}
              className="block float-right text-xs leading-6 bg-[#eeeeee] border border-select rounded-3xl w-[26px] min-h-[26px] text-center p-1 text-[#0063ba] cursor-pointer"
            >
              <PencilIcon />
            </span>
          </h3>
          <ul className="personal-info">
            <li className="mb-[10px]">
              <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
                Bank
              </div>
              <div className="text-[#4f4f4f] block overflow-hidden">
                {bankName ?? "No Bank Name Found"}
              </div>
            </li>
            <li className="mb-[10px]">
              <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
                Account Number
              </div>
              <div className="text-[#4f4f4f] block overflow-hidden">
                {bankNumber ?? "No Account Number Found"}
              </div>
            </li>
          </ul>
        </div>
      </div>
      {showModal && (
        <UpdateBankAlertDialog
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          data={{ bankName: bankName, bankNumber: bankNumber, }}
        />
      )}
    </> 
  );
};

const EmergencyContact = ({
  emergency,
}: {
  emergency: { contact: string; phoneNumber: string }[];
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div className="card shadow-header border border-cardBorder relative flex flex-col min-h-[150px] mb-[30px]">
      <div className="p-4 flex-grow flex-shrink basis-auto">
        <h3 className="text-xl mb-5">
          Emergency Information{" "}
          <span onClick={()=>setShowModal(true)} className="block float-right text-xs leading-6 bg-[#eeeeee] border  rounded-full w-[35px] max-h-[35px] text-center p-1 text-[#0063ba]">
            <PencilIcon size={20} />
          </span>
        </h3>
        <ul className="personal-info">
          {emergency.map(
            (emg: { contact: string; phoneNumber: string }, index: number) => (
              <div key={index}>
                <li className="mb-[10px]">
                  <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
                    Contract Person
                  </div>
                  <div className="text-[#4f4f4f] block overflow-hidden">
                    {emg?.contact}
                  </div>
                </li>
                <li className="mb-[10px]">
                  <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
                    Phone Number
                  </div>
                  <div className="text-[#4f4f4f] block overflow-hidden">
                    {emg?.phoneNumber}
                  </div>
                </li>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
    {showModal }
    </>
  );
};

const LatestContract = ({
  contract,
  ot,
}: {
  contract: IContract;
  ot: activeOvertime;
}) => {
  return (
    <div className="self-center card shadow-header border border-cardBorder relative flex flex-col min-h-[150px] mb-[30px]">
      <div className="p-4 flex-grow flex-shrink basis-auto">
        <h3 className="text-xl mb-5">Latest Contract Information </h3>
        <ul className="personal-info">
          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Type of Contract
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {contract.typeOfContract}
            </div>
          </li>
          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Type Of Employee
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {contract.permanentOrContract}
            </div>
          </li>
          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Title Of Position
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {contract.titleOfPosition}
            </div>
          </li>
          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Department
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {contract.department}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Contract starts
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {new Date(contract.startsFrom).toDateString()}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Contract Ends
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {contract.endsOn ? new Date(contract.endsOn).toDateString() : "-"}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Salary
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {Number(contract.grossSalary.$numberDecimal)} Birr{" "}
              {contract.rateOfSalary}
            </div>
          </li>
          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Overtime Rate
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {"\u00a0\u00a0"}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Before 10Pm
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {ot.before10Pm.$numberDecimal}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              After 10Pm
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {ot.after10Pm.$numberDecimal}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Weekend
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {ot.weekend.$numberDecimal}
            </div>
          </li>

          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Holyday
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {ot.holyday.$numberDecimal}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const AttendanceId = ({ attendaceId }: { attendaceId: number }) => {
  return (
    <div className="card shadow-header border border-cardBorder relative flex flex-col min-h-[150px] mb-[30px]">
      <div className="p-4 flex-grow flex-shrink basis-auto">
        <h3 className="text-xl mb-5">
          Attendance Id{" "}
          <span className="block float-right text-xs leading-6 bg-[#eeeeee] border border-select rounded-3xl w-[26px] min-h-[26px] text-center p-1 text-blue-600">
            <PencilIcon />
          </span>
        </h3>
        <ul className="personal-info">
          <li className="mb-[10px]">
            <div className="w-1/2 text-[#4f4f4f] float-left font-medium mr-[30px]">
              Current Attendance Id
            </div>
            <div className="text-[#4f4f4f] block overflow-hidden">
              {attendaceId ? attendaceId : "Not Found"}
            </div>
          </li>
          {/* {!attendaceId && (
                <div>
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Update an Id
                  </label>
                  <div className="flex">
                    <div className="mt-1 relative rounded-md shadow-sm w-1/2">
                      <input
                        type="number"
                        name="id"
                        id="id"
                        // onChange={(e) => setInputtedIdd(e.target.value)}
                        // className={error ? errorClass : normalClass}
                        step={1}
                        aria-invalid="true"
                        aria-describedby="email-error"
                        // value={inputtedId && inputtedId}
                      />
                      {error && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={dispatchUpdatingId}
                      disabled={!inputtedId}
                      className="ml-7 inline-flex disabled:bg-gray-400 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      This ID is already taken please find another
                    </p>
                  )}
                </div>
              )} */}
        </ul>
      </div>
    </div>
  );
};

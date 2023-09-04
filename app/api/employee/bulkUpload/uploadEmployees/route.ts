import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Allowance from "@/mongoDB/Allowance";
import CompanyAllowance from "@/mongoDB/CompanyAllowance";
import Contract from "@/mongoDB/Contract";
import Employee from "@/mongoDB/Employee";
import Overtime from "@/mongoDB/Overtime";
import WorkingHour from "@/mongoDB/WorkingHour";
import dbConnect from "@/mongoDB/dbConnect";
import { IAllowance, statusOfAllowance } from "@/types/allowance";
import { ICompanyAllowance } from "@/types/companyAllowance";
import { IContract } from "@/types/contract";
import { IEmployee } from "@/types/employee";
import { employeeData } from "@/types/employeeWithOutName/EmployeeMerged";
import { allowancePrepareWN } from "@/types/employeeWithOutName/forDbPrepare/allowancePrepare";
import { personalPrepare } from "@/types/employeeWithOutName/forDbPrepare/personalPrepare";
import { IOvertime } from "@/types/overTime";
import { IWorkingHour } from "@/types/workingHour";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  // const { data } = await req.json();
  const data = await req.json();
  // console.log(data);
  let companyAllowance: ICompanyAllowance[];
  type employeeError = {
    employee: employeeData;
    problem: string;
  };

  if (!session) {
    return NextResponse.json({ error: true, message: "Unauthenticated" });
  }
  if (!data) {
    return NextResponse.json({ error: true, message: "No Data Found" });
  }
  try {
    await dbConnect();
    companyAllowance = await CompanyAllowance.find().exec();
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error,
      From: "companyAllowance find ",
    });
  }

  try {
    await dbConnect();
    const employeesWithProblems: employeeError[] = [];
    const successfulEmployees: employeeData[] = [];
    let savedEmployee: IEmployee,
      savedContract: IContract,
      savedWorkingHour: IWorkingHour,
      savedOvertime: IOvertime,
      savedAllowance: IAllowance[] = [];
    // data.map(async (employee: employeeData) => {
    let index = 0;
    for (const employee of data) {
      console.log(index + " Iteration ============================");
      ++index;
      const dbSession = await mongoose.startSession();
      dbSession.startTransaction();
      const newEmployee = new Employee({
        ...employee.personal,
        tenantId: session.user.tenantId,
      });
      try {
        savedEmployee = await newEmployee.save({ session: dbSession });
      } catch (error) {
        console.log(error, "Error In Saving Personal Data ");
        employeesWithProblems.push({
          employee,
          problem: "Error In Saving Personal Data",
        });
        continue;
      }
      const newContract = new Contract({
        ...employee.contract,
        tenantId: session.user.tenantId,
        _employeeId: savedEmployee._id,
      });

      try {
        savedContract = await newContract.save({ session: dbSession });
      } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession;

        console.log(error, "Error In Saving Contract Data ");
        employeesWithProblems.push({
          employee,
          problem: "Error In Saving Contract Data",
        });
        continue;
      }

      const {haveOverNightShift,canBeRemote,statusOfWorkingHour,...wt} = employee.workingHour;

      const newWorkingHour = new WorkingHour({       
        _employeeId: savedEmployee._id,
        tenantId: session.user.tenantId,
        haveOverNightShift,
        canBeRemote,
        statusOfWorkingHour,
        workingHourTime:{...wt}
      });

      try {
        savedWorkingHour = await newWorkingHour.save({
          session: dbSession,
        });
      } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession;
        console.log(error, "Error In Saving Working Hour Data ");
        employeesWithProblems.push({
          employee,
          problem: "Error In Saving Working Hour Data",
        });
        continue;
      }

      const newOvertime = new Overtime({
        ...employee.overtime,
        tenantId: session.user.tenantId,
        _employeeId: savedEmployee._id,
      });
      try {
        savedOvertime = await newOvertime.save({ session: dbSession });
      } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession;
        console.log(error, "Error In Saving Overtime Data ");
        employeesWithProblems.push({
          employee,
          problem: "Error In Saving Overtime Data",
        });
        continue;
      }

      let updatedAllowance = employee.allowance?.map(
        (a: allowancePrepareWN) => {
          // console.log(a);
          let companyThisAllowance = companyAllowance.find(
            (o) => o.name === a.allowanceName
          );
          if (!companyThisAllowance) return;
          return {
            _companyAllowanceId: companyThisAllowance._id,
            amount: a.amount,
            statusOfAllowance: statusOfAllowance.Active,
            _employeeId: savedEmployee._id,
            tenantId: session.user.tenantId,
            isNet: a.isNet,
          };
        }
      );
      try {
        if (updatedAllowance) {
          // const newAllowance =  Allowance.insertMany(updatedAllowance);
          const allowanceAfterSaved = await Allowance.insertMany(
            updatedAllowance,
            {
              session: dbSession,
            }
          );
          if (allowanceAfterSaved.length > 0) {
            savedAllowance = allowanceAfterSaved.map((allowance) => ({
              _id: allowance._id,
              _companyAllowanceId: allowance._companyAllowanceId,
              amount: allowance.amount,
              statusOfAllowance: allowance.statusOfAllowance,
              _employeeId: allowance._employeeId,
              tenantId: allowance.tenantId,
              isNet: allowance.isNet,
              createdAt: allowance.createdAt,
              updatedAt: allowance.updatedAt,
            }));
          }
        }
      } catch (err) {
        await dbSession.abortTransaction();
        dbSession.endSession;
        console.log(err, "Error In Saving Allowance Data ");
        employeesWithProblems.push({
          employee,
          problem: "Error In Saving Allowance Data",
        });
        continue;
      }

      try {
        await Employee.findByIdAndUpdate(
          savedEmployee._id,
          {
            activeContract: { ...savedContract },
            activeWorkingHour: { ...savedWorkingHour },
            activeOvertime: { ...savedOvertime },
            activeAllowance: { ...savedAllowance },
          },
          { session: dbSession, new: true }
        );
      } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession;
        console.log(error, "Error In Updating Employee Data ");
        employeesWithProblems.push({
          employee,
          problem: "Error In Updating Employee Data",
        });
        continue;
      }

      try {
        await dbSession.commitTransaction();
        await dbSession.endSession();
        successfulEmployees.push(employee);
      } catch (error) {
        console.log("Error While Committing ", error);
        employeesWithProblems.push({ employee, problem: "on Committing " });
      }

      // res.status(500).json({ error: err, From: "Allowance" });
      // return;
    }

    return NextResponse.json({
      error: false,
      data: { successfulEmployees, employeesWithProblems },
    });
  } catch (e) {
    console.log(e, "Connecting to db ");
    return NextResponse.json({ error: true, message: e }, { status: 500 });
  }
};

import { allowanceTypeBulk } from "@/types/employeeUpload/bulkAllowance";
import { companyAllowanceTypeBulk } from "@/types/employeeUpload/bulkCompanyAllowance";
import { contractTypeBulk } from "@/types/employeeUpload/bulkContract";
import { overtimeTypeBulk } from "@/types/employeeUpload/bulkOverTime";
import { personalTypeBulk } from "@/types/employeeUpload/bulkPersonal";
import { workingHourTypeBulk } from "@/types/employeeUpload/bulkWorkingHour";
import { allowancePrepare } from "@/types/employeeUpload/forDbPrepare/allowancePrepare";
import { contractPrepare } from "@/types/employeeUpload/forDbPrepare/contractPrepare";
import { overtimePrepare } from "@/types/employeeUpload/forDbPrepare/overtimePrepare";
import { personalPrepare } from "@/types/employeeUpload/forDbPrepare/personalPrepare";
import { workingHourPrepare } from "@/types/employeeUpload/forDbPrepare/workingHourPrepare";
import { allowancePrepareWN } from "@/types/employeeWithOutName/forDbPrepare/allowancePrepare";
import { contractPrepareWN } from "@/types/employeeWithOutName/forDbPrepare/contractPrepare";
import { overtimePrepareWN } from "@/types/employeeWithOutName/forDbPrepare/overtimePrepare";
import { workingHourPrepareWN } from "@/types/employeeWithOutName/forDbPrepare/workingHourPrepare";

import { statusOfAllowance } from "../types/CustomStatus/status";
import {
  statusOfContract,
  statusOfEmployee,
  statusOfOvertime,
  statusOfWorkingHour,
} from "@/types/CustomStatus/status";
import { employeeData } from "@/types/employeeWithOutName/EmployeeMerged";

interface PreparedDataProps {
  //   companyAllowancesData: companyAllowanceTypeBulk[];
  workingHourData: workingHourTypeBulk[];
  overtimeData: overtimeTypeBulk[];
  allowanceData: allowanceTypeBulk[];
  contractData: contractTypeBulk[];
  personalData: personalTypeBulk[];
}

interface PreparedDataToDBProps {
  arrayOfEmployeePersonal: personalPrepare[];
  arrayOfEmployeeContract: contractPrepare[];
  arrayOfEmployeeAllowance: allowancePrepare[];
  arrayOfEmployeeOvertime: overtimePrepare[];
  arrayOfEmployeeWorkingHour: workingHourPrepare[];
}

export const PreparedData = ({
  workingHourData,
  overtimeData,
  allowanceData,
  contractData,
  personalData,
}: PreparedDataProps) => {
  let ArrayOfEmployeePersonalData: personalPrepare[] = [];

  personalData.forEach((employee) => {
    let personalEmployee: personalPrepare = {
      fullName: employee.fullName,
      phoneNumber: {
        primaryPhone: employee.phoneNumber,
        ...(employee.secondaryPhone && {
          secondaryPhone: employee.secondaryPhone,
        }),
      },

      birthDate: employee.birthDate,
      gender: employee.gender,
      ...(employee.email && { email: employee.email }),
      nationality: employee.nationality,
      employedDate: employee.employedDate,
      statusOfEmployee: statusOfEmployee.Active,
      beginningLeaveInfo: {},
      activeContract: {},
      activeWorkingHour: {},
      activeOvertime: {},
      activeAllowance: {},
      bankName: employee.bankName,
      bankNumber: employee.bankNumber,
      employeeAttendanceId: employee.employeeAttendanceId,
      ...(employee.street ||
        employee.zip ||
        employee.city ||
        employee.state ? {
          address: {
            ...(employee.street && { street: employee.street }),
            ...(employee.city && { city: employee.city }),
            ...(employee.state && { street: employee.state }),
            ...(employee.zip && { street: employee.zip }),
          },
        }:null),

      emergency: {
        phoneNumber: employee.emergencyPhone,
        contact: employee.emergencyName,
      },
      ...(employee.emergencyName2 &&
        employee.emergencyPhone2 && {
          emergency2: {
            contact: employee.emergencyName2,
            phoneNumber: employee.emergencyPhone2,
          },
        }),
    };
    ArrayOfEmployeePersonalData.push(personalEmployee);
  });

  let ArrayOfEmployeeContractData: contractPrepare[] = [];
  contractData.forEach((contract) => {
    let prepareContract: contractPrepare = {
      employeeName: contract.employeeName,
      statusOfContract: statusOfContract.Active,
      PartimeOrFullTime: contract.PartimeOrFullTime,
      permanentOrContract: contract.permanentOrContract,
      titleOfPosition: contract.titleOfPosition,
      department: contract.department,
      rateOfSalary: contract.rateOfSalary,
      startsFrom: contract.startsFrom,
      ...(contract.endsOn && { endsOn: contract.endsOn }),
      grossSalary: contract.grossSalary,
      reason: "First Contract",
    };
    ArrayOfEmployeeContractData.push(prepareContract);
  });

  let ArrayOfEmployeeAllowanceData: allowancePrepare[] = [];

  allowanceData.forEach((allowance) => {
    let prepareAllowance: allowancePrepare = {
      employeeName: allowance.employeeName,
      allowanceName: allowance.allowanceName,
      amount: allowance.amount,
      statusOfAllowance: statusOfAllowance.Active,
      isNet: allowance.isNet ? true : false,
    };
    ArrayOfEmployeeAllowanceData.push(prepareAllowance);
  });

  let ArrayOfEmployeeOvertimeData: overtimePrepare[] = [];
  overtimeData.forEach((overtime) => {
    let prepareOvertime: overtimePrepare = {
      before5Pm: overtime.before5Pm,
      after5Pm: overtime.after5Pm,
      weekend: overtime.weekend,
      holyday: overtime.holyday,
      employeeName: overtime.employeeName,
      statusOfOvertime: statusOfOvertime.Active,
    };
    ArrayOfEmployeeOvertimeData.push(prepareOvertime);
  });
  let ArrayOfEmployeeWorkingHourData: workingHourPrepare[] = [];
  workingHourData.forEach((workingHour) => {
    let prepareWorkingHour: workingHourPrepare = {
      employeeName: workingHour.employeeName,
      ...(workingHour.mondayIn && { mondayIn: workingHour.mondayIn }),
      ...(workingHour.mondayOut && { mondayOut: workingHour.mondayOut }),
      ...(workingHour.tuesdayIn && { tuesdayIn: workingHour.tuesdayIn }),
      ...(workingHour.tuesdayOut && { tuesdayOut: workingHour.tuesdayOut }),
      ...(workingHour.wednesdayIn && { wednesdayIn: workingHour.wednesdayIn }),
      ...(workingHour.wednesdayOut && {
        wednesdayOut: workingHour.wednesdayOut,
      }),
      ...(workingHour.thursdayIn && { thursdayIn: workingHour.thursdayIn }),
      ...(workingHour.thursdayOut && { thursdayOut: workingHour.thursdayOut }),
      ...(workingHour.fridayIn && { fridayIn: workingHour.fridayIn }),
      ...(workingHour.fridayOut && { fridayOut: workingHour.fridayOut }),
      ...(workingHour.saturdayIn && { saturdayIn: workingHour.saturdayIn }),
      ...(workingHour.saturdayOut && { saturdayOut: workingHour.saturdayOut }),
      ...(workingHour.sundayIn && { sundayIn: workingHour.sundayIn }),
      ...(workingHour.sundayOut && { sundayOut: workingHour.sundayOut }),
      statusOfWorkingHour: statusOfWorkingHour.Active,
      canBeRemote: workingHour.canBeRemote ? true : false,
      haveOverNightShift: workingHour.haveOverNightShift ? true : false,
    };
    ArrayOfEmployeeWorkingHourData.push(prepareWorkingHour);
  });

  if (
    ArrayOfEmployeePersonalData.length > 0 &&
    ArrayOfEmployeeContractData.length > 0 &&
    ArrayOfEmployeeAllowanceData.length > 0 &&
    ArrayOfEmployeeOvertimeData.length > 0 &&
    ArrayOfEmployeeWorkingHourData.length > 0
  ) {
    // console.log(ArrayOfEmployeeWorkingHourData.length)

    const merged= mergeEmployeesData({
      arrayOfEmployeePersonal: ArrayOfEmployeePersonalData,
      arrayOfEmployeeContract: ArrayOfEmployeeContractData,
      arrayOfEmployeeAllowance: ArrayOfEmployeeAllowanceData,
      arrayOfEmployeeOvertime: ArrayOfEmployeeOvertimeData,
      arrayOfEmployeeWorkingHour: ArrayOfEmployeeWorkingHourData,
    });
    // console.log(typeof merged)
    return merged;
  }
};



const mergeEmployeesData = ({
  arrayOfEmployeePersonal,
  arrayOfEmployeeContract,
  arrayOfEmployeeAllowance,
  arrayOfEmployeeOvertime,
  arrayOfEmployeeWorkingHour,
}: PreparedDataToDBProps) : employeeData[]=> {
  const employeesData: employeeData[] = [];
  // const employeesWithError = [];
  arrayOfEmployeePersonal.forEach((personal, index) => {
    let personalD: personalPrepare = personal;
    let contractD: contractPrepare | undefined = arrayOfEmployeeContract.find(
      (contract) => contract.employeeName == personal.fullName
    );
    let workingHourD: workingHourPrepare | undefined =
      arrayOfEmployeeWorkingHour.find(
        (workingHour) => workingHour.employeeName == personal.fullName
      );
    let allowanceD: allowancePrepare[] | undefined =
      arrayOfEmployeeAllowance.filter(
        (allowance) => allowance.employeeName == personal.fullName
      );
    let overtimeD: overtimePrepare | undefined = arrayOfEmployeeOvertime.find(
      (overtime) => overtime.employeeName == personal.fullName
    );
    // if (index == 0) {
    //   console.log(personalD);
    //   console.log(contractD);
    //   console.log(workingHourD);
    //   console.log(allowanceD);
    //   console.log(overtimeD);
    // }

    if (personalD && contractD && workingHourD && allowanceD && overtimeD) {
    //   console.log("Iam heree");
      const { employeeName, ...contractOnly } = contractD;
      const { employeeName: employeeNameW, ...workingHourOnly } = workingHourD;
      const { employeeName: employeeNameO, ...overtimeOnly } = overtimeD;

      const EAllowance: allowancePrepareWN[] = allowanceD.map((allowance) => {
        const { employeeName: employeeNameA, ...allowanceOnly } = allowance;
        return allowanceOnly;
      });

      employeesData.push({
        personal: personalD,
        contract: contractOnly,
        allowance: EAllowance,
        overtime: overtimeOnly,
        workingHour: workingHourOnly,
      });
    }

    // console.log(personal)

    //   arrayOfEmployeeContract.every((contract) => {
    //     if (contract.employeeName == personal.fullName) {
    //       const { employeeName, ...updatedContract } = contract;
    //       let EContract :contractPrepareWN = updatedContract
    //       return false;
    //     }
    //     return true;
    //   });
    //   let employeeAllowances;
    //   arrayOfEmployeeAllowance.forEach((allowance) => {
    //     if (allowance.employeeName == personal.fullName) {
    //       const { employeeName, ...updatedAllowance } = allowance;
    //       employeeAllowances.push(updatedAllowance);
    //     }
    //   });
    //     EAllowance=employeeAllowances;

    //   arrayOfEmployeeOvertime.every((overtime) => {
    //     if (overtime.employeeName == personal.fullName) {
    //       const { employeeName, ...updatedOvertime } = overtime;
    //         EOvertime= updatedOvertime
    //         return false;

    //       };
    //       return true;
    //     }
    //   );
    //   arrayOfEmployeeWorkingHour.every((workingHour) => {
    //     if (workingHour.employeeName == personal.fullName) {
    //       const { employeeName, ...updatedWorkingHour } = workingHour;
    //       EWorkingHour = updatedWorkingHour
    //       return false;
    //     }
    //     return true;
    //   });

    //   if (
    //     employee.notFiledRequired?.length > 0 ||
    //     employee.allowance.notFiledRequired?.length > 0 ||
    //     employee.contract.notFiledRequired?.length > 0 ||
    //     employee.overtime.notFiledRequired?.length > 0 ||
    //     employee.workingHour.notFiledRequired?.length > 0
    //   ) {
    //     employeesWithError.push(employee);
    //   } else {
    // employeesData.push({personal:EPersonal,contract:EContract,allowance:EAllowance,overtime:EOvertime,workingHour:EWorkingHour});
    //   }
  });
  return employeesData;
};

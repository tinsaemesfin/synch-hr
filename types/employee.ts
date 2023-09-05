import { ObjectId } from "mongoose";
import { statusOfOvertime } from "./CustomStatus/status";

export interface IEmployee {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  nationality: string;
  address?: address|undefined;
  emergency: emergency;
  emergency2?: emergency|undefined;
  activeContract: object;
  activeWorkingHour: object;
  activeOvertime: object;
  activeAllowance?: object;
  statusOfEmployee: statusOfEmployee;
  beginningLeaveInfo?: Object;
  bankName: string;
  bankNumber: number;
  tenantId: string;
  employeeAttendanceId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum statusOfEmployee {
  Active="Active",
  Deactivated="Deactivated",
}

type emergency={
  contact:string;
  phoneNumber:string;
}
type address = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export type activeOvertime={
  
    before10Pm: {
      $numberDecimal: number;
    },
    after10Pm: {
      $numberDecimal: number;
    },
    weekend: {
      $numberDecimal: number;
    },
    holyday: {
      $numberDecimal: number;
    },
   statusOfOvertime: statusOfOvertime,
    _employeeId: string,
    tenantId: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
  
}


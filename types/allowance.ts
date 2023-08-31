import { ObjectId } from "mongoose";

export interface IAllowance {
    _id: ObjectId;
    _companyAllowanceId: ObjectId;
    amount: number;
    _employeeId: ObjectId;
    isNet:boolean;
    statusOfAllowance: statusOfAllowance;
    tenantId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export enum statusOfAllowance {
    Active="Active",
    Deactivated="Deactivated",
    Expired="Expired",
  }
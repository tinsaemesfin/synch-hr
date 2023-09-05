import { ObjectId } from "mongoose";

export interface IContract {
  _id: ObjectId;
  statusOfContract: statusOfContract;
  typeOfContract: typeOfContract;
  permanentOrContract: permanentOrContract;
  titleOfPosition: string;
  department: string;
  startsFrom: Date;
  endsOn?: Date;
  grossSalary: {$numberDecimal:number};
  rateOfSalary: rateOfSalary;
  reason: string;
  _employeeId: ObjectId;
  tenantId: ObjectId;
}

export enum permanentOrContract {
  "Permanent",
  "Contract",
}
export enum typeOfContract {
  fullTime = "Full-Time",
  partTime = "Part-Time",
}
export enum rateOfSalary {
  monthly= "monthly", 
  hourly= "hourly",
  byService="byService",
}
export enum statusOfContract {
  Active = "Active",
  Deactivated = "Deactivated",
  Expired = "Expired",
}

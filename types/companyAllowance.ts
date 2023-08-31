import { ObjectId } from "mongoose";

export interface ICompanyAllowance {
  _id: ObjectId;
  name: string;
  type: number;
  frequency: number;
  minTaxable: number;
  minTaxableManage: number;
  statusOfCompanyAllowance: statusOfCompanyAllowance;
}


export enum statusOfCompanyAllowance {
  Active = "Active",
  Deactivated = "Deactivated",
  Expired = "Expired",
}
export enum TypeOFAllowance {
  constant = "Constant",
  vary = "Vary",
}
export enum FrequencyOfCompanyAllowance {
  monthly = "Monthly",
  byService = "By-Service",
}

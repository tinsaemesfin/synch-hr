import { ObjectId } from "mongoose";

export interface IPermission {
    _id: ObjectId;
    date:{from:Date,to:Date}
    _employeeId: ObjectId;
    reason:string;
    statusOfPermission: statusOfEmployeePermission;
    tenantId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export enum statusOfEmployeePermission{
    Pending="Pending",
    Approved="Approved",
    Rejected="Rejected",
    Canceled="Canceled",
    Completed="Completed",
  }
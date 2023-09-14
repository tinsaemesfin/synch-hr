import { ObjectId } from "mongoose";

export interface IEmployeeLeave {
    _id: ObjectId;
    slag:string
    comment: { type: String, required: false },
    date:{from:Date,to:Date}
    _employeeId: ObjectId;
    
    statusOfLeave: statusOfEmployeeLeave;
    tenantId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export enum statusOfEmployeeLeave{
    Pending="Pending",
    Approved="Approved",
    Rejected="Rejected",
    Canceled="Canceled",
    Completed="Completed",
  }
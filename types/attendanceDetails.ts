import { ObjectId } from "mongoose";

export interface IAttendanceDetails {
    _id: ObjectId;
    timeSheet: { [key: number]: Date[]};
    numberOfDays: number;
    monthYear: Date;
    employeeAttendanceId:number;
    tenantId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }

 
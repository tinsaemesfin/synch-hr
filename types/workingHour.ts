import { ObjectId } from "mongoose";

export interface IWorkingHour {
    _id: ObjectId;
    workingHourTime: WorkingHourTime;
    statusOfWorkingHour: statusOfWorkingHour;
    canBeRemote: boolean;
    _employeeId: ObjectId;
    tenantId: ObjectId;
    haveOverNightShift: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  type WorkingHourTime = {
    mondayIn?: string,
    mondayOut?: string,
    tuesdayIn?: string,
    tuesdayOut?: string,
    wednesdayIn?: string,
    wednesdayOut?: string,
    thursdayIn?: string,
    thursdayOut?: string,
    fridayIn?: string,
    fridayOut?: string,
    saturdayIn?: string,
    saturdayOut?: string,
    sundayIn?: string,
    sundayOut?: string,
  }
  export enum statusOfWorkingHour {
    Active="Active",
    Deactivated="Deactivated",
    Expired="Expired",
  }
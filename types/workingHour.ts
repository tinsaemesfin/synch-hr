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
    monday?:{
      in?: string;
      out?: string;
    },
    tuesday?:{
      in?: string;
      out?: string;
    },
    wednesday?:{
      in?: string;
      out?: string;
    },
    thursday?:{
      in?: string;
      out?: string;
    },
    friday?:{
      in?: string;
      out?: string;
    },
    saturday?:{
      in?: string;
      out?: string;
    },
    sunday?:{
      in?: string;
      out?: string;
    },

  }
  export enum statusOfWorkingHour {
    Active="Active",
    Deactivated="Deactivated",
    Expired="Expired",
  }
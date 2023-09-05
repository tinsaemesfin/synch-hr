import { ObjectId } from "mongoose";
import { statusOfOvertime } from "./CustomStatus/status";

export interface IOvertime {
  _id: ObjectId;
  overtimeTime: otDetails;
  statusOfOvertime: statusOfOvertime;
  _employeeId: ObjectId;
  tenantId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

type otDetails = {
  before10Pm: {$numberDecimal:number};
  after10Pm: {$numberDecimal:number};
  weekend: {$numberDecimal:number};
  holyday: {$numberDecimal:number};
};

import {  statusOfOvertime } from "@/types/CustomStatus/status";

export type overtimePrepare = {
  employeeName: string;
  before10Pm: number;
  after10Pm: number;
  weekend: number;
  holyday: number;
  statusOfOvertime: statusOfOvertime;
};


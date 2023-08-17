import {  statusOfOvertime } from "@/types/CustomStatus/status";

export type overtimePrepare = {
  employeeName: string;
  before5Pm: number;
  after5Pm: number;
  weekend: number;
  holyday: number;
  statusOfOvertime: statusOfOvertime;
};


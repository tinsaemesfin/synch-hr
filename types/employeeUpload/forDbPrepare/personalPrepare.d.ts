import { statusOfEmployee } from "@/types/CustomStatus/status";

export type personalPrepare = {
  fullName: string;
  phoneNumber: PhoneNumber;
  employeeAttendanceId: number;
  nationality: string;
  birthDate: Date;
  email?: string;
  gender: string;
  employedDate: Date;
  address?: Address;
  emergency: emergency;
  emergency2?: emergency;
  bankName: string;
  bankNumber: string;
  statusOfEmployee: statusOfEmployee;
  beginningLeaveInfo: Object;
  activeContract: Object;
  activeWorkingHour: Object;
  activeOvertime: Object;
  activeAllowance: Object;
};

type PhoneNumber = {
  primaryPhone: string;
  secondaryPhone?: string;
};
type Address = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};
type emergency = {
  phoneNumber: string;
  contact: string;
};

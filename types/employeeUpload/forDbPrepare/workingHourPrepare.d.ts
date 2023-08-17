import { statusOfWorkingHour } from "@/types/CustomStatus/status";

export type workingHourPrepare = {
    employeeName: string;
    mondayIn?: string;
    mondayOut?: string;
    tuesdayIn?: string;
    tuesdayOut?: string;
    wednesdayIn?: string;
    wednesdayOut?: string;
    thursdayIn?: string;
    thursdayOut?: string;
    fridayIn?: string;
    fridayOut?: string;
    saturdayIn?: string;
    saturdayOut?: string;
    sundayIn?: string;
    sundayOut?: string;
    canBeRemote?:boolean; 
    haveOverNightShift?:boolean; 
    statusOfWorkingHour:statusOfWorkingHour;  
  };

 
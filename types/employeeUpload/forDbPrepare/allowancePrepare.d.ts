import { statusOfAllowance } from "@/types/CustomStatus/status";

export type allowancePrepare={
    employeeName:string;
    allowanceName :string;
    amount:number,
    isNet:boolean,
    statusOfAllowance:statusOfAllowance,
    }

   
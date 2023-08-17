import { permanentOrContract, rateOfSalary, typeOfContract } from "@/types/contract";
import { statusOfContract } from "@/types/CustomStatus/status";

export type contractPrepare={
    employeeName:string;
    permanentOrContract :permanentOrContract;
    PartimeOrFullTime:typeOfContract;
    grossSalary:number;
    rateOfSalary:rateOfSalary;
    titleOfPosition:string;
    department:string;
    startsFrom:Date;
    endsOn?:Date;
    reason:string;
    statusOfContract:statusOfContract;
    }



    
import { statusOfContract } from "@/types/CustomStatus/status";
import { permanentOrContract, rateOfSalary, typeOfContract } from "@/types/contract";

export type contractPrepareWN={
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


    
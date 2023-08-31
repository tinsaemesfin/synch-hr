import { permanentOrContract, rateOfSalary, typeOfContract } from "../contract";

export type contractTypeBulk={
employeeName:string;
permanentOrContract :permanentOrContract;
typeOfContract:typeOfContract;
grossSalary:number;
rateOfSalary:rateOfSalary;
titleOfPosition:string;
department:string;
startsFrom:Date;
endsOn?:Date
}

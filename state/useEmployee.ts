import { IEmployee } from "@/types/employee";
import { create } from "zustand";

interface IEmployeeState{
    employee:IEmployee|null;
    token:string|null;
    setEmployee:(e:IEmployee) =>void;
    setToken:(t:string) =>void;
  }
 export const useAnEmployee = create<IEmployeeState>()((set)=>({
    employee:null,
    token:null,
    setEmployee:(e:IEmployee) => set((state)=>({employee:e})),
    setToken:(t:string) => set((state)=>({token:t}))
  }));
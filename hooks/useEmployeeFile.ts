import { create } from "zustand";

interface EmployeeFileProps {
    file: string;
    isFileReady: boolean;
    setFile: (file: string) => void;
    setIsFileReady: (isFileReady: boolean) => void;
    
}


export const useEmployeeFile = create<EmployeeFileProps>((set)=>({
    file:'',
    isFileReady:false,
    setFile: (file: string) => set(()=>({file:file})),
    setIsFileReady: (isFileReady: boolean) => set(()=>({isFileReady:isFileReady})),
  }));
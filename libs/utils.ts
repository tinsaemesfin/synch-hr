import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const equalsCheck = (a:string[], b:string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);
export const slugify = (str:string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');


    export const ExcelDateToJSDate = (serial:number):Date => {
      var utc_days = Math.floor(serial - 25569);
      var utc_value = utc_days * 86400;
      var date_info = new Date(utc_value * 1000);
    
      var fractional_day = serial - Math.floor(serial) + 0.0000001;
    
      var total_seconds = Math.floor(86400 * fractional_day);
    
      var seconds = total_seconds % 60;
    
      total_seconds -= seconds;
    
      var hours = Math.floor(total_seconds / (60 * 60));
      var minutes = Math.floor(total_seconds / 60) % 60;
    
      return new Date(
        date_info.getFullYear(),
        date_info.getMonth(),
        date_info.getDate(),
        hours,
        minutes,
        seconds
      );
    };
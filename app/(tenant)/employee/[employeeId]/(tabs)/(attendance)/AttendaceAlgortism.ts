import { IattendaceEmployee } from "./attendance"

export function compareTimes(time1:string, time2:string):number {
    const [hour1, minute1] = time1?.split(":").map(Number);
    const [hour2, minute2] = time2?.split(":").map(Number);
  
    if (hour1 > hour2) {
      return getTimeDifference(hour1, minute1, hour2, minute2);       
      
    } else if (hour2 > hour1) {
      return getTimeDifference(hour2, minute2, hour1, minute1);     
     
    } else {
      if (minute1 > minute2) {
        return getTimeDifference(hour1, minute1, hour2, minute2);         
      
      } else if (minute2 > minute1) {
        return getTimeDifference(hour2, minute2, hour1, minute1);
         
      } else {       
           return getTimeDifference(hour1, minute1, hour2, minute2);          
      }
    }
  }

  
function getTimeDifference(hour1:number, minute1:number, hour2:number, minute2:number):number {
    const minutes1 = hour1 * 60 + minute1;
    const minutes2 = hour2 * 60 + minute2;
    const difference = Math.abs(minutes2 - minutes1);  
    const hours = Math.floor(difference / 60);
    const minutes = Number(((difference % 60)/60).toFixed(2));
  
    return  hours+minutes ;
  }
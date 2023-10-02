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

  
export function getTimeDifference(hour1:number, minute1:number, hour2:number, minute2:number):number {
    const minutes1 = hour1 * 60 + minute1;
    const minutes2 = hour2 * 60 + minute2;
    const difference = Math.abs(minutes2 - minutes1);  
    const hours = Math.floor(difference / 60);
    const minutes = Number(((difference % 60)/60).toFixed(2));
  
    return  hours+minutes ;
  }

  export function PenaltyMoneyCalculator(grossSalary: number, hours: number) {
    
    return Number(((grossSalary / 192) * hours).toFixed(2));
  }
  export function OtMoneyCalculator(grossSalary: number, hours: number,isWeekend?:boolean) {
    if(isWeekend){
      return Number(((grossSalary / 176) * hours * 3).toFixed(2));
    }
    else 
    return Number(((grossSalary / 176) * hours*2.5).toFixed(2));
  }


  export function isSameMonthYear(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  }
  export function getMinMaxDates(dates: Date[]): { minDate: Date; maxDate: Date } {
    const sortedDates = dates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const minDate = new Date((new Date(sortedDates[0]).getTime()-(180*60000)));
    const maxDate = new Date((new Date(sortedDates[sortedDates.length - 1]).getTime()-(180*60000)));
    return { minDate, maxDate };
  }
  export function calculateAttendance(
    time: string | undefined,
    date: Date,
    isIn: boolean,
    isOt?: boolean
  ): { penaltyTimeNumber: number; penaltyTimeText: string } | null {
    if (!time) {
      return null;
    }
  
    const [hour, minute] = time.split(":");
    let workingHourWithT = new Date(date);
    workingHourWithT.setHours(Number(hour), Number(minute), 0, 0);
    const workingHour = workingHourWithT.getTime();
    const attendanceTime = new Date(date).getTime();
    let diff = 0;
    let diffInHours = 0;
    let diffInMinutes = 0;
    if (isIn) {
      diff = workingHour - (attendanceTime - 600000);
      console.log(diff,workingHourWithT,attendanceTime)
      // 10 minite buffer Zone
      if (diff > -60000) {
        
        if (isOt && diff <-60000) {
          
          const minutesLate = Math.abs(diff / 60000);
          diffInHours = Math.floor(minutesLate / 60);
          diffInMinutes = Math.floor(minutesLate % 60);
          let penaltyTimeNumber =
            Number(diffInHours) + Number((diffInMinutes / 60).toFixed(2));
          let penaltyTimeText = `${diffInHours
            .toString()
            .padStart(2, "0")}:${diffInMinutes.toString().padStart(2, "0")}`;
  
          return { penaltyTimeNumber, penaltyTimeText };
        }
        return null;
      }
      const minutesLate = Math.abs(diff / 60000);
      diffInHours = Math.floor(minutesLate / 60);
      diffInMinutes = Math.floor(minutesLate % 60);
    } else {
      diff = attendanceTime - workingHour;
      if (diff > 0) {
        if (isOt) {
          const minutesLate = Math.abs(diff / 60000);
          diffInHours = Math.floor(minutesLate / 60);
          diffInMinutes = Math.floor(minutesLate % 60);
          let penaltyTimeNumber =
            Number(diffInHours) + Number((diffInMinutes / 60).toFixed(2));
          let penaltyTimeText = `${diffInHours
            .toString()
            .padStart(2, "0")}:${diffInMinutes.toString().padStart(2, "0")}`;
  
          return { penaltyTimeNumber, penaltyTimeText };
        }
        return null;
      }
      const minutesLate = Math.abs(diff / 60000);
      diffInHours = Math.floor(minutesLate / 60);
      diffInMinutes = Math.ceil(minutesLate % 60);
    }
  
    //  return  like 1.5 hour mean 1 hour 30 minutes only in  two decimal points mean not 1.556 but like 1.55
  
    let penaltyTimeNumber =
      Number(diffInHours) + Number((diffInMinutes / 60).toFixed(2));
    let penaltyTimeText = `${diffInHours
      .toString()
      .padStart(2, "0")}:${diffInMinutes.toString().padStart(2, "0")}`;
  
    return { penaltyTimeNumber, penaltyTimeText };
  }
  
  export const minTwoDigits = (n: number) => {
    return (n < 10 ? "0" : "") + n;
  };
  
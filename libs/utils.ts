import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const equalsCheck = (a:string[], b:string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);
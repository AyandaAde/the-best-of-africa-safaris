import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function convertToAscii(inputString: string){
  //* Remove non ascii characters
  return inputString.replace(/[^\x00-\x7F]+/g, "");
}

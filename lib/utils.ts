import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zerologon.vercel.app"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

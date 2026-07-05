import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function proxyImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  const match = url.match(/\/v1\/images\/(.+)$/);
  if (match) return `/api/images/${match[1]}`;
  return url;
}

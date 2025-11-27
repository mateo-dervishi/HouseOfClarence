import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, includeVat: boolean = true): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(price)
}

export function formatPriceWithVat(price: number, priceExVat: number): string {
  return `${formatPrice(price)} (${formatPrice(priceExVat)} EX VAT)`
}


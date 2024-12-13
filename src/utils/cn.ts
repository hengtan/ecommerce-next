import clsx from 'clsx'; // Instale com `npm install clsx`
import { twMerge } from 'tailwind-merge'; // Instale com `npm install tailwind-merge`

export function cn(...classes: any[]) {
    return twMerge(clsx(classes));
}
import clsx from "clsx";
import { twMerge } from "tw-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function getRandomInt(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}
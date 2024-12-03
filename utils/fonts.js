import localFont from "next/font/local"
import { Merriweather_Sans, Space_Mono, Space_Grotesk } from "next/font/google"

export const brittiSans = localFont({
  src: [
    {
      path: "../fonts/britti-sans-regular.woff2",
      weight: "400",
      style: "regular"
    },
    {
      path: "../fonts/britti-sans-medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../fonts/britti-sans-semibold.woff2",
      weight: "600",
      style: "normal"
    }
  ],
  fallback: ["Helvetica", "ui-sans-serif"],
  display: "swap",
  variable: "--font-britti-sans"
})

export const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather-sans"
})

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: '400',
  variable: "--font-space-mono"
})
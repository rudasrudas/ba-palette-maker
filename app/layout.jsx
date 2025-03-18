import Analytics from "@components/page-structure/Analytics"
import Favicon from "@components/page-structure/Favicon"
// import { ThemeProvider } from "@components/ui/ThemeProvider"
import { ThemeProvider } from "next-themes"
import { ConsentProvider } from "@context/ConsentContext"
import "@styles/global.css"

import { brittiSans } from "@utils/fonts"
import { Suspense } from "react"
import ClaritySnippet from "@components/page-structure/ClaritySnippet"

export const metadata = {
  title: "Color Palette Maker - Generate, perfect and export",
  description: "Free color tool ideal for web and graphic designers. Create palettes for Websites, Apps, Company branding and much more.",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <Suspense>
                <ThemeProvider attribute="class">
                    <ConsentProvider>
                        <head>
                            <Favicon />
                            <ClaritySnippet />
                        </head>
                        <body className={`${brittiSans.className} overflow-x-hidden min-h-dvh h-full w-full flex flex-col items-stretch bg-white dark:bg-black`}>
                            {children}
                        </body>
                        <Analytics/>
                    </ConsentProvider>
                </ThemeProvider>
            </Suspense>
        </html>
    )
}

'use client'

const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)

import dynamic from 'next/dynamic'

export function ThemeProvider({ children, ...props }) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
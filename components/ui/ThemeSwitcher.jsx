'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Switch from "./inputs/Switch"
import ParameterSmall from "./ParameterSmall"

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (theme === 'system') {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            setIsDarkMode(systemPreference === 'dark')
        } else {
            setIsDarkMode(theme === 'dark')
        }
    }, [theme])

    if (!mounted) {
        return null
    }

    const handleThemeChange = () => {
        const newTheme = isDarkMode ? 'light' : 'dark'
        setTheme(newTheme)
        setIsDarkMode(!isDarkMode)
    }

    return (
        <ParameterSmall title="Dark mode" horizontal={true} className='hidden sm:flex'>
            <Switch
                value={theme} 
                setValue={handleThemeChange} 
                isOn={isDarkMode}
                tracking={{
                    action: 'switch_theme',
                    category: 'Switch',
                    label: 'Switch theme',
                }}
            />
        </ParameterSmall>
    )
}
export default ThemeSwitcher
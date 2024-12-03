'use client'
import { useEffect } from 'react'

const Favicon = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const favicon = document.getElementById('favicon')
      
      if (darkModeMediaQuery.matches) {
        favicon.href = '/svg/logo-dark.svg'
      } else {
        favicon.href = '/svg/logo.svg'
      }
    }

    updateFavicon()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon)

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateFavicon)
    }
  }, [])

  return (
    <link id="favicon" rel="icon" href="/favicon.svg" />
  )
}

export default Favicon
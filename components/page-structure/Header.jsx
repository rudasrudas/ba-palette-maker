'use client';

import ButtonPrimary from '@components/ui/inputs/buttons/ButtonPrimary'
import ButtonRow from '@components/ui/inputs/buttons/ButtonRow'
import Logo from '@components/ui/Logo'

const Header = ({ children }) => {
  return (
    <header className='sticky top-0 w-full z-50'>
        <div className='flex justify-between items-center py-2 px-4 gap-4 bg-white dark:bg-black'>
            <Logo/>
            <ButtonPrimary className='invisible pointer-events-none'>.</ButtonPrimary>
            <ButtonRow>{children}</ButtonRow>
        </div>
        <div className="bottom-0 w-full border-b border-black dark:border-white"></div>
    </header>
  )
}

export default Header
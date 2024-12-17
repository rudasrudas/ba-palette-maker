'use client';

import ButtonPrimary from '@components/ui/inputs/buttons/ButtonPrimary'
import ButtonRow from '@components/ui/inputs/buttons/ButtonRow'
import Logo from '@components/ui/Logo'
import React from 'react';

const Header = ({ children }) => {
  let toolbar = null;
  let actions = null;

  React.Children.forEach(children, (child) => {
    if (child?.type === Header.Toolbar) {
      toolbar = child;
    } else if (child?.type === Header.Actions) {
      actions = child;
    }
  });

  return (
    <header className='sticky top-0 w-full z-50'>
        <div className='flex justify-start items-center py-1 px-4 gap-4 bg-white dark:bg-black'>
            <Logo/>
            <ButtonRow className='mr-auto !gap-1'>
              {toolbar}
            </ButtonRow>
            {/* <ButtonPrimary className='invisible pointer-events-none'>.</ButtonPrimary> */}
            <ButtonRow>{actions}</ButtonRow>
        </div>
        <div className="bottom-0 w-full border-b border-black dark:border-white"></div>
    </header>
  )
}

Header.Toolbar = ({ children }) => {
  return <>{children}</>;
};

Header.Actions = ({ children }) => {
  return <>{children}</>;
};

export default Header
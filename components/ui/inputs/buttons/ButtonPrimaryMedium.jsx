'use client'

import Link from "next/link"
import * as gtag from '@utils/gtag'

const HTMLButton = (props) => {
  return <button {...props}/>
}

const ButtonPrimaryMedium = ({ children, className, href, disabled, Icon, tracking, onClick, ...props }) => {
  const Button = typeof href === 'string' ? Link : HTMLButton

  const handleOnClick = () => {
    if(!onClick) return
    if(tracking) gtag.event(tracking)
    onClick()
  }
  
  return (
        <Button 
            onClick={handleOnClick}
            disabled={disabled} 
            href={href} 
            className={`font-medium whitespace-nowrap text-sm h-fit p-2 leading-none rounded-lg flex gap-2 items-center w-fit border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-all active:bg-white dark:active:bg-black active:text-black dark:active:text-white ${className}`} 
            { ...props }
        >
            {children}
            {Icon && <Icon className='w-4 h-4'/>}
        </Button>
    )
}
  
export default ButtonPrimaryMedium
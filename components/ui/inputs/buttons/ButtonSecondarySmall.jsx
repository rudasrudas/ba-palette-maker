'use client'

import Link from "next/link"
import * as gtag from '@utils/gtag'

const HTMLButton = (props) => {
  return <button {...props}/>
}

const ButtonSecondarySmall = ({ children, className, href, disabled, Icon, tracking, onClick, ...props }) => {
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
            className={`font-medium text-xs h-fit p-1 leading-none rounded-md flex gap-1 items-center w-fit border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:scale-105 transition-all active:bg-black dark:active:bg-white active:text-white dark:active:text-black ${className}`}
            { ...props }
            >
            {children}
            {Icon && <Icon className='w-3 h-3'/>}
        </Button>
    )
}
  
export default ButtonSecondarySmall
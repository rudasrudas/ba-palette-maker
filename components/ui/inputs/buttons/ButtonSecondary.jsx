'use client'

import Link from "next/link"
import * as gtag from '@utils/gtag'

const HTMLButton = (props) => {
    return <button {...props}/>
}

const ButtonSecondary = ({ children, className, disabled = false, href, Icon = null, onClick, tracking, ...props }) => {
    const Button = typeof href === 'string' ? Link : HTMLButton

    const handleOnClick = () => {
      if(!onClick) return
      if(tracking) gtag.event(tracking)
      onClick()
    }

    return (
        <Button 
          style={{
            paddingBlock: 'clamp(8px, 1vw, 12px)',
            paddingInline: 'clamp(8px, 2vw, 16px)',
            fontSize: 'clamp(14px, 2vw, 16px)'
          }}
          onClick={handleOnClick}
          href={href} 
          disabled={disabled} 
            className={`whitespace-nowrap font-medium h-fit leading-none rounded-lg flex gap-2 items-center w-fit border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:scale-105 transition-all active:bg-black dark:active:bg-white active:text-white dark:active:text-black ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
          { ...props }
        >
            {children}
            {Icon && 
                <Icon style={{
                    width: 'clamp(16px, 3vw, 24px)',
                    height: 'clamp(16px, 3vw, 24px)'
                }}/>
            }
        </Button>
    )
}
export default ButtonSecondary
'use client'

import { useState } from "react"

const ImageWrapper = ({ className, children, ...props }) => {

    const [hover, setHover] = useState(false)

    return (
        <div 
            className={`group/img relative border border-black dark:border-white rounded-xl w-full h-50 max-w-xl max-h-lg bg-black dark:bg-white overflow-hidden ${className}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...props}
        >
            {children}
            <div
                className='w-full h-full z-10 absolute inset-0 transition-all'
            />
        </div>
    )
}
export default ImageWrapper
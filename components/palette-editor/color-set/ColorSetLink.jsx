import { IconLink, IconUnlink } from "@tabler/icons-react"
import { useState } from "react"

const ColorSetLink = ({ isSelected, className, ...props }) => {

    const [isHovered, setIsHovered] = useState(false)

    const Icon = isHovered ? IconUnlink : IconLink

    if(!isSelected) 
    return (
        <div 
            className={`w-full ${className}`} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <Icon className='invisible w-4 h-4 mx-auto cursor-pointer'/>
        </div>
    )
}
export default ColorSetLink
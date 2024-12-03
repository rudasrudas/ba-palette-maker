import Color from "@components/palette-editor/color-set/Color"
import ColorSetHeader from "@components/palette-editor/color-set/ColorSetHeader"
import { useState } from "react"

const ColorSuggestion = ({ className, color, isSelected, select }) => {

    const [isHovered, setIsHovered] = useState(false)

    const hoverEffect = isSelected ? '' : (isHovered ? 'py-4' : 'py-6') + ` hover:py-4 group-hover/color-group-header:py-4`

    const colorObject = {
        oklch: color.oklch,
        text: {
            hex: color.hex
        },
        name: color.name
    }

    return (
        <div 
            onClick={select}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            className={`group/color-set max-w-32 w-full grow flex flex-col gap-2 min-w-20 transition-all min-h-[20dvh] ${hoverEffect} ${className}`}
        >
            <ColorSetHeader
                color={colorObject}
                isHovered={isHovered}
            />
            <Color color={colorObject} transition={false} className='min-h-[20dvh] rounded-lg'/>
        </div>
    )
}
export default ColorSuggestion
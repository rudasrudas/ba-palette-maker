import Color from "@components/palette-editor/color-set/Color"
import ColorSetHeader from "@components/palette-editor/color-set/ColorSetHeader"
import { useState } from "react"

const ColorSuggestion = ({ className, color, isSelected = false, select }) => {

    const [isHovered, setIsHovered] = useState(false)

    const hoverEffect = isSelected ? '' : (isHovered ? 'p-0' : 'p-1') + ` hover:p-0 group-hover/color-group-header:p-0`

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
            className={`transition-all group/color-set max-w-32 min-h-8 min-w-8 w-10 h-10 ${hoverEffect} ${className}`}
        >
            <Color color={colorObject} transition={false} className={`transition-all rounded-full w-full h-full`}/>
        </div>
    )
}
export default ColorSuggestion
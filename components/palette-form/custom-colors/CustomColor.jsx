import { useState } from "react"
import { hexToOklch } from "@utils/colorConversion"
import ColorInput from "@components/ui/inputs/text/ColorInput"
import { oklchToColorObject } from "@hooks/useSuggestions"
import ColorSetHeader from "@components/palette-editor/color-set/ColorSetHeader"

const CustomColor = ({ id, color, setColor, remove, className, ...props }) => {

    const [isHovered, setIsHovered] = useState(false);

    const hex = color?.text?.hex
    const setHex = (v) => {
        const oklch = hexToOklch(v) || null
        if(oklch) {
            setColor(oklchToColorObject(oklch))
        } else {
            setColor(prev => ({...prev, empty: true}))
        }
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex gap-2 w-full max-w-32 min-w-10 grow flex-col h-full min-h-32 transition-all ${className}`}
            {...props}
        >
            <div className={`h-full flex flex-col gap-2 grow`}>
                <ColorSetHeader
                    color={color}
                    selectColorSet={!isHovered}
                    removeColor={remove}
                />
                <ColorInput
                    id={id}
                    color={hex}
                    setColor={setHex}
                />
            </div>
        </div>
    )
}
export default CustomColor
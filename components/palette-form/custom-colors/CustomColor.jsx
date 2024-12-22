import { useEffect, useRef, useState } from "react"
import useColorName from "@hooks/useColorName"
import { hexToOklch, isOklch, oklchToHex } from "@utils/colorConversion"
import ColorInput from "@components/ui/inputs/text/ColorInput"
import { oklchToColorObject } from "@hooks/useSuggestions"
import ColorSetHeader from "@components/palette-editor/color-set/ColorSetHeader"

const CustomColor = ({ id, color, setColor, remove, className, ...props }) => {

    const [hex, setHex] = useState(color?.text?.hex)
    const [name, setName] = useState(null)
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        const oklch = hexToOklch(hex) || null
        if(oklch) {
            const newName = useColorName({ colors: [{ hex }], useShort: true });
            setName(newName);
            setColor(oklchToColorObject(oklch))
        } else {
            setName(null);
            setColor(prev => ({...prev, empty: true}))
        }

    }, [hex])

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex gap-2 w-full max-w-32 min-w-10 grow flex-col h-full min-h-32 transition-all ${className}`}
            {...props}
        >
            <div className={`h-full flex flex-col gap-2 grow`}>
                <ColorSetHeader
                    color={{
                        ...color,
                        name
                    }}
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
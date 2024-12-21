import Color from "@components/palette-editor/color-set/Color"
import ColorSetHeader from "@components/palette-editor/color-set/ColorSetHeader"
import InputHex from "@components/ui/inputs/text/InputHex"
import { useEffect, useRef, useState } from "react"
import useColorName from "@hooks/useColorName"
import { hexToOklch, isOklch, oklchToHex } from "@utils/colorConversion"
import ColorInputAnimation from "@components/landing/generation/graphics/ColorInputAnimation"
import ColorInput from "@components/ui/inputs/text/ColorInput"

const CustomColor = ({ id, color, setColor, isSelected, select, deselect, remove, className, ...props }) => {

    const inputRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [hex, setHex] = useState(color?.text?.hex)
    const [name, setName] = useState(null)

    const hoverEffect = isSelected ? '' : (isHovered ? 'py-4' : 'py-6') + ` hover:py-4 group-hover/color-group-header:py-4`

    const handleClick = () => {
        if(isSelected && document.activeElement !== inputRef.current && !color.empty) {
            deselect()
        } else {
            select()
            inputRef.current?.focus()
        }
    }

    // useEffect(() => {
    //     if(!isOklch(color?.oklch)) return

    //     setHex(oklchToHex(color.oklch))
    // }, [color?.oklch])
    
    useEffect(() => {
        const oklch = hexToOklch(hex) || null
        if(oklch) {
            const newName = useColorName({ colors: [{ hex }], useShort: true });
            setName(newName);
            setColor(prev => ({...prev, empty: false}))
        } else {
            setName(null);
            setColor(prev => ({...prev, empty: true}))
        }

        setColor(prev => ({ ...prev, oklch }))
    }, [hex])

    const colorObject = {
        oklch: color.oklch,
        name: name || 'New color',
        text: {
            hex
        }
    }

    return (
        <div 
            // onClick={handleClick}
            // onMouseEnter={() => setIsHovered(true)} 
            // onMouseLeave={() => setIsHovered(false)}
            className={`flex gap-2 w-full max-w-32 min-w-10 grow flex-col h-full min-h-[250px] transition-all ${hoverEffect} ${className}`}
            {...props}
        >
            {/* <ColorSetHeader
                color={colorObject}
                isHovered={isHovered}
                className={!color.empty ? '' : 'invisible'}
                isSelected={isSelected && !color.empty}
                removeColor={remove}
            /> */}
            <div className={`h-full flex flex-col gap-2 grow`}>
                {/* <Color
                    color={colorObject}
                    colorFormat={{ value: null }}
                    transition={false}
                    className={`grow rounded-t-lg ${color.oklch ? 'border-transparent' : 'border-black dark:border-white'} transition-all border rounded-lg`}
                /> */}
                <ColorInput
                    id={id}
                    color={colorObject}
                    setColor={setHex}
                />
                {/* <InputHex
                    ref={inputRef}
                    value={hex}
                    onFocus={select}
                    onChange={setHex}
                    className=''
                /> */}
            </div>
        </div>
    )
}
export default CustomColor
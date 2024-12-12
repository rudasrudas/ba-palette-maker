import useColor from "@hooks/useColor";
import Color from "./Color";
import ColorSetHeader from "./ColorSetHeader";
import { useEffect, useState } from "react";
import useColorName from "@hooks/useColorName";
import { SETTING_TYPES } from "@hooks/useActiveSetting"

const ColorSet = ({ color, setColor, colorGroup, isActiveColorSet, selectSetting, contrastBaseColor, setContrastBaseColor, isActiveSetting, isHovered, removeColor, linkFunctions, ...props }) => {

    const COLOR_INFO = {
        count: colorGroup.count,
        lightness: colorGroup.lightness,
        chroma: colorGroup.chroma,
        hue: color.hue,
        advanced: colorGroup.advanced
    }

    const colors = useColor(COLOR_INFO)
    const autoName = useColorName({ colors })

    useEffect(() => {
        if(!color.isLocked) {
            setColor(prev => ({ ...prev, name: autoName }))
        }
    }, [colorGroup.chroma, color.hue, colorGroup.tintDistribution, color.isLocked])

    const renderColors = () => {
        return colors?.map((c, index) => <Color key={index} color={c} selectColorSet={selectColorSet} contrastBaseColor={contrastBaseColor} setContrastBaseColor={setContrastBaseColor} />)
    }

    const selectColorSet = () => {
        if(isActiveSetting(color.id) === SETTING_TYPES.colorSet)
            selectSetting.general()
        else if(color.empty) 
            selectSetting.addColorSet(color.id)
        else
            selectSetting.colorSet(color.id)
    }

    const renderEmptyColors = () => {
        const colors = []

        for(let i = 0; i < colorGroup.count; i++) {
            colors.push(
                <div 
                    onClick={selectColorSet} 
                    className={`${i === colorGroup.count - 1 ? '' : 'border-b border-black dark:border-white'} min-h-4 cursor-pointer grow-[3] hover:grow-[5] transition-all`}
                ></div>
            )
        }

        return colors
    }

    const hoverEffect = isActiveColorSet ? '' : (isHovered ? 'py-2' : 'py-6') + ` hover:py-2 group-hover/color-group-header:py-2`

    return (
        <div className={`group/color-set col-span-1 row-span-1 row-start-2 flex flex-col min-w-30 transition-all min-h-[40vh] grow ${hoverEffect}`} {...props} >
            <ColorSetHeader
                isEditable={true}
                isLockable={true}
                color={color}
                setColor={setColor}
                selectColorSet={selectColorSet}
                isSelected={isActiveSetting(color.id)}
                removeColor={removeColor}
                className='pb-2'
                linkFunctions={linkFunctions}
            />
            <div className={`
                flex flex-col 
                rounded-lg overflow-hidden 
                w-full h-full
                border
                transition-all
                ${(color.hue && !color.empty) ? 'border-transparent' : 'border-black dark:border-white'}
            `}>
                { (color.hue && !color.empty) ? renderColors() : renderEmptyColors() }
            </div>
        </div>
    )
}

export default ColorSet
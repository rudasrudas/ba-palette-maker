import ColorSetList from "../color-set/ColorSetList"
import ColorGroupHeader from "./ColorGroupHeader"
import { useState } from "react"
import { SETTING_TYPES } from "@hooks/useActiveSetting"

export const MAX_COLORS_IN_COLOR_GROUP = 4;

const ColorGroup = ({ palette, setPalette, colorGroup, setColorGroup, contrastBaseColor, setContrastBaseColor, className, activeColorSets, selectSetting, isActiveSetting, getActiveSetting, ...props }) => {

    const [isHovered, setIsHovered] = useState(false)

    const { links, colorFormat } = palette
    
    const selectColorGroup = () => {
        if(isActiveSetting(colorGroup.id) === SETTING_TYPES.colorGroup)
            selectSetting.general()
        else
            selectSetting.colorGroup(colorGroup.id)
    }

    const getNewColor = () => {
        const id = parseInt(Math.random() * 100000) //CHANGE
        return { empty: true, id }
    }

    const isColorLimitReached = colorGroup.colors.length >= MAX_COLORS_IN_COLOR_GROUP

    const addColorSet = (e) => {
        e.stopPropagation()
        if(!colorGroup.colors.find(color => color.empty) && !isColorLimitReached) {
            const newColor = getNewColor()
            setColorGroup(prev => ({ ...prev, colors: [ ...prev.colors, newColor ] }))

            selectSetting.addColorSet(newColor.id)
        }
    }

    return (
        <>
            <ColorGroupHeader 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
                colorGroup={colorGroup} 
                selectColorGroup={selectColorGroup} 
                addColorSet={addColorSet}
                isActiveSetting={isActiveSetting}
                isColorLimitReached={isColorLimitReached}
            />
            <ColorSetList
                className={`row-start-2 row-span-1 col-span-[${colorGroup.colors.length}] w-full`} 
                colorGroup={colorGroup} 
                setColorGroup={setColorGroup}
                palette={palette}
                setPalette={setPalette}
                selectSetting={selectSetting}
                isActiveSetting={isActiveSetting}
                getActiveSetting={getActiveSetting}
                activeColorSets={activeColorSets}
                isHovered={isHovered}
                getNewColor={getNewColor}
                addColorSet={addColorSet}
                contrastBaseColor={contrastBaseColor}
                setContrastBaseColor={setContrastBaseColor}
            />
        </>
    )
}

export default ColorGroup
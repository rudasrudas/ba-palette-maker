import { SETTING_TYPES } from "@hooks/useActiveSetting"
import ColorSet from "./ColorSet"
import useLinkFunctions from "@hooks/useLinkFunctions"

const ColorSetList = ({ colorGroup, setColorGroup, palette, setPalette, contrastBaseColor, setContrastBaseColor, className, activeColorSets, isHovered, selectSetting, isActiveSetting, getNewColor, addColorSet, getActiveSetting, ...props }) => {

    const { colorFormat, links } = palette

    if(!colorGroup?.colors?.length) return <span>No color available</span>

    const linkFunctions = useLinkFunctions({palette, setPalette, getActiveSetting, isActiveSetting})

    return colorGroup.colors?.map((color) => {
        const setColor = (value) => {
            setColorGroup(prev => ({
                ...prev,
                colors: prev.colors.map((c) => c.id === color.id
                    ? { ...c, ...(typeof value === 'function' ? value(c) : value) }
                    : c
                )
            }))
        }

        const removeColor = (e) => {

            setColorGroup(prev => ({ ...prev, colors: [...prev.colors.filter(c => c.id !== color.id)] }))
            linkFunctions.removeLink(color)

            if(colorGroup?.colors?.length === 1) {
                addColorSet(e)
            }
        }

        const isActiveColorSet = activeColorSets?.includes(color.id)
        
        // If not selected as adding new color set anymore, remove from colors
        if(!(isActiveSetting(color.id) === SETTING_TYPES.newColorSet) && color.empty && colorGroup.colors.length > 1) {
            setColorGroup(prev => ({ ...prev, colors: prev.colors.filter(c => c.id !== color.id ) }))
        }

        return (
            <ColorSet
                key={color.id}
                color={color}
                setColor={setColor}
                colorGroup={colorGroup}
                colorFormat={colorFormat}
                isActiveColorSet={isActiveColorSet}
                selectSetting={selectSetting}
                isActiveSetting={isActiveSetting}
                isHovered={isHovered}
                removeColor={removeColor}
                linkFunctions={linkFunctions}
                contrastBaseColor={contrastBaseColor}
                setContrastBaseColor={setContrastBaseColor}
            />
        )
    })
}

export default ColorSetList
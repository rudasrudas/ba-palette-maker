import AddColorSettings from "@components/palette-editor/palette-settings/AddColorSettings"
import ColorGroupSettings from "@components/palette-editor/palette-settings/ColorGroupSettings"
import ColorSettings from "@components/palette-editor/palette-settings/ColorSettings"
import GeneralSettings from "@components/palette-editor/palette-settings/GeneralSettings"
import { useState } from "react"
import useLinkFunctions from "./useLinkFunctions"

export const SETTING_TYPES = {
    colorSet: 'colorSet',
    colorGroup: 'colorGroup',
    newColorSet: 'newColorSet',
    general: 'general'
}

const useActiveSetting = (palette, setPalette) => {

    const [activeSetting, setActiveSetting] = useState({ type: SETTING_TYPES.general, id: SETTING_TYPES.general })

    const isActiveSetting = (id) => {
        return (activeSetting.id === id) ? activeSetting.type : false
    }

    const selectSetting = {
        colorSet: (id) => {
            setActiveSetting({type: SETTING_TYPES.colorSet, id })
        },
        colorGroup: (id) => {
            setActiveSetting({type: SETTING_TYPES.colorGroup, id })
        },
        addColorSet: (id) => {
            setActiveSetting({type: SETTING_TYPES.newColorSet, id })
        },
        general: () => {
            setActiveSetting({type: SETTING_TYPES.general, id: SETTING_TYPES.general })
        }
    }

    const getActiveSetting = () => {

        if (!activeSetting.type || !activeSetting.id) return
    
        if (activeSetting.type === SETTING_TYPES.colorGroup) {
            const foundGroup = palette.colorGroups.find(group => group.id === activeSetting.id)
            if (!foundGroup) return { value: undefined, setValue: undefined }
    
            const setValue = (update) => {
                setPalette(prev => ({
                    ...prev,
                    colorGroups: prev.colorGroups.map(group =>
                        group.id === activeSetting.id ? { 
                            ...group, 
                            ...(typeof update === 'function' ? update(group) : update) 
                        } : group
                    )
                }))
            }
    
            return { value: foundGroup, setValue, type: activeSetting.type, id: activeSetting.id }
        } else if (activeSetting.type === SETTING_TYPES.colorSet || activeSetting.type === SETTING_TYPES.newColorSet) {
            const foundColor = palette.colorGroups.flatMap(group => group.colors).find(color => color.id === activeSetting.id)
            if (!foundColor) return { value: undefined, setValue: undefined }
    
            const setValue = (update) => {
                setPalette(prev => ({
                    ...prev,
                    colorGroups: prev.colorGroups.map(group => {
                        if (group.colors.find(color => color.id === activeSetting.id)) {
                            return {
                                ...group,
                                colors: group.colors.map(color =>
                                    color.id === activeSetting.id ? { 
                                        ...color, 
                                        ...(typeof update === 'function' ? update(color) : update) 
                                    } : color
                                )
                            }
                        }
                        return group
                    })
                }))
            }
    
            return { value: foundColor, setValue, type: activeSetting.type, id: activeSetting.id }
        } else if (activeSetting.type === SETTING_TYPES.general) {
            return activeSetting
        }
    }  

    const renderActiveSetting = () => {
        const setting = getActiveSetting()
        if(!setting) return

        const { id, type, value, setValue } = setting

        const setColorFormat = (value) => {
            setPalette(prev => ({
                ...prev,
                colorFormat: typeof value === 'function' ? value(prev.colorFormat) : value
            }))
        }

        const setEditMode = (value) => {
            setPalette(prev => ({
                ...prev,
                editMode: typeof value === 'function' ? value(prev.editMode) : value
            }))
        }

        const linkFunctions = useLinkFunctions({palette, setPalette, getActiveSetting, isActiveSetting})
    
        switch(type) {
            case SETTING_TYPES.colorGroup:
                return <ColorGroupSettings key={id} colorGroup={value} setColorGroup={setValue} />
            case SETTING_TYPES.newColorSet:
                return <AddColorSettings key={id} color={value} setColor={setValue} colorGroups={palette.colorGroups} />
            case SETTING_TYPES.colorSet:
                return <ColorSettings key={id} color={value} setColor={setValue} linkFunctions={linkFunctions} />
            default:
                return <GeneralSettings editMode={palette.editMode} setEditMode={setEditMode} />
        }
    }

    const getActiveColorSetIds = () => {
        if(!activeSetting || !activeSetting.type || !activeSetting.id) return []

        switch(activeSetting.type) {
            case SETTING_TYPES.colorGroup: return palette.colorGroups.find(colorGroup => colorGroup.id === activeSetting.id)?.colors.map(c => c.id) || []
            case SETTING_TYPES.newColorSet:
            case SETTING_TYPES.colorSet: return [activeSetting.id] || []
            default: return []
        }
    }

    return { TYPES: SETTING_TYPES, activeSetting, setActiveSetting, selectSetting, isActiveSetting, getActiveSetting, renderActiveSetting, getActiveColorSetIds }
}

export default useActiveSetting
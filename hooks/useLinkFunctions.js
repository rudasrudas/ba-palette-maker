import { useEffect } from "react"
import { SETTING_TYPES } from "./useActiveSetting"
import usePrevious from "./usePrevious"

const useLinkFunctions = ({palette, setPalette, getActiveSetting = () => {}, isActiveSetting = () => {}}) => {

    const createLinkColor = (color) => {
        return {
            id: color.id,
            hue: color.hue
        }
    }

    const hasActiveColor = () => {
        const activeSetting = getActiveSetting()
        return (activeSetting.type === SETTING_TYPES.colorSet)
    }

    const getActiveColorSet = () => {
        const activeSetting = getActiveSetting()
        if (activeSetting.type === SETTING_TYPES.colorSet) {
            return activeSetting.value
        }
    }

    const isLinkedToActiveColor = (color) => {
        let links = palette.links

        const colorLink = links.find(link => link.map(l => l.id).includes(color.id))
        if(!colorLink) return

        const isLinkedToActive = colorLink.find(c => isActiveSetting(c.id))

        return isLinkedToActive
    }
  
    const addLink = (toLinkColor, baseColor) => {
        if(!baseColor && hasActiveColor()) baseColor = getActiveColorSet()
        else if (!baseColor) return

        setPalette((prev) => {
            let links = prev.links
            // Check if a or b already is in a link
            const toLinkColorExisting = links.find(link => link.map(l => l.id).includes(toLinkColor.id))
            const baseColorExisting = links.find(link => link.map(l => l.id).includes(baseColor.id))
    
            // if both do, merge the links
            if(toLinkColorExisting && baseColorExisting) {
                links = links.filter(link => link !== toLinkColorExisting && link !== baseColorExisting)
    
                const mergedLink = [...new Set([...toLinkColorExisting, ...baseColorExisting])]
                links.push(mergedLink)
            }
            // if one does, add the other one to the first one's link
            else if (toLinkColorExisting) {
                toLinkColorExisting.push(createLinkColor(baseColor))
            }
            else if (baseColorExisting) {
                baseColorExisting.push(createLinkColor(toLinkColor))
            }
            // if neither does, make a new link with the two colors
            else {
                links.push([createLinkColor(toLinkColor), createLinkColor(baseColor)])
            }

            return { ...prev, links }
        })
    }

    const removeLink = (toRemove, baseColor) => {
        if (!baseColor && hasActiveColor()) {
            baseColor = getActiveColorSet()
        } else if (!baseColor) {
            return
        }
    
        setPalette((prev) => {
            const links = prev.links.map(link => [...link])
    
            let linkIndex = links.findIndex(link => link.map(l => l.id).includes(toRemove.id) && link.map(l => l.id).includes(baseColor.id))
            
            if (linkIndex !== -1) {
                const newLink = links[linkIndex].filter(color => color.id !== toRemove.id)
                
                if (newLink.length < 2) {
                    links.splice(linkIndex, 1)
                } else {
                    links[linkIndex] = newLink
                }
            }
    
            return { ...prev, links }
        })
    }

    const initiateLinkUpdate = (updatedColor) => {
        const { id, hue } = updatedColor
        const link = palette.links.find(link => link.map(c => c.id).includes(id))
        if (!link) return

        const baseColorHue = palette.colorGroups.flatMap(group => group.colors)
            .find(color => color.id === id).hue
        const hueDifference = hue - baseColorHue

        const newPalette = { ...palette }
        newPalette.colorGroups = newPalette.colorGroups.map(group => ({
            ...group,
            colors: group.colors.map(color => {
                if (link.map(c => c.id).includes(color.id) ) {
                    return { ...color, hue: (color.hue + hueDifference + 360) % 360 }
                }
                return color
            })
        }))

        setPalette(newPalette)
    }

    return { hasActiveColor, isLinkedToActiveColor, addLink, removeLink, initiateLinkUpdate }
}
export default useLinkFunctions
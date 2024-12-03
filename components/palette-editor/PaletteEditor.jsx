'use client'

import { useEffect, useState } from 'react'
import ColorGroup from './color-group/ColorGroup'
import useActiveSetting from '@hooks/useActiveSetting'
import useQueryState from '@hooks/useQueryState'
import { EDITOR_MODES } from './palette-settings/GeneralSettings'
import { useRouter } from 'next/navigation'
import { PAGES } from '@components/page-structure/PaletteMaker'

const ACTIVE_COLOR_SET_VALUE = 5;
const INACTIVE_COLOR_SET_VALUE = 3;

const PaletteEditor = ({ palette, setPalette, openExport }) => {

    const { selectSetting, isActiveSetting, renderActiveSetting, getActiveColorSetIds, getActiveSetting } = useActiveSetting(palette, setPalette)

    const [page, setPage] = useQueryState('status')
    const [modeId, setModeId] = useQueryState('mode')
    const [contrastBaseColor, setContrastBaseColor] = useState()

    const router = useRouter()

    useEffect(() => {
        if(modeId !== EDITOR_MODES.CONTRAST.value) setContrastBaseColor()
    }, [modeId])

    useEffect(() => {
        console.log(page, palette?.colorGroups)
        if(!palette?.colorGroups) {
            setPage(PAGES.FORM)
            console.log(page)
            router.refresh()
        }
    }, [palette])

    const renderColorGroups = () => {
        return palette?.colorGroups.map((colorGroup, index) => {

            const setColorGroup = (updatedColorGroup) => {
                setPalette((prev) => ({
                        ...prev,
                        colorGroups: prev.colorGroups.map((prevColorGroup) => {   
                            if(prevColorGroup.id === colorGroup.id) {
                                return typeof updatedColorGroup === "function" ? updatedColorGroup(prevColorGroup) : updatedColorGroup
                            } else {
                                return prevColorGroup
                        }})
                    })
                )
            }

            return (
                <ColorGroup 
                    key={colorGroup.id}
                    style={{ gridColumn: index }}
                    palette={palette}
                    setPalette={setPalette}
                    colorGroup={colorGroup}
                    setColorGroup={setColorGroup}
                    selectSetting={selectSetting}
                    getActiveSetting={getActiveSetting}
                    isActiveSetting={isActiveSetting}
                    activeColorSets={getActiveColorSetIds()}
                    contrastBaseColor={contrastBaseColor}
                    setContrastBaseColor={setContrastBaseColor}
                />
            )}
        )
    }

    const getGridTemplateColumns = () => {
        const activeColorSets = getActiveColorSetIds()

        return palette.colorGroups.reduce((o, colorGroup) => [...o, ...colorGroup?.colors.map(c => c.id)], [])
            .map((c) => {
                if(activeColorSets.includes(c)) return ACTIVE_COLOR_SET_VALUE + 'fr'
                else {
                    return INACTIVE_COLOR_SET_VALUE + 'fr'
                }
            }).join(' ')
    }

    if (palette) return (
        <>
            <div 
                className={`transition-all gap-x-2 lg:gap-x-4 w-screen sm:w-full sm:max-w-full px-2 -mx-2 sm:mx-auto overflow-x-auto sm:overflow-x-visible grid grid-flow-col`}
                style={{ gridTemplateColumns: getGridTemplateColumns() }}
            >
                { renderColorGroups() }
            </div>
            <div className=''>
                { renderActiveSetting() }
            </div>
        </>
    )
}

export default PaletteEditor
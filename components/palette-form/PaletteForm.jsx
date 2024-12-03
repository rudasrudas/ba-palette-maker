'use client'

import ButtonPrimary from "@components/ui/inputs/buttons/ButtonPrimary"
import TabList from "@components/ui/inputs/tabs/TabList"
import TitleLarge from "@components/ui/text/TitleLarge"
import Text from "@components/ui/text/Text"
import { IconArrowRight, IconRefresh } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import ColorSuggestionList from "./suggestions/ColorSuggestionList"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import Suggestions, { useSimpleSuggestions } from "@hooks/useSuggestions"
import ButtonNewColorSet from "@components/palette-editor/color-group/ButtonNewColorSet"
import Line from "@components/palette-editor/color-group/Line"
import ButtonSecondaryMedium from "@components/ui/inputs/buttons/ButtonSecondaryMedium"
import CustomColorList from "./custom-colors/CustomColorList"
import ColorPicker from "@components/ui/inputs/sliders/ColorPicker"
import TabContent from "@components/ui/inputs/tabs/TabContent"
import { SELECTION_TYPES } from "@components/page-structure/PaletteMaker"


const PaletteForm = ({ formColors, setFormColors, generate, className, ...props }) => {

    const [activeCustomColor, setActiveCustomColor] = useState(null)

    const { selectionType, selectedSuggestions, customColors } = formColors

    const setSelectionType = (s) => {
        setFormColors(prev => ({ ...prev, selectionType: s }))
    }

    const setSelectedSuggestions = (s) => {
        setFormColors(prev => {
            return ({
                ...prev,
                selectedSuggestions: typeof s === 'function' ? s(prev.selectedSuggestions) : s
            })
        })
    }

    const setCustomColors = (s) => {
        setFormColors(prev => {
            return ({
                ...prev,
                customColors: typeof s === 'function' ? s(prev.customColors) : s
            })
        })
    }

    const SUGGESTION_COUNT = 6
    const MAX_SELECTED_COUNT = 3

    const { suggestions, refresh : refreshSuggestions } = useSimpleSuggestions({
        existingColors: selectedSuggestions,
        action: [Suggestions.ACTIONS.ADD],
        count: SUGGESTION_COUNT
    })

    const setColor = (newColor) => {
        if(!activeCustomColor) return

        setCustomColors((prevColors) => prevColors.map(c => {
          if (c.id !== activeCustomColor?.id) return c
          return typeof newColor === 'function' ? newColor(c) : newColor
        }))
    }

    const isSuggestion = selectionType === SELECTION_TYPES.SUGGESTIONS

    const canGenerate = (!isSuggestion && customColors.filter(c => !c.empty).length) || (isSuggestion && selectedSuggestions.length)

    const getNewCustomColor = () => {
        return {
            id: parseInt(Math.random() * 100000), //CHANGE
            oklch: null,
            empty: true
        }
    }

    const addCustomColor = () => {
        if(customColors.length >= MAX_SELECTED_COUNT) return

        const newCustomColor = getNewCustomColor()

        setCustomColors(prevColors => {
            return [
                ...prevColors.filter(c => (!c.empty || c.id === activeCustomColor?.id)),
                newCustomColor
            ]
        })

        setActiveCustomColor(newCustomColor)

    }

    useEffect(() => {
        if(customColors.length <= 1) return
        
        const emptyColorCount = customColors.filter(c => c.empty).length
        if(!emptyColorCount) return

        setCustomColors(prev => {
            const filtered = prev.filter(color => {
                return (!color.empty || color.id === activeCustomColor?.id)
            })

            if(!filtered.length) {
                filtered.push(getNewCustomColor())
            }

            return filtered
        })        
    }, [customColors])

    return (
        <div className={`flex flex-col gap-2 h-full w-full transition-all max-w-screen grow pt-8 ${className}`} {...props}>
            <TitleLarge>Create your new palette</TitleLarge>
            <Text className='max-w-md pt-0 mb-6'>Add your own custom brand colors or select some you like from the suggestions</Text>
            <div className="flex flex-wrap sm:flex-nowrap gap-12">
                <div className="w-full flex flex-col gap-4">
                    <div className={`w-full flex flex-wrap sm:flex-nowrap items-center`}>
                        <TabList
                            className='w-fit'
                            value={selectionType}
                            options={[
                                { name: 'Suggestions', value: SELECTION_TYPES.SUGGESTIONS },
                                { name: 'Custom colors', value: SELECTION_TYPES.CUSTOM },
                            ]}
                            onChange={setSelectionType}
                        />
                        <Line isActive={isSuggestion || true} className="invisible sm:visible min-h-4 sm:min-h-0"/>
                        { isSuggestion ?
                            <ButtonSecondaryMedium className={`transition-all ${isSuggestion ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={refreshSuggestions}>
                                Refresh
                                <IconRefresh className='w-4 h-4'/>
                            </ButtonSecondaryMedium>
                            :
                            <ButtonNewColorSet onClick={addCustomColor} />
                        }
                    </div>
                    <TabContent value={selectionType} expected={SELECTION_TYPES.CUSTOM}>
                        <CustomColorList
                            colors={customColors}
                            setColors={setCustomColors}
                            activeColor={activeCustomColor}
                            setActiveColor={setActiveCustomColor}
                            max={MAX_SELECTED_COUNT}
                        />
                    </TabContent>
                    <TabContent value={selectionType} expected={SELECTION_TYPES.SUGGESTIONS}>
                        <ColorSuggestionList
                            suggestions={suggestions} 
                            selected={selectedSuggestions} 
                            setSelected={setSelectedSuggestions}
                            refresh={refreshSuggestions}
                            count={SUGGESTION_COUNT}
                            maxSelect={MAX_SELECTED_COUNT}
                        />
                    </TabContent>
                </div>
                <ColorPicker
                    color={activeCustomColor}
                    setColor={setColor}
                    className={`${(!isSuggestion && activeCustomColor) ? 'flex' : 'hidden'}`}
                />
            </div>

            <ButtonRow className='pt-0 mt-auto'>
                <ButtonPrimary 
                    disabled={!canGenerate} 
                    onClick={generate} 
                    tracking={{
                        action: 'generate_palette',
                        category: 'Button',
                        label: 'Generate Button',
                        value: '1',
                    }}
                >
                    Generate palettes
                    <IconArrowRight/>
                </ButtonPrimary>
            </ButtonRow>
        </div>
    )
}
export default PaletteForm
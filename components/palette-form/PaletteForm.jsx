'use client'

import ButtonPrimary from "@components/ui/inputs/buttons/ButtonPrimary"
import TitleLarge from "@components/ui/text/TitleLarge"
import Text from "@components/ui/text/Text"
import { IconArrowRight, IconRefresh } from "@tabler/icons-react"
import ColorSuggestionList from "./suggestions/ColorSuggestionList"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import Suggestions, { useSimpleSuggestions } from "@hooks/useSuggestions"
import CustomColorList from "./custom-colors/CustomColorList"
import Title from "@components/ui/text/Title"
import ButtonIcon from "@components/ui/inputs/buttons/ButtonIcon"
import Tooltip from "@components/ui/Tooltip"
import { useEffect } from "react"
import TitleSmall from "@components/ui/text/TitleSmall"
import { v4 as uuidv4 } from 'uuid';

export const getNewCustomColor = () => {
    return {
        id: uuidv4(),
        oklch: null,
        empty: true
    }
}

const PaletteForm = ({ formColors, setFormColors, generate, className, ...props }) => {

    const SUGGESTION_COUNT = 10
    const MAX_SELECTED_COUNT = 3

    const { suggestions, refresh : refreshSuggestions } = useSimpleSuggestions({
        action: [Suggestions.ACTIONS.ADD],
        count: SUGGESTION_COUNT,
        type: [Suggestions.TYPES.RANDOM]
    })

    const colorCount = (countEmpty = false) => formColors.filter(c => !countEmpty ? !c.empty : true).length
    const maxSelectedLimitReached = (countEmpty) => colorCount(countEmpty) >= 3

    const addCustomColor = () => {
        if(maxSelectedLimitReached()) return

        const newCustomColor = getNewCustomColor()

        setFormColors(prev => ([
            ...prev.filter(p => !p.empty),
            newCustomColor
        ]))

        return newCustomColor
    }

    const addSuggestedColor = (suggestion) => {

        if(maxSelectedLimitReached()) return

        suggestion.id = uuidv4()

        setFormColors(prev => ([
            ...prev.filter(p => !p.empty),
            suggestion
        ]))
    }

    return (
        <div className={`flex flex-col gap-2 h-full w-full transition-all max-w-screen grow pt-8 ${className}`} {...props}>
            <TitleLarge>Generate new color palette</TitleLarge>
            <Text className='max-w-md pt-0 mb-6'>Select 1 to 3 colors that will be used to generate your palette. Click on a color to modify, or use the suggestions</Text>
            <div className="flex flex-wrap sm:flex-nowrap gap-12">
                <div className="w-full flex flex-col gap-4">
                    <CustomColorList
                        colors={formColors}
                        setColors={setFormColors}
                        addColor={addCustomColor}
                        maxSelectedLimitReached={maxSelectedLimitReached(true)}
                    />

                    <div>
                        <ButtonRow className={`mt-4 gap-1`}>
                            <TitleSmall className={'!leading-loose'}>Suggestions</TitleSmall>
                            <Tooltip  title="Refresh suggestions">
                                <ButtonIcon Icon={IconRefresh} border={false} onClick={refreshSuggestions} />
                            </Tooltip>
                        </ButtonRow>
                        <ColorSuggestionList
                            suggestions={suggestions} 
                            selected={[]}
                            onSelect={addSuggestedColor}
                            refresh={refreshSuggestions}
                            count={SUGGESTION_COUNT}
                            maxSelect={MAX_SELECTED_COUNT}
                        />
                    </div>
                </div>
            </div>

            <ButtonRow className='pt-0 mt-2'>
                <ButtonPrimary 
                    disabled={!colorCount()} 
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
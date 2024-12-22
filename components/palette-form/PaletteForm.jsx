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


const PaletteForm = ({ formColors, setFormColors, generate, className, ...props }) => {

    const SUGGESTION_COUNT = 6
    const MAX_SELECTED_COUNT = 3

    const { suggestions, refresh : refreshSuggestions } = useSimpleSuggestions({
        existingColors: formColors,
        action: [Suggestions.ACTIONS.ADD],
        count: SUGGESTION_COUNT
    })

    const colorCount = formColors.length
    const maxSelectedLimitReached = colorCount >= 3

    const getNewCustomColor = () => {
        return {
            id: parseInt(Math.random() * 100000), // To change in the future with a UUID
            oklch: null,
            empty: true
        }
    }

    const addCustomColor = () => {
        if(maxSelectedLimitReached) return

        const newCustomColor = getNewCustomColor()

        setFormColors(prevColors => ([
            ...prevColors,
            newCustomColor
        ]))

        return newCustomColor
    }

    const addSelectedColor = (suggestion) => {

        if(maxSelectedLimitReached) return

        setFormColors(prev => ([
            ...prev,
            suggestion
        ]))
    }

    return (
        <div className={`flex flex-col gap-2 h-full w-full transition-all max-w-screen grow pt-8 ${className}`} {...props}>
            <TitleLarge>Generate new color palette</TitleLarge>
            <Text className='max-w-md pt-0 mb-6'>Select 1 to 3 colors that will be used to generate your palette. Use suggestions for inspiration!</Text>
            <div className="flex flex-wrap sm:flex-nowrap gap-12">
                <div className="w-full flex flex-col gap-4">
                    <CustomColorList
                        colors={formColors}
                        setColors={setFormColors}
                        addColor={addCustomColor}
                        maxSelectedLimitReached={maxSelectedLimitReached}
                    />

                    <div>
                        <ButtonRow className={`mt-4 gap-2`}>
                            <Title>Suggestions</Title>
                            <Tooltip  title="Refresh suggestions">
                                <ButtonIcon Icon={IconRefresh} onClick={refreshSuggestions} />
                            </Tooltip>
                        </ButtonRow>
                        <ColorSuggestionList
                            suggestions={suggestions} 
                            selected={[]}
                            onSelect={addSelectedColor}
                            refresh={refreshSuggestions}
                            count={SUGGESTION_COUNT}
                            maxSelect={MAX_SELECTED_COUNT}
                        />
                    </div>
                </div>
            </div>

            <ButtonRow className='pt-0 mt-2'>
                <ButtonPrimary 
                    disabled={!colorCount} 
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
'use client'

import PaletteDisplay from "@components/palette-display/PaletteDisplay"
import Color from "@components/palette-editor/color-set/Color"
import ButtonPrimary from "@components/ui/inputs/buttons/ButtonPrimary"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import ButtonSecondary from "@components/ui/inputs/buttons/ButtonSecondary"
import ButtonSecondaryMedium from "@components/ui/inputs/buttons/ButtonSecondaryMedium"
import TitleLarge from "@components/ui/text/TitleLarge"
import Text from "@components/ui/text/Text"
import usePaletteGenerator from "@hooks/usePaletteGenerator"
import { IconArrowLeft, IconArrowRight, IconRotate } from "@tabler/icons-react"
import ColorHarmonyInfo from "./ColorHarmonyInfo"
import * as gtag from '@utils/gtag'
import { SELECTION_TYPES } from "@components/page-structure/PaletteMaker"

const PalettePicker = ({ formColors, setPalette, goBack, edit, className, ...props }) => {

    const providedColors = formColors.selectionType === SELECTION_TYPES.SUGGESTIONS ? formColors.selectedSuggestions : formColors.customColors
    const { generate, createdPalettes, activePalette, selectPrevPalette, selectNextPalette } = usePaletteGenerator(providedColors)

    const handleOpenEditor = () => {
        setPalette(activePalette)
        edit()
    }

    return (
        <div className={`flex flex-col min-h-[80vh] gap-8 ${className}`} {...props}>
            <ButtonSecondaryMedium onClick={goBack}>
                <IconArrowLeft className="w-4 h-4"/>
                Return
            </ButtonSecondaryMedium>
            <div className="flex gap-10 h-full items-stretch justify-stretch flex-wrap md:flex-nowrap">
                <div className="flex flex-col gap-12">
                    <div>
                        <TitleLarge className='pt-0'>Select your new palette</TitleLarge>
                        <Text className='max-w-md pt-0'>Pick out your favorite color palette and proceed to the next step to tweak it to perfection</Text>
                    </div>

                    <ColorHarmonyInfo key={activePalette?.harmonyType} harmonyType={activePalette?.harmonyType} className={`${activePalette?.harmonyType ? 'visible' : 'invisible' }`} />

                    <ButtonRow className='mt-auto'>
                        <ButtonSecondary onClick={generate} tracking={{
                            action: 'regenerate_palette',
                            category: 'Button',
                            label: 'Regenerate Button',
                            value: '1',
                        }}>
                            Regenerate
                            <IconRotate className="w-4 h-4"/>
                        </ButtonSecondary>
                    </ButtonRow>
                </div>
                <div className="flex flex-col gap-8 w-full md:w-1/2 md:ml-auto h-full">
                    <PaletteDisplay className='w-full h-full min-h-[50dvh]' providedColors={providedColors} colorGroups={activePalette?.colorGroups} />
                    <ButtonRow className='pt-0 mt-auto'>
                        <ButtonPrimary onClick={handleOpenEditor} tracking={{
                            action: 'open_editor',
                            category: 'Button',
                            label: 'Generate Button',
                            value: '1',
                        }}>
                            Edit this palette
                            <IconArrowRight/>
                        </ButtonPrimary>
                    </ButtonRow>
                </div>
            </div>
        </div>
    )
}
export default PalettePicker
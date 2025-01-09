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
import React, { useEffect } from "react"
import ColorGenerationErrorNotice from "@components/page-structure/notifications/ColorGenerationErrorNotice"

const PalettePicker = ({ formColors, setPalette, goBack = () => {}, edit = () => {}, className, ...props }) => {

    if(formColors.length === 0 || (formColors.length === 1 && !formColors[0].oklch) ) {
        goBack()
    }

    const onError = () => goBack(true)

    const { generate, createdPalettes, activePalette, selectPrevPalette, selectNextPalette } = usePaletteGenerator(formColors, onError)

    const handleOpenEditor = () => {
        if(!activePalette) return

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
                        <TitleLarge className='pt-0'>Select generated palette</TitleLarge>
                        <Text className='max-w-md pt-0'>Click "Regenerate" until you get a desired palette. Then click "Edit" to proceed.</Text>
                    </div>

                    { activePalette &&
                        <ColorHarmonyInfo key={activePalette.harmonyType} harmonyType={activePalette.harmonyType} className={`${activePalette.harmonyType ? 'visible' : 'invisible' }`} />
                    }

                    <ButtonRow className='mt-auto'>
                        
                    </ButtonRow>
                </div>
                <div className="flex flex-col gap-8 w-full md:w-1/2 md:ml-auto h-full">
                    { activePalette && activePalette.colorGroups && activePalette.colorGroups.length > 0 &&
                        <PaletteDisplay className='w-full h-full min-h-[50dvh]' providedColors={formColors} colorGroups={activePalette.colorGroups} />
                    }
                    <ButtonRow className='pt-0 mt-auto'>
                        <ButtonSecondary onClick={generate} tracking={{
                            action: 'regenerate_palette',
                            category: 'Button',
                            label: 'Regenerate Button',
                            value: '1',
                        }}>
                            Regenerate
                            <IconRotate/>
                        </ButtonSecondary>
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
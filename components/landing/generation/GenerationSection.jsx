'use client'

import TextColumn from "@components/ui/containers/TextColumn"
import SectionColumns from "../sections/SectionColumns"
import TitleLarge from "@components/ui/text/TitleLarge"
import ParagraphLarge from "@components/ui/text/ParagraphLarge"
import ButtonSecondary from "@components/ui/inputs/buttons/ButtonSecondary"
import { IconArrowRight } from "@tabler/icons-react"
import Column from "@components/ui/containers/Column"
import PaletteGenerationAnimation from "./graphics/PaletteGenerationAnimation"

const GenerationSection = () => {
    return (
        <Column id='features' className='-scroll-pt-32'>
            <SectionColumns>
                <SectionColumns.ColumnSection className='sm:!w-1/3'>
                    <TextColumn className='text-balance'>
                        <TitleLarge>Generate palettes with your brand colors</TitleLarge>
                        <ParagraphLarge className=''>Select colors to use and generate palettes that ensure visual coherence, eliminating the guesswork and allowing you to simply choose your favorite. </ParagraphLarge>

                        <ButtonSecondary href="/create" className='' Icon={IconArrowRight}>
                            Try with your colors
                        </ButtonSecondary>
                    </TextColumn>
                </SectionColumns.ColumnSection>
                <SectionColumns.ColumnSection width={2} className='sm:!w-2/3'>
                    <PaletteGenerationAnimation />
                </SectionColumns.ColumnSection>
            </SectionColumns>
        </Column>
    )
}
export default GenerationSection
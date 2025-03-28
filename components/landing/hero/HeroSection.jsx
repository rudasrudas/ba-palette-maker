'use client'
import ButtonPrimary from "@components/ui/inputs/buttons/ButtonPrimary"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import ButtonSecondary from "@components/ui/inputs/buttons/ButtonSecondary"
import TitleExtraLarge from "@components/ui/text/TitleExtraLarge"
import { IconArrowRight } from "@tabler/icons-react"

import SectionColumns from "../sections/SectionColumns"
import ParagraphLarge from "@components/ui/text/ParagraphLarge"
import PaletteDisplayHero from "./PaletteDisplayHero"
import Column from "@components/ui/containers/Column"
import Testimonial from "./Testimonial"
import HeroScreenshotComposition from "./HeroScreenshotComposition"

const HeroSection = () => {
    return (
        <Column className='pt-4'>
            <TitleExtraLarge className='text-balance max-w-3xl'>Generate and edit color palettes for the web</TitleExtraLarge>
            <SectionColumns>
                <SectionColumns.ColumnSection>
                    <ParagraphLarge className='min-w-lg'>
                        Choose starting colors and we'll generate matching colors and shades to build endless color palettes for the web. 
                    </ParagraphLarge>
                    <ButtonRow>
                        <ButtonPrimary href="/create" Icon={IconArrowRight}>
                            Create a palette
                        </ButtonPrimary>
                        <ButtonSecondary href="/#features" Icon={IconArrowRight}>
                            View features
                        </ButtonSecondary>
                    </ButtonRow>
                    <Column className='pt-16 hidden md:flex'>
                        <Testimonial
                            stars={5}
                            author={'Zachary'}
                            text={`This is fantastic for devs!`}
                        />
                        <Testimonial
                            stars={5}
                            author={'Michalis'}
                            text={`Lots of options to play with colors, and it's FREE.\nI couldn’t ask for more.`}
                        />
                        <Testimonial
                            stars={5}
                            author={'Felix'}
                            text={`It's a super decent free tool.`}
                        />
                    </Column>
                </SectionColumns.ColumnSection>
                <SectionColumns.ColumnSection className='h-[30dvh] md:h-[60dvh]'>
                    <PaletteDisplayHero className="block md:hidden"/>
                    <HeroScreenshotComposition className="hidden md:block"/>
                </SectionColumns.ColumnSection>
            </SectionColumns>
        </Column>
    )
}
export default HeroSection
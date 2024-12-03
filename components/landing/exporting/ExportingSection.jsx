'use client'

import TextColumn from "@components/ui/containers/TextColumn"
import TitleLarge from "@components/ui/text/TitleLarge"
import SectionColumns from "../sections/SectionColumns"
import ParagraphLarge from "@components/ui/text/ParagraphLarge"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import Column from "@components/ui/containers/Column"
import ImageWrapper from "@components/landing/images/ImageWrapper"
import ImageStyled from "../images/ImageStyled"
import exportingImg from "@public/pics/exporting.png"
import IconStyled from "../images/IconStyled"
import { IconBrandCss3, IconBrandSass, IconBrandTailwind, IconFileTypeXml } from "@tabler/icons-react"

const ExportingSection = () => {
    return (
        <Column>
            <TitleLarge>Prepared to export the way you want it</TitleLarge>
            <SectionColumns>
                <SectionColumns.ColumnSection>
                    {/* <div className='w-full rounded-xl border bg-black dark:bg-white border-black dark:border-white h-[300px]'/> */}
                    <ImageWrapper>
                        <ImageStyled 
                            src={exportingImg}
                            alt="CSS code being exported from PaletteMaker"
                        />
                    </ImageWrapper>
                </SectionColumns.ColumnSection>
                <SectionColumns.ColumnSection>
                    <TextColumn>
                        <ParagraphLarge>Export your palettes directly into the format you need, and spend less time converting and more time creating with code that fits right into your project's workflow.</ParagraphLarge>
                        <ButtonRow className='mt-auto sm:pt-5'>
                            <div className='w-full flex gap-2'>
                                <IconStyled 
                                    Icon={IconBrandCss3}
                                    title="CSS"
                                />
                                <IconStyled 
                                    Icon={IconBrandSass}
                                    title="SCSS"
                                />
                            </div>
                            <div className='w-full flex gap-2'>
                                <IconStyled 
                                    Icon={IconBrandTailwind}
                                    title="Tailwind"
                                />
                                <IconStyled 
                                    Icon={IconFileTypeXml}
                                    title="XML"
                                />
                            </div>
                        </ButtonRow>
                    </TextColumn>
                </SectionColumns.ColumnSection>
            </SectionColumns>
        </Column>
    )
}
export default ExportingSection
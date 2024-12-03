import TextColumn from "@components/ui/containers/TextColumn"
import ParagraphLarge from "@components/ui/text/ParagraphLarge"
import TitleLarge from "@components/ui/text/TitleLarge"
import SectionColumns from "../sections/SectionColumns"
import Paragraph from "@components/ui/text/Paragraph"
import Title from "@components/ui/text/Title"
import Column from "@components/ui/containers/Column"

import colorModificationImg from "@public/pics/color-modification.png"
import colorLinkingImg from "@public/pics/color-linking.png"
import colorShadingImg from "@public/pics/color-shading.png"
import Image from "next/image"
import ImageWrapper from "@components/landing/images/ImageWrapper"
import ImageStyled from "../images/ImageStyled"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import { IconAdjustments, IconEaseInOutControlPoints, IconLinkOff, IconUnlink } from "@tabler/icons-react"

const CustomizationSection = () => {
    return (
        <Column>
            <TextColumn>
                <TitleLarge className='mx-auto'>Edit your new palette without messing it up</TitleLarge>
            </TextColumn>
            <SectionColumns>
                <SectionColumns.ColumnSection className='ml-auto'>
                    <TextColumn className='sm:ml-auto mt-8 sm:mt-0'>
                        {/* <div className="flex gap-2 items-end"> */}
                            <IconAdjustments className="md:w-12 w-8 sm:w-10 md:h-12 h-8 sm:h-10" stroke={1.5}/>
                            <Title>Adjust colors the same way you think</Title>
                        {/* </div> */}
                        <Paragraph>PaletteMaker simplifies color modification, allowing you to refine your palette intuitively.</Paragraph>
                        <ImageWrapper>
                            <ImageStyled src={colorModificationImg} alt="Modifying colors with lightness and saturation sliders" />
                        </ImageWrapper>
                    </TextColumn>
                    <TextColumn className='sm:ml-auto mt-8 sm:mt-12'>
                        {/* <div className="flex gap-2 items-end"> */}
                            <IconEaseInOutControlPoints className="md:w-12 w-8 sm:w-10 md:h-12 h-8 sm:h-10" stroke={1.5}/>
                            <Title className=''>Define transitions between shades</Title>
                        {/* </div> */}
                        <Paragraph>For more intricate color palettes, adjust the way shades transition from lightest to darkest.</Paragraph>
                        <ImageWrapper>
                            <ImageStyled src={colorShadingImg} alt="Setting the count of shades for colors with plus and minus buttons" />
                        </ImageWrapper>
                    </TextColumn>
                </SectionColumns.ColumnSection>
                <SectionColumns.ColumnSection className=''>
                    <TextColumn className='sm:mt-60 mt-8'>
                        {/* <div className="flex gap-2 items-end"> */}
                            <IconUnlink className="md:w-12 w-8 sm:w-10 md:h-12 h-8 sm:h-10" stroke={1.5}/>
                            <Title>Link colors to preserve their harmony</Title>
                        {/* </div> */}
                        <Paragraph>Keep hue difference between colors the same and ensure they stay visually coherent.</Paragraph>
                        <ImageWrapper>
                            <ImageStyled src={colorLinkingImg} alt="Linking multiple color hues together with a designated button" />
                        </ImageWrapper>
                    </TextColumn>
                </SectionColumns.ColumnSection>
            </SectionColumns>
        </Column>
    )
}
export default CustomizationSection
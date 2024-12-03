import SectionColumns from "@components/landing/sections/SectionColumns"
import ImageWrapper from "@components/landing/images/ImageWrapper"
import TextColumn from "@components/ui/containers/TextColumn"
import ParagraphLarge from "@components/ui/text/ParagraphLarge"
import TitleLarge from "@components/ui/text/TitleLarge"
import contrastCheckerImg from "@public/pics/contrast-checker.png"
import colorblindnessPreviewImg from "@public/pics/colorblindness-preview.png"
import ImageStyled from "../images/ImageStyled"

const AccessibilitySection = () => {
    return (
        <div>
            <TextColumn>
                <SectionColumns>
                    <SectionColumns.ColumnSection>
                        <TitleLarge>Build accessible and inclusive designs</TitleLarge>
                    </SectionColumns.ColumnSection>
                    <SectionColumns.ColumnSection></SectionColumns.ColumnSection>
                </SectionColumns>
                
                <SectionColumns>
                    <SectionColumns.ColumnSection>
                        <ParagraphLarge className='sm:mb-8'>Incorporate accessibility into your designs with the contrast checker tool and colorblind preview mode. 
                        Easily adhere to accessibility standards and ensure that your designs are perceivable by a wider audience.</ParagraphLarge>
                        {/* <div className='w-full rounded-xl border bg-black dark:bg-white border-black dark:border-white h-[350px]'/> */}
                        <ImageWrapper>
                            <ImageStyled src={contrastCheckerImg} alt="Text showing how to effectively utilize contrast checker" />
                        </ImageWrapper>
                    </SectionColumns.ColumnSection>
                    <SectionColumns.ColumnSection>
                        {/* <div className='w-full rounded-xl border bg-black dark:bg-white border-black dark:border-white h-[350px]'/> */}
                        <ImageWrapper>
                            <ImageStyled src={colorblindnessPreviewImg} alt="Color palette editor with Deuteranopia colorblindness preview active" />
                        </ImageWrapper>
                    </SectionColumns.ColumnSection>
                </SectionColumns>
            </TextColumn>
        </div>
    )
}
export default AccessibilitySection
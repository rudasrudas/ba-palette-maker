'use client'

import TitleExtraLarge from "@components/ui/text/TitleExtraLarge"
import SectionColumns from "../sections/SectionColumns"
import ParagraphLarge from "@components/ui/text/ParagraphLarge"
import { IconArrowRight } from "@tabler/icons-react"
import ButtonPrimary from "@components/ui/inputs/buttons/ButtonPrimary"

const CallToActionSection = () => {
    return (
        <div className='flex flex-col gap-5 items-center'>
                    <ParagraphLarge className='text-center'>
                        Ready to improve your color design process?
                    </ParagraphLarge>
                    <TitleExtraLarge isTitle={false} className='text-center'>
                        Bring your colors to life
                    </TitleExtraLarge>
                    <ButtonPrimary href="/create" className='my-16' Icon={IconArrowRight}>
                        Create a palette
                    </ButtonPrimary>
        </div>
    )
}
export default CallToActionSection
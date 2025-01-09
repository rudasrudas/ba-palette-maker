'use client'

import Block from '@components/ui/Block'
import ButtonPrimary from '@components/ui/inputs/buttons/ButtonPrimary'
import Paragraph from '@components/ui/text/Paragraph'
import TitleSmall from '@components/ui/text/TitleSmall'
import { IconSettingsExclamation } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const TIMEOUT = 10000

const ColorGenerationErrorNotice = () => {

    const [visible, setVisible] = useState(true)

    const hide = () => setVisible(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            hide()
        }, TIMEOUT)

        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <Block className='flex flex-col gap-2'>
            <TitleSmall className='flex gap-2 items-center'>
                <IconSettingsExclamation/>
                Palette generation failed
            </TitleSmall>
            <Paragraph className='sm:w-72'>It is not possible to generate color palettes with selected colors. Please adjust and try again.</Paragraph>

            <div className='flex gap-2 mt-2'>
                <ButtonPrimary onClick={hide}>
                    Close
                </ButtonPrimary>
            </div>
        </Block>
    )
}
export default ColorGenerationErrorNotice
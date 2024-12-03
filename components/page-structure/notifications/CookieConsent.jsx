'use client'

import Block from '@components/ui/Block'
import ButtonPrimary from '@components/ui/inputs/buttons/ButtonPrimary'
import ButtonSecondary from '@components/ui/inputs/buttons/ButtonSecondary'
import LinkText from '@components/ui/inputs/buttons/LinkText'
import Paragraph from '@components/ui/text/Paragraph'
import TitleSmall from '@components/ui/text/TitleSmall'
import { useConsent } from '@context/ConsentContext'
import { IconArrowRight, IconCookie } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CookieConsent = () => {

    const { hasConsent, updateConsent } = useConsent()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (document.cookie.indexOf('userConsent=') === -1) {
          setVisible(true)
        }
      }, [hasConsent])
    
      const handleConsent = (consent) => {
        updateConsent(consent)
        setVisible(false)
      }

    if (!visible) return null

    return (
        <Block className='flex flex-col gap-2'>
            <TitleSmall className='flex gap-2 items-center'>
                <IconCookie/>
                We use cookies
            </TitleSmall>
            <Paragraph className='sm:w-72'>Help us understand what features are most used by agreeing to analytics cookies</Paragraph>
            <LinkText href='privacy-policy'>
                More info
                <IconArrowRight className='w-4 h-4' />
            </LinkText>
            <div className='flex gap-2 mt-2'>
                <ButtonPrimary onClick={() => handleConsent('true')}>
                    I accept
                </ButtonPrimary>
                <ButtonSecondary onClick={() => handleConsent('false')}>
                    No thanks
                </ButtonSecondary>
            </div>
        </Block>
    )
}
export default CookieConsent
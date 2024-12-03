'use client'

import Logo from "@components/ui/Logo"
import ButtonRow from "@components/ui/inputs/buttons/ButtonRow"
import LinkText from "@components/ui/inputs/buttons/LinkText"
import Description from "@components/ui/text/Description"
import TitleSmall from "@components/ui/text/TitleSmall"
import { IconCopyright } from "@tabler/icons-react"

const Footer = () => {
  return (
    <footer className="py-4 px-4 w-full mt-auto mb-0 bg-black dark:border-t dark:border-white text-white flex flex-wrap justify-between items-end">
      <Logo dark className="text-white" />
      <ButtonRow className='mt-4'>
        <LinkText href="/privacy-policy">Privacy policy</LinkText>
        <Description className="flex flex-row items-center gap-1">
            <IconCopyright className="w-4 h-4"/>
              All rights reserved, PaletteMaker 2024
        </Description>
      </ButtonRow>
    </footer>
  )
}

export default Footer
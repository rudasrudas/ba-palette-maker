'use client'

import Header from "@components/page-structure/Header"
import ThemeSwitcher from "@components/ui/ThemeSwitcher"
import ButtonPrimaryMedium from "@components/ui/inputs/buttons/ButtonPrimaryMedium"
import { IconArrowRight } from "@tabler/icons-react"

const HomePageHeader = () => {
  return (
    <Header>
      <Header.Actions>
        <ThemeSwitcher horizontal={true}/>
        <ButtonPrimaryMedium href="/create" Icon={IconArrowRight}>
            Create
        </ButtonPrimaryMedium>
      </Header.Actions>
    </Header>
  )
}
export default HomePageHeader
'use client'

import Footer from '@components/page-structure/Footer'
import Header from '@components/page-structure/Header'
import PaletteEditor from '@components/palette-editor/PaletteEditor'
import ButtonPrimary from '@components/ui/inputs/buttons/ButtonPrimary'
import { Suspense, useEffect, useState } from 'react'
import PaletteForm, { getNewCustomColor } from '@components/palette-form/PaletteForm'
import Page from '@components/page-structure/Page'
import PaletteExport from '@components/palette-export/PaletteExport'
import PalettePicker from '@components/palette-picker/PalettePicker'
import useQueryState from '@hooks/useQueryState'
import ColorblindnessNotice from '@components/page-structure/notifications/ColorblindnessNotice'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import Notifications from '@components/page-structure/Notifications'
import CookieConsent from '@components/page-structure/notifications/CookieConsent'
import ButtonPrimaryMedium from '@components/ui/inputs/buttons/ButtonPrimaryMedium'
import HeaderTools from './tools/HeaderTools'
import TitleExtraLarge from '@components/ui/text/TitleExtraLarge'
import ColorGenerationErrorNotice from './notifications/ColorGenerationErrorNotice'

export const PAGES = {
    FORM: 'new',
    PICKER: 'picker',
    EDITOR: 'editor',
    EXPORT: 'export'
}

export const SELECTION_TYPES = {
    CUSTOM: 'custom',
    SUGGESTIONS: 'suggestions'
}

function Edit() {
    'use client'
    const [palette, setPalette] = useState()
    const [formColors, setFormColors] = useState([getNewCustomColor()])
    const [page, setPage] = useQueryState('status')

    const [colorGenerationError, setColorGenerationError] = useState(false)

    // function to enable color generation error and turn off after 5 sec
    const onColorPickerError = () => {
        setColorGenerationError(true)
        setTimeout(() => {
            setColorGenerationError(false)
        }, 5000)
    }

    useEffect(() => {
        if(!page || (!palette && page !== PAGES.PICKER)) setPage(PAGES.FORM)
    }, [page, palette])

    const isPage = (p) => p === page

    return (
        <>
            <TitleExtraLarge isTitle={true} className={"hidden"}>Create new color palette</TitleExtraLarge>
            <Header>
                <Header.Toolbar>
                    { (isPage(PAGES.EDITOR)) && 
                        <HeaderTools/>
                    }
                </Header.Toolbar>
                <Header.Actions>
                    <ThemeSwitcher horizontal={true}/>
                    { palette &&
                        <ButtonPrimaryMedium onClick={() => setPage(PAGES.EXPORT)} tracking={{
                            action: 'export_palette',
                            category: 'Button',
                            label: 'Export Button',
                            value: '1',
                        }}>
                            Export & share
                        </ButtonPrimaryMedium>
                    }
                </Header.Actions>
            </Header>
            <Page>
                { isPage(PAGES.FORM) &&
                    <PaletteForm formColors={formColors} setFormColors={setFormColors} generate={() => setPage(PAGES.PICKER)} />
                }
                { isPage(PAGES.PICKER) &&
                    <PalettePicker formColors={formColors} setPalette={setPalette} goBack={(isError) => { isError && onColorPickerError(); setPage(PAGES.FORM);}} edit={() => setPage(PAGES.EDITOR)} />
                }
                { isPage(PAGES.EDITOR) &&
                    <PaletteEditor palette={palette} setPalette={setPalette} />
                }
                { isPage(PAGES.EXPORT) &&
                    <PaletteExport palette={palette} setPalette={setPalette} close={() => setPage(PAGES.EDITOR)} />
                }
            </Page>
            <Footer/>
            <Notifications>
                <ColorblindnessNotice/>
                <CookieConsent/>
                { colorGenerationError && <ColorGenerationErrorNotice/> }
            </Notifications>
        </>
    )
}

const PaletteMaker = () => {
    return (
        <Suspense>
            <Edit/>
        </Suspense>
    )
}

export default PaletteMaker
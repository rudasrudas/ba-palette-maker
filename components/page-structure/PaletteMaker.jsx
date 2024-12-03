'use client'

import Footer from '@components/page-structure/Footer'
import Header from '@components/page-structure/Header'
import PaletteEditor from '@components/palette-editor/PaletteEditor'
import ButtonPrimary from '@components/ui/inputs/buttons/ButtonPrimary'
import { Suspense, useEffect, useState } from 'react'
import PaletteForm from '@components/palette-form/PaletteForm'
import Page from '@components/page-structure/Page'
import PaletteExport from '@components/palette-export/PaletteExport'
import PalettePicker from '@components/palette-picker/PalettePicker'
import useQueryState from '@hooks/useQueryState'
import ColorblindnessNotice from '@components/page-structure/notifications/ColorblindnessNotice'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import Notifications from '@components/page-structure/Notifications'
import CookieConsent from '@components/page-structure/notifications/CookieConsent'

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
    const [formColors, setFormColors] = useState({
        selectionType: SELECTION_TYPES.SUGGESTIONS,
        selectedSuggestions: [],
        customColors: [{ id: 1 }]
    })
    const [page, setPage] = useQueryState('status')

    useEffect(() => {
        if(!page || (!palette && page !== PAGES.PICKER)) setPage(PAGES.FORM)
    }, [page, palette])

    const isPage = (p) => p === page

    return (
        <>
            <Header>
                <ThemeSwitcher/>
                { palette &&
                    <ButtonPrimary onClick={() => setPage(PAGES.EXPORT)} tracking={{
                        action: 'export_palette',
                        category: 'Button',
                        label: 'Export Button',
                        value: '1',
                    }}>
                        Export & share
                    </ButtonPrimary>
                }
            </Header>
            <Page>
                { isPage(PAGES.FORM) &&
                    <PaletteForm formColors={formColors} setFormColors={setFormColors} generate={() => setPage(PAGES.PICKER)} />
                }
                { isPage(PAGES.PICKER) &&
                    <PalettePicker formColors={formColors} setPalette={setPalette} goBack={() => setPage(PAGES.FORM)} edit={() => setPage(PAGES.EDITOR)} />
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
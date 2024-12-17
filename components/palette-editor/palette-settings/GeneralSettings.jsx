import RadioList from "@components/ui/inputs/radio/RadioList"
import RadioOption from "@components/ui/inputs/radio/RadioOption"
import useQueryState from "@hooks/useQueryState"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ColorFormatDropdown from "./dropdown-settings/ColorFormatDropdown"
import ColorblindnessDropdown, { COLORBLIND_MODES } from "./dropdown-settings/ColorblindnessDropdown"
import { useEffect } from "react"
import Title from "@components/ui/text/Title"
import Paragraph from "@components/ui/text/Paragraph"
import { IconStarFilled } from "@tabler/icons-react"

export const EDITOR_MODES = {
    EDIT: {
        value: 'edit',
        heading: 'Simple mode',
        description: 'Default view with minimal clutter for best experience'
    },
    COPY: {
        value: 'copy',
        heading: 'Copy mode',
        description: 'Pick a color format and copy individual color values'
    },
    CONTRAST: {
        value: 'contrast',
        heading: 'Contrast checker',
        description: 'Select a color to see which colors it contrasts with'
    },
    COLORBLIND: {
        value: 'colorblind',
        heading: 'Colorblind mode',
        description: 'See what your palette looks like with different color blindnesses',
    }
}

const GeneralSettings = ({  }) => {

    const [editModeId, setEditModeId] = useQueryState('mode', EDITOR_MODES.EDIT.value)
    const [colorblindnessId, setColorblindnessId] = useQueryState('colorblindness', COLORBLIND_MODES.NONE.value)

    useEffect(() => {
        if(editModeId !== EDITOR_MODES.COLORBLIND.value && colorblindnessId && colorblindnessId !== COLORBLIND_MODES.NONE.value)
            setColorblindnessId(COLORBLIND_MODES.NONE.value)
    }, [editModeId])

    const renderColorFormats = () => {
        const editorModes = Object.values(EDITOR_MODES) 
        const editMode = editorModes.find(mode => mode.value === editModeId) || EDITOR_MODES.EDIT

        return editorModes.map(em => {
            switch(em) {
                case EDITOR_MODES.COPY:
                    em.children = (
                        <div className='pr-6'>
                            <ColorFormatDropdown/>
                        </div>
                    )
                    break
                case EDITOR_MODES.COLORBLIND:
                    em.children = (
                        <div className='pr-6'>
                            <ColorblindnessDropdown/>
                        </div>
                    )
                    break
            }

            return (
                <RadioOption
                    actual={editMode}
                    select={(m) => setEditModeId(m.value)}
                    from={editorModes}
                    {...em}
                >
                </RadioOption>
            )
        })
    }

    return (<></>)

    return (
        <div className='flex flex-col gap-5'>
            <RadioList title='Edit mode'>
                {renderColorFormats()}
            </RadioList>

            <div className={`${editModeId === EDITOR_MODES.CONTRAST.value ? 'block' : 'hidden'}`}>
                <Title>Using contrast checker to effectively utilize your colors</Title>
                <Paragraph className='flex flex-col gap-5'>
                    The contrast checker assists you in evaluating the accessibility of your color combinations by indicating their contrast ratios.
                    <br/>Here's how to interpret the results:
                    <span className='pt-2 flex flex-col gap-5'>
                        <span className='flex flex-col'>
                            <span className='flex pb-2'>
                                <IconStarFilled className='w-4 h-4' />
                                <IconStarFilled className='w-4 h-4' />
                            </span>
                            <b className='whitespace-nowrap'>Excellent contrast</b>
                            Best for ensuring that text is legible and accessible.
                        </span>
                        <span className='flex flex-col'>
                            <IconStarFilled className='w-4 h-4 mb-2' />
                            <b className='whitespace-nowrap'>Acceptable contrast</b>
                            Adequate for general text but may not meet stringent accessibility guidelines.
                        </span>
                        <span className='flex flex-col'>
                            <span>--</span>
                            <b className='whitespace-nowrap'>Poor contrast</b>
                            These colors may pose readability issues and are not recommended for essential text.
                        </span>
                    </span>
                </Paragraph>
            </div>
        </div>
    )
}
export default GeneralSettings
import { EDITOR_MODES } from "@components/palette-editor/palette-settings/GeneralSettings"
import { COLORBLIND_MODES } from "@components/palette-editor/palette-settings/dropdown-settings/ColorblindnessDropdown"
import Block from "@components/ui/Block"
import ButtonPrimaryMedium from "@components/ui/inputs/buttons/ButtonPrimaryMedium"
import ButtonSecondaryMedium from "@components/ui/inputs/buttons/ButtonSecondaryMedium"
import Text from "@components/ui/text/Text"
import TitleSmall from "@components/ui/text/TitleSmall"
import useQueryState from "@hooks/useQueryState"
import { IconRestore, IconRotate } from "@tabler/icons-react"
import { useEffect } from "react"

const ColorblindnessNotice = () => {
    const [value, setValue] = useQueryState('colorblindness', COLORBLIND_MODES.NONE.value)
    const colorblindModes = Object.values(COLORBLIND_MODES)
    const colorblindMode = colorblindModes.find(c => c.value === value)

    const [modeId, setModeId] = useQueryState('mode', EDITOR_MODES.EDIT.value)

    useEffect(() => {
        if(modeId !== EDITOR_MODES.COLORBLIND.value)
            setValue()
    }, [modeId])

    if(colorblindMode)

    return (
        <Block className='flex flex-col gap-2 max-w-72'>
            <TitleSmall className=''>Colorblind mode: {colorblindMode.heading}</TitleSmall>
            <ButtonPrimaryMedium onClick={setModeId} className='group/btn'>
                Reset to default
                <IconRotate className="w-4 h-4 group-active/btn:-rotate-360 transition-transform"/>    
            </ButtonPrimaryMedium>
        </Block>
    )
}
export default ColorblindnessNotice
import Parameter from "@components/ui/Parameter"
import { useEffect, useState } from "react"
import RingSlider from "@components/ui/inputs/sliders/RingSlider"
import InputHex from "@components/ui/inputs/text/InputHex"
import Description from "@components/ui/text/Description"
import { IconClipboard } from "@tabler/icons-react"
import ButtonIconPrimary from "@components/ui/inputs/buttons/ButtonIconPrimary"
import { hexToOklch } from "@utils/colorConversion"

const AddColorSettings = ({ color, setColor, colorGroups }) => {

    const [hex, setHex] = useState('')
    const oklch = hexToOklch(hex)

    const findMatchingChromaGroup = () => {
        const colorGroup = colorGroups.find(cg => cg.colors.find(c => c.id === color.id))
        const correctColorGroup = colorGroups.find(cg => cg.chroma.range.min <= oklch?.chroma && cg.chroma.range.max >= oklch?.chroma)
        const isCorrectColorGroup = colorGroup == correctColorGroup

        return {
            isCorrectColorGroup,
            correctColorGroup
        }
    }

    const handlePaste = async () => {
        const readText = await navigator.clipboard.readText()
        setColor(prev => ({ ...prev, hex: readText.slice(0, 7).toUpperCase() }))
    }

    useEffect(() => {
        if(oklch) setColor(prev => ({ ...prev, hue: oklch.hue, empty: false }))
    }, [hex])

    const chromaMatch = findMatchingChromaGroup()

    return (
        <div className='grid grid-flow-row sm:grid-flow-col auto-cols-min gap-16'>
            <Parameter title="Hue value">
                <RingSlider min={0} max={360} onChange={(hue) => setColor(prev => ({ ...prev, hue, empty: false }))} initial={color?.hue || 0}/>
            </Parameter>
            <div className='flex flex-col gap-4'>
                <Parameter title='Hex code'>
                    <Description>Use your own hex code to create a color set matching its hue</Description>
                    <div className='flex gap-2 mt-3'>
                        <InputHex value={hex} onChange={setHex} />
                        <ButtonIconPrimary onClick={handlePaste} Icon={IconClipboard}/>
                    </div>
                </Parameter>
                { oklch && !chromaMatch.isCorrectColorGroup &&
                    <Description>Looks like there's a better matching color group, and its {chromaMatch.correctColorGroup?.title}!</Description>
                }
            </div>
        </div>
    )
}
export default AddColorSettings
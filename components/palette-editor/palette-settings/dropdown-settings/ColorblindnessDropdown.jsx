import Dropdown from "@components/ui/inputs/dropdown/Dropdown"
import useQueryState from "@hooks/useQueryState"
import blinder from "color-blind"
import { useEffect } from "react"

export const COLORBLIND_MODES = {
    NONE: {
        value: 'none',
        heading: 'None',
        convert: (v) => v
    },
    PROTANOPIA: {
        value: 'protanopia',
        heading: 'Protanopia',
        convert: (v) => blinder.protanopia(v)
    },
    DEUTERANOPIA: {
        value: 'deuteranopia',
        heading: 'Deuteranopia',
        convert: (v) => blinder.deuteranopia(v)
    },
    TRITANOPIA: {
        value: 'tritanopia',
        heading: 'Tritanopia',
        convert: (v) => blinder.tritanopia(v)
    },
    ACHROMATOPSIA: {
        value: 'achromatopsia',
        heading: 'Achromatopsia',
        convert: (v) => blinder.achromatopsia(v)
    }
}

const ColorblindnessDropdown = () => {
    const [value, setValue] = useQueryState('colorblindness', COLORBLIND_MODES.NONE.value)

    const colorblindModes = Object.values(COLORBLIND_MODES)
    const colorblindMode = colorblindModes.find(c => c.value === value) || COLORBLIND_MODES.NONE

    return (
        <Dropdown
            options={Object.values(COLORBLIND_MODES)}
            defaultOption={colorblindMode}
            onChange={(format) => setValue(format.value)}
        />
    )
}
export default ColorblindnessDropdown
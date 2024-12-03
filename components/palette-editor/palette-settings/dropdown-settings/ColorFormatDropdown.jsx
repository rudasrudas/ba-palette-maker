import Dropdown from "@components/ui/inputs/dropdown/Dropdown"
import { COLOR_FORMATS } from "@hooks/useColorExport"
import useQueryState from "@hooks/useQueryState"

const ColorFormatDropdown = () => {

    const [value, setValue] = useQueryState('format')

    const colorFormats = Object.values(COLOR_FORMATS)
    const currentFormat = colorFormats.find(cf => cf.value === value) || COLOR_FORMATS.HEX

    return (
        <Dropdown
            options={colorFormats}
            defaultOption={currentFormat}
            onChange={(format) => setValue(format.value)}
        />
    )
}
export default ColorFormatDropdown
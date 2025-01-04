import { cleanAngle } from "@utils/colorConversion"
import NumberInput from "./NumberInput"

const HueInput = ({ colorId, hue, setHue, className, linkFunctions = { initiateLinkUpdate: () => {} }, ...props }) => {

    const { initiateLinkUpdate } = linkFunctions

    const handleHueChange = (h) => {
        setHue(h)
        initiateLinkUpdate({ id: colorId, hue: h })
    }

    return (
        <NumberInput
            className={`max-w-[3.75rem] ${className}`}
            value={cleanAngle(hue).toFixed(1)}
            setValue={handleHueChange}
            min={0}
            max={360}
            step={0.2}
            name="°&nbsp;"
            precision={0.1}
            wrapValue={true}
            {...props}
        />
    )
}
export default HueInput
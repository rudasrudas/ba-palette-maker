import RingSlider from "@components/ui/inputs/sliders/RingSlider"
import Slider from "../../ui/inputs/sliders/Slider"
import Parameter from "@components/ui/Parameter"

const ColorSettings = ({ color, setColor, linkFunctions }) => {

    const { initiateLinkUpdate } = linkFunctions

    const handleHueChange = (hue) => {
        setColor(prev => ({ ...prev, hue }))
        initiateLinkUpdate({ id: color.id, hue })
    }

    return (
        <div>
            <Parameter title="Hue value">
                <RingSlider onChange={handleHueChange} initial={color.hue}/>
            </Parameter>
        </div>
    )
}
export default ColorSettings
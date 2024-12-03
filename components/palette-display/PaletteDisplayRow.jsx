import Color from "@components/palette-editor/color-set/Color"
import useColor from "@hooks/useColor"

const PaletteDisplayRow = ({ colorGroup, providedColors }) => {

    const renderHue = (colorsToRender, index) => {
        return colorsToRender.map(c => {
            return (
                <Color key={index} color={c} className='w-full grow'/>)
            }
        )
    }

    const renderColors = () => {
        return colorGroup.colors?.map((color, index) => {

            const COLOR_INFO = {
                count: colorGroup.count,
                lightness: colorGroup.lightness,
                chroma: colorGroup.chroma,
                hue: color.hue,
                advanced: colorGroup.advanced
            }
        
            const colorsToRender = useColor(COLOR_INFO)

            return (
                <div className='flex flex-row w-full min-h-10 max-h-32 grow'>
                    {renderHue(colorsToRender, index)}
                </div>
            )
        })
    }

    return (
        <div className={`contents`}>
            {renderColors()}
        </div>
    )
}
export default PaletteDisplayRow
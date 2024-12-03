import chromaJs from "chroma-js"
import { getDistributionPointAtStep } from "./useColor"
import nearestColor from "nearest-color"
import colorNameList from 'color-name-list'

const colors = colorNameList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {})
const shortColors = colorNameList.filter(color => color.name.length <= 10 && /^[a-zA-Z\s]*$/.test(color.name)).reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {})
const nearest = nearestColor.from(colors)
const nearestShort = nearestColor.from(shortColors)

const useColorName = ({ chroma, hue, tintDistribution, colors, useShort = false }) => {

    if(colors) {
        const names = colors.map(color => useShort ? nearestShort(color.hex).name : nearest(color.hex).name).filter(name => /^[a-zA-Z\s]*$/.test(name))

        names.sort((a, b) => a.length - b.length)

        return names[0] || 'Color'
        
    } else {
        const getLightness = () => {
            const { start, end } = lightnessRange
            return start > end ? { start: end, end: start } : { start, end }
        }

        const { start, end } = getLightness()

        const tint = getDistributionPointAtStep(tintDistribution, 0.5).y * (end - start) + start
    
        const hex = chromaJs.oklch({ l: tint, c: chroma, h: hue }).hex()
    
        return nearest(hex).name
    }
}
export default useColorName
import { oklchToHex, oklchToHsl, oklchToRgb } from "@utils/colorConversion"
import { Bezier } from "bezier-js"

const useColor = ({ count, lightness, chroma, hue, advanced }) => {
    try {
        const lightnessGradient = getGradient(lightness, count, true, advanced)
        const chromaGradient = advanced ? getGradient(chroma, count, true) : Array(count).fill(chroma.range.min)

        const gradient = []

        for(let i = 0; i < count; i++) {
            const l = +lightnessGradient[i]
            const c = +chromaGradient[i]
            const h = hue

            const oklchObject = { 
                lightness: l, 
                chroma: c, 
                hue: h 
            }

            const hex = oklchToHex(oklchObject)
            const rgb = oklchToRgb(oklchObject)
            const hsl = oklchToHsl(oklchObject)

            gradient.push({
                oklch: oklchObject,
                contrastTextColor: l < 0.6 ? '#FFFFFF' : '#000000',
                hex,
                rgb,
                hsl,
                text: {
                    hex,
                    hsl: `hsl(${roundConditionally(hsl.hue, 2)} ${roundConditionally(hsl.saturation, 2)}% ${roundConditionally(hsl.lightness*100, 2)}%)`,
                    rgb: `rgb(${rgb.red} ${rgb.green} ${rgb.blue})`,
                    oklch: `oklch(${roundConditionally(l*100, 2)}% ${roundConditionally(c, 2)} ${roundConditionally(h, 2)}deg)`,
                }
            })
        }

        return gradient.reverse()

    } catch(err) {
        throw err
    }
}

export default useColor

export function roundConditionally(num, precision) {
    if (Math.floor(num) === num) {
        return num.toString()
    } else {
        let rounded = Number(parseFloat(num).toFixed(precision))
        return rounded.toFixed(precision).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
    }
}

function getGradient(value, count, allowInversion, advanced = true) {

    const { min, max } = value.range

    const gradient = []

    const inverted = allowInversion && min > max;  // Determine if the range is inverted

    const effectiveMin = inverted ? max : min;
    const effectiveMax = inverted ? min : max;

    if (count === 1) {
        const median = (effectiveMax - effectiveMin) / 2 + effectiveMin;
        gradient.push(parseFloat(median).toPrecision(2));
    } else {
        const stepValue = (effectiveMax - effectiveMin) / (count - 1);

        for (let t = effectiveMin; t <= effectiveMax + 0.001; t += stepValue) {
            const normalizedT = Math.max(Math.min((t - effectiveMin) / (effectiveMax - effectiveMin), 0.999999), 0.000001)
            const distribution = advanced ? value.distribution : [0, 0, 1, 1]
            const distributionPoint = getDistributionPointAtStep(distribution, normalizedT, inverted);
            if (!distributionPoint) continue;

            const adjusted = distributionPoint.y * (max - min) + min;  // Always apply the original min and max
            gradient.push(+parseFloat(adjusted).toPrecision(2));
        }
    }

    return gradient
}

export function getDistributionPointAtStep(d = [0, 0, 1, 1], t, invert = false) {
    const curve = invert ? new Bezier(
        { x: 1, y: 1 },
        { x: d[2], y: d[3] },
        { x: d[0], y: d[1] },
        { x: 0, y: 0 }
    ) : new Bezier(
        { x: 0, y: 0 },
        { x: d[0], y: d[1] },
        { x: d[2], y: d[3] },
        { x: 1, y: 1 }
    )

    const stepLine = {
        p1: { x: t, y: 0 },
        p2: { x: t, y: 1 }
    }


    const points = curve.intersects(stepLine)
    if(!points.length) return

    const intersectionPoint = points[0]
    return curve.compute(intersectionPoint)
}
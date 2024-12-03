import useColor from "./useColor"

export const EXPORT_TYPES = {
    CSS: { name: 'CSS', value: 'css', fileFormat: 'colors.css' },
    TAILWIND: { name: 'Tailwind', value: 'tailwind', fileFormat: 'tailwind.config.js' },
    SCSS: { name: 'SCSS', value: 'scss', fileFormat: 'colors.scss' },
    ANDROID_XML: { name: 'Android XML', value: 'android-xml', fileFormat: 'colors.xml' },
    // ADOBE_SWATCH_EXCHANGE: { name: 'Adobe Swatch', value: 'ase', fileFormat: 'colors.ase' },
}

export const COLOR_FORMATS = {
    HEX: {
        value: 'hex',
        heading: 'HEX',
        description: 'The internet standard code to define rgb colors using hexadecimal values',
    },
    RGB: {
        value: 'rgb',
        heading: 'RGB',
        description: 'Red, green and blue channels, for easier manipulation compared to HEX',
    },
    OKLCH: {
        value: 'oklch',
        heading: 'OKLCH',
        description: 'The new and perceptually accurate color space and the new modern standard',
    },
    HSL: {
        value: 'hsl',
        heading: 'HSL',
        description: 'Common color space denoted by hue, saturation and value',
    }
}

const useColorExport = ({ colorGroups, exportType, colorFormat }) => {
    if(!colorGroups) return ''
    switch(exportType) {
        case EXPORT_TYPES.CSS.value: return convertToCss(colorGroups, colorFormat)
        case EXPORT_TYPES.SCSS.value: return convertToScss(colorGroups, colorFormat)
        case EXPORT_TYPES.TAILWIND.value: return convertToTailwind(colorGroups, colorFormat)
        case EXPORT_TYPES.ANDROID_XML.value: return convertToAndroidXml(colorGroups)
    }
}

export default useColorExport

function formatColors(colors, format) {
    switch(format.value) {
        case COLOR_FORMATS.RGB.value: return colors.map(c => c.text.rgb)
        case COLOR_FORMATS.HSL.value: return colors.map(c => c.text.hsl)
        case COLOR_FORMATS.OKLCH.value: return colors.map(c => c.text.oklch)
        case COLOR_FORMATS.HEX.value:
        default: return colors.map(c => c.text.hex)
    }
}

function roundToHundreds(value) {
    return Math.round(value / 100) * 100
}

function generateLightnessValues(minLightness, maxLightness, colorCount) {
    if (minLightness < 0 || minLightness > 1 || maxLightness < 0 || maxLightness > 1 || minLightness > maxLightness) {
        throw new Error('Invalid lightness values. Please ensure 0 <= minLightness <= maxLightness <= 1')
    }
    if (colorCount < 1 || colorCount > 9) {
        throw new Error('Invalid color count. Please ensure 1 <= colorCount <= 9')
    }

    let start = roundToHundreds(900 - maxLightness * 800)
    let end = roundToHundreds(900 - minLightness * 800)

    if(colorCount === 1) {
        return [roundToHundreds((end + start)/2)]
    }

    while ((end - start)/100 < colorCount - 1) {
        start = roundToHundreds(start - 100)
        end = roundToHundreds(end + 100)

        start = Math.max(100, start)
        end = Math.min(900, end)
    }

    const step = roundToHundreds((end - start) / (colorCount - 1))
    const lightnessValues = []

    for (let i = 0; i < colorCount; i++) {
        lightnessValues.push(start + i * step)
    }

    return lightnessValues
}

function nameToDashCase(name) {
    return `${name}`.toLowerCase().replaceAll(' ', '-')
}

function nameToSnakeCase(name) {
    return `${name}`.toLowerCase().replaceAll(' ', '_')
}
 
function convertToCss(colorGroups, colorFormat) {
    const modified = colorGroups.map(colorGroup => {
        const convertedColorGroup = colorGroup.colors.filter(c => !c.empty).map(color => {
            const COLOR_INFO = {
                count: colorGroup.count,
                lightness: colorGroup.lightness,
                chroma: colorGroup.chroma,
                hue: color.hue,
                advanced: colorGroup.advanced
            }

            const lightnessValues = generateLightnessValues(colorGroup.lightness.range.min, colorGroup.lightness.range.max, colorGroup.count)

            const colors = useColor(COLOR_INFO)
            const formattedColors = formatColors(colors, colorFormat)

            const namedColors = formattedColors.map((c, index) => {
                return `\t--${nameToDashCase(color.name)}-${lightnessValues[index]}: ${c};\n`
            })

            return namedColors.join('')
        }).join('\n')

        return `\n\t/* ${colorGroup.title} */\n${convertedColorGroup}`
    }).join('')

    return `:root {${modified}}`
}

function convertToScss(colorGroups, colorFormat) {
    const modified = colorGroups.map(colorGroup => {
        const convertedColorGroup = colorGroup.colors.filter(c => !c.empty).map(color => {
            const COLOR_INFO = {
                count: colorGroup.count,
                lightness: colorGroup.lightness,
                chroma: colorGroup.chroma,
                hue: color.hue,
                advanced: colorGroup.advanced
            }

            const lightnessValues = generateLightnessValues(colorGroup.lightness.limit.min, colorGroup.lightness.limit.max, colorGroup.count)

            const colors = useColor(COLOR_INFO)
            const formattedColors = formatColors(colors, colorFormat)

            const namedColors = formattedColors.map((c, index) => {
                return `$${nameToDashCase(color.name)}-${lightnessValues[index]}: ${c};`
            })

            return namedColors.join('\n')
        }).join('\n\n')

        return `/* ${colorGroup.title} */\n${convertedColorGroup}`
    }).join('\n\n')

    return modified
}

function convertToAndroidXml(colorGroups) {
    const modified = colorGroups.map(colorGroup => {
        const convertedColorGroup = colorGroup.colors.filter(c => !c.empty).map(color => {
            const COLOR_INFO = {
                count: colorGroup.count,
                lightness: colorGroup.lightness,
                chroma: colorGroup.chroma,
                hue: color.hue,
                advanced: colorGroup.advanced
            }

            const lightnessValues = generateLightnessValues(colorGroup.lightness.limit.min, colorGroup.lightness.limit.max, colorGroup.count)

            const colors = useColor(COLOR_INFO)
            const formattedColors = formatColors(colors, COLOR_FORMATS.HEX.value)

            const namedColors = formattedColors.map((c, index) => {
                return `\t<color name="${nameToSnakeCase(color.name)}_${lightnessValues[index]}">${c}</color>`
            })

            return namedColors.join('\n')
        }).join('\n\n')

        return `\t<!-- ${colorGroup.title} -->\n${convertedColorGroup}`
    }).join('\n\n')

    return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${modified}\n</resources>`
}

function convertToTailwind(colorGroups, colorFormat) {
    const modified = colorGroups.map(colorGroup => {
        const convertedColorGroup = colorGroup.colors.filter(c => !c.empty).map(color => {
            const COLOR_INFO = {
                count: colorGroup.count,
                lightness: colorGroup.lightness,
                chroma: colorGroup.chroma,
                hue: color.hue,
                advanced: colorGroup.advanced
            }

            const lightnessValues = generateLightnessValues(colorGroup.lightness.limit.min, colorGroup.lightness.limit.max, colorGroup.count)

            const colors = useColor(COLOR_INFO)
            const formattedColors = formatColors(colors, colorFormat)

            const namedColors = formattedColors.map((c, index) => {
                return `\t\t\t\t${lightnessValues[index]}: '${c}',`
            })

            return `\n\t\t\t'${nameToDashCase(color.name)}': {\n${namedColors.join('\n')}\n\t\t\t},`
        }).join('')

        return convertedColorGroup
    }).join('')

    return `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n\ttheme: {\n\t\tcolors: {${modified}\n\t\t},\n\t},\n}`
}
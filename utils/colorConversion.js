import chromaJs from "chroma-js"

export const cleanAngle = (value) => {
    return ((value % 360) + 360) % 360;
}

export const mapRange = (x, inMin, inMax, outMin, outMax) => {
    return outMin + ((x - inMin) * (outMax - outMin)) / (inMax - inMin);
}

export const isOklch = (value) => {
    return value !== null && typeof value === 'object' && 
           'lightness' in value && 'chroma' in value && 'hue' in value;
}

export const isValidHex = (value) => /^#[0-9A-F]{6}$/i.test(value)

export const hexToOklch = (hex) => {

    if(isValidHex(hex)) {
        const oklch = chromaJs.hex(hex).oklch()
        return {
            lightness: oklch[0],
            chroma: oklch[1],
            hue: oklch[2],
        }
    }
}

export const oklchToHsl = ({ lightness, chroma, hue }) => {
    const hsl = chromaJs.oklch([lightness, chroma, hue]).hsl()
    return {
        hue: parseFloat(hsl[0]).toFixed(2),
        saturation: parseFloat(hsl[1]).toFixed(2),
        lightness: parseFloat(hsl[2]).toFixed(2),
    }
}

export const oklchToHex = ({ lightness, chroma, hue }) => {
    return chromaJs.oklch([lightness, chroma, hue]).hex().toUpperCase()
}

export const oklchToRgb = ({ lightness, chroma, hue }) => {
    const rgb = chromaJs.oklch([lightness, chroma, hue]).rgb()
    return {
        red: rgb[0],
        green: rgb[1],
        blue: rgb[2],
    }
}

export const contrastTextColor = (color) => {
    if(isValidHex(color)) {
        return chromaJs.contrast(color, 'white') > 4.5 ? '#FFFFFF' : '#000000'
    }
    if(isOklch(color)) {
        return color.lightness < 0.6 ? '#FFFFFF' : '#000000'
    }
    return '#000000'
}
import paletteOklch from '@utils/oklch';
import chromaJs, { random } from 'chroma-js';
import { useEffect, useState } from 'react';
import useColorName from './useColorName';
import { oklchToHex, oklchToHsl, oklchToRgb } from '@utils/colorConversion';
import { roundConditionally } from './useColor';

const ACTIONS = {
    ADD: 'add',
    ALTER: 'alter',
    REMOVE: 'remove'
}

const PARAMETERS = {
    LIGHTNESS: 'lightness',
    CHROMA: 'chroma',
    HUE: 'hue',
    TINT_DISTRIBUTION: 'tintDistribution'
}

const TYPES = {
    HARMONY: {
        MONOCHROMATIC: 'monochromatic',
        ANALOGOUS: 'analogous',
        TRIAD: 'triad',
        SQUARE: 'square',
        COMPLEMENTARY: 'complementary',
        SPLIT_COMPLEMENTARY: 'splitComplementary'
    },
    ALL_HARMONY: 'harmony',
    CONTRAST: 'contrast',
    COLOR_COUNT: 'colorCount',
    RANDOM: 'random'
}

export const useSimpleSuggestions = ({ existingColors = [], action = [], parameter = [], type = [], count = 10 }) => {

    const [suggestions, setSuggestions] = useState([])

    const refresh = () => {
        const randomColors = generateRandomColors(count)
        setSuggestions(randomColors)
    }

    const generate = () => {
        if(type.includes(TYPES.RANDOM) || !existingColors.length) {
            const randomColors = generateRandomColors(count).map(color => {
                const oklch = {
                    lightness: color.lightness,
                    chroma: color.chroma,
                    hue: color.hue
                }
                const hex = oklchToHex(oklch).toUpperCase()
                const rgb = oklchToRgb(oklch)
                const hsl = oklchToHsl(oklch)

                return { 
                oklch,
                hex: color.hex.toUpperCase(),
                rgb,
                hsl,
                text: {
                    hex,
                    hsl: `hsl(${roundConditionally(hsl.hue, 2)} ${roundConditionally(hsl.saturation, 2)}% ${roundConditionally(hsl.lightness*100, 2)}%)`,
                    rgb: `rgb(${rgb.red} ${rgb.green} ${rgb.blue})`,
                    oklch: `oklch(${roundConditionally(color.lightness*100, 2)}% ${roundConditionally(color.chroma, 2)} ${roundConditionally(color.hue, 2)}deg)`,
                }
            }})
            console.log(randomColors)
            setSuggestions(randomColors)
        } else {
            // Suggest based on existing colors
        }
    }

    useEffect(generate, [])

    return { suggestions, refresh }
}

export const useSuggestions = ({ type, colorGroups, options }) => {

}

export default { ACTIONS, PARAMETERS, TYPES, useSimpleSuggestions, useSuggestions }

//////////////////////////
// Generating functions //
//////////////////////////

function generateRandomColors(x) {
    const colors = []

    for (let i = 0; i < x; i++) {
        const random = chromaJs.random(new Date())
        const color = { 
            ...paletteOklch(random.oklch()),
            id: random.hex(), //CHANGE
            hex: random.hex(),
        }
        color.name = useColorName({ colors: [color], useShort: true })
        colors.push(color)
    }

    return colors;
}
export const HARMONY_TYPES = {
    MONOCHROMATIC: 'monochromatic',
    ANALOGOUS: 'analogous',
    COMPLEMENTARY: 'complementary',
    SPLIT_COMPLEMENTARY: 'splitComplementary',
    TRIADIC: 'triadic',
    SQUARE: 'square',
    TETRADIC: 'tetradic',
}

export const HARMONIES = {
    MONOCHROMATIC: {
        id: HARMONY_TYPES.MONOCHROMATIC,
        name: 'Monochromatic',
        file: 'monochromatic.svg',
        description: 'Provides a soothing and elegant feel, ideal for minimalist designs that value simplicity.'
    },
    ANALOGOUS: {
        id: HARMONY_TYPES.ANALOGOUS,
        name: 'Analogous',
        file: 'analogous.svg',
        description: 'Offers a comfortable and harmonious atmosphere, perfect for serene and natural settings.'
    },
    COMPLEMENTARY: {
        id: HARMONY_TYPES.COMPLEMENTARY,
        name: 'Complementary',
        file: 'complementary.svg',
        description: 'Creates bold and vibrant visuals, great for designs that aim to capture attention.'
    },
    SPLIT_COMPLEMENTARY: {
        id: HARMONY_TYPES.SPLIT_COMPLEMENTARY,
        name: 'Split Complementary',
        file: 'split-complementary.svg',
        description: 'Balances vibrant contrasts with a refined aesthetic, suitable for dynamic yet harmonious designs.'
    },
    TRIADIC: {
        id: HARMONY_TYPES.TRIADIC,
        name: 'Triadic',
        file: 'triadic.svg',
        description: 'Produces a lively and colorful feel, ideal for playful and energetic designs.'
    },
    SQUARE: {
        id: HARMONY_TYPES.SQUARE,
        name: 'Square',
        file: 'square.svg',
        description: 'Offers a balanced mix of contrast and harmony, energizing designs with diverse visual interest.'
    },
    TETRADIC: {
        id: HARMONY_TYPES.TETRADIC,
        name: 'Tetradic',
        file: 'tetradic.svg',
        description: 'Provides a rich and complex palette, perfect for sophisticated and luxurious designs.'
    },
}

export default class HarmonyList {
    constructor() {
        this.harmonies = []
    }

    add(type, hues) {
        this.harmonies.push({ type, hues })
    }

    addMonochromatic(hues) { this.add(HARMONY_TYPES.MONOCHROMATIC, hues) }
    addAnalogous(hues) { this.add(HARMONY_TYPES.ANALOGOUS, hues) }
    addComplementary(hues) { this.add(HARMONY_TYPES.COMPLEMENTARY, hues) }
    addSplitComplementary(hues) { this.add(HARMONY_TYPES.SPLIT_COMPLEMENTARY, hues) }
    addTriadic(hues) { this.add(HARMONY_TYPES.TRIADIC, hues) }
    addSquare(hues) { this.add(HARMONY_TYPES.SQUARE, hues) }
    addTetradic(hues) { this.add(HARMONY_TYPES.TETRADIC, hues) }

    get() {
        return this.harmonies
    }
}
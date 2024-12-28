import { EDITOR_MODES } from "@components/palette-editor/palette-settings/GeneralSettings"
import { COLOR_FORMATS } from "@hooks/useColorExport"
import { getRandomInt } from "./utils"

const { default: ColorHarmonyBuilder } = require("./colorHarmonyBuilder")

export default class PaletteGenerator {
    constructor() {
        this.colorGroups = this.getColorGroups()
    }

    createVariations(providedColors) {
        const colorHarmonyBuilder = new ColorHarmonyBuilder(providedColors)
        const harmonies = colorHarmonyBuilder.getHarmonies()
        const colors = colorHarmonyBuilder.getColors()

        this.assignRequiredColorsToColorGroups(colors)
        if(!harmonies.length) {
            harmonies.push({
                type: 'none',
                hues: this.generateRandomHues(Math.ceil(Math.random(), 4))
            })
            harmonies.push({
                type: 'none',
                hues: this.generateRandomHues(Math.ceil(Math.random(), 4))
            })
            harmonies.push({
                type: 'none',
                hues: this.generateRandomHues(Math.ceil(Math.random(), 4))
            })
            harmonies.push({
                type: 'none',
                hues: this.generateRandomHues(Math.ceil(Math.random(), 4))
            })
        }

        const hueVariations = this.generateHarmonyVariations(harmonies)
        const lightnessChromaVariations = this.generateLightnessChromaVariations()

        const generate = () => {
            const hvc = hueVariations.length
            const hV = hueVariations[Math.floor(Math.random() * hvc)]
            const harmonyType = hV[0].harmonyType

            const groups = this.colorGroups.map(cg => {
                const updatedGroup = { ...cg }

                const cgLightnessChromaVariations = lightnessChromaVariations.find(v => v.id === cg.id).variations
                const lcvCount = cgLightnessChromaVariations.length
                const lcV = cgLightnessChromaVariations[Math.floor(Math.random() * lcvCount)]

                updatedGroup.harmonyType = hV?.find(a => a.id === cg.id).harmonyType
                updatedGroup.colors = hV?.find(a => a.id === cg.id).hues.map(h => ({ name: '', hue: h, isLocked: false, id: Math.floor(Math.random()*3000) }))
                updatedGroup.advanced = true
                updatedGroup.count = lcV.count
                updatedGroup.lightness = lcV.lightness
                updatedGroup.chroma = lcV.chroma

                return updatedGroup
            })

            return {
                id: Math.floor(Math.random() * 3000),
                links: [],
                colorGroups: groups,
                harmonyType,
            }
        }

        return {
            groups: this.colorGroups,
            providedColors,
            generate
        }
    }

    getColorGroups() {
        return [
            {
                title: "Accents",
                id: 'accents',
                lightness: {
                    limit: { min: 0, max: 1 },
                    minShadeDifference: 0.07
                },
                chroma: {
                    limit: { min: 0.09, max: 0.37 },
                    minShadeDifference: 0.01
                },
                colors: [],
                shadeLimits: { min: 4, max: 9 },
                hueLimits: { min: 1, max: 3 }
            },
            {
                title: "Neutrals",
                id: 'neutrals',
                lightness: {
                    limit: { min: 0, max: 1 },
                    minShadeDifference: 0.2
                },
                chroma: {
                    limit: { min: 0.01, max: 0.09 },
                    minShadeDifference: 0.005
                },
                colors: [],
                shadeLimits: { min: 6, max: 9 },
                hueLimits: { min: 1, max: 4 }
            },
            {
                title: "Grays",
                id: 'grays',
                lightness: {
                    limit: { min: 0, max: 1 },
                    minShadeDifference: 0.2
                },
                chroma: {
                    limit: { min: 0, max: 0.02 },
                    minShadeDifference: 0.001
                },
                colors: [],
                shadeLimits: { min: 6, max: 9 },
                hueLimits: { min: 1, max: 2 }
            }
        ]
    }

    assignRequiredColorsToColorGroups(colors) {
        this.colorGroups.forEach(cg => {
            cg.requiredColors = colors.filter(color => cg.chroma.limit.min <= color.chroma && color.chroma <= cg.chroma.limit.max )
        })
    }

    generateRandomHues(count) {
        const hues = []
        
        for(let i = 0; i < count; i++) {
            hues.push(Math.random() * 360)
        }

        return hues
    }

    generateHarmonyVariations(harmonies) {
        const numVariations = 1
        const variations = []

        harmonies.forEach(harmony => {
            for (let i = 0; i < numVariations; i++) {
                let variation = this.getInitialHarmonyVariation()
        
                variation.forEach(groupVariation => {
                    const selectedHues = []
                    const correctedHues = groupVariation.colors.map(color => 'correctedHue' in color ? color.correctedHue : null ).filter(a => a)
                    const numberOfSelectedHues = getRandomInt(groupVariation.hueLimits.min, groupVariation.hueLimits.max)

                    const availableHues = [...new Set([...harmony.hues])]

                    let attempts = 0
                    while (selectedHues.length < numberOfSelectedHues && attempts < 100) {
                        attempts++
                        const randomIndex = getRandomInt(0, availableHues.length)
                        const hue = availableHues.splice(randomIndex, 1)[0]
        
                        if (!selectedHues.includes(hue) && !correctedHues.includes(hue)) {
                            selectedHues.push(hue)
                        }
                    }
        
                    groupVariation.hues = [...new Set([...groupVariation.colors.map(c => c.hue), ...selectedHues])]
                })
        
                variations.push(variation.map(groupVariation => ({
                    id: groupVariation.id,
                    harmonyType: harmony.type,
                    hues: groupVariation.hues.filter(a => a)
                })))
            }
        })
    
        return variations
    }

    getInitialHarmonyVariation() {
        return this.colorGroups.map(group => ({
            id: group.id,
            colors: group.requiredColors,
            hueLimits: group.hueLimits
        }))
    }

    generatePossiblePositions(colorCount, colors, lightnessLikenessThreshold, chromaLikenessThreshold, minShadeDifferences) {
        // Generate all permutations of positions
        let permutations = this.permute(Array.from({ length: colorCount }, (_, i) => i));
        let validConfigurations = [];
    
        permutations.forEach(permutation => {
            let isValid = true;
            let positionedColors = colors.map((color, index) => ({
                ...color,
                position: permutation[index]
            }));
    
            // Sort positioned colors by their assigned position
            positionedColors.sort((a, b) => a.position - b.position);
    
            // Check if the lightness and chroma values go in the correct order
            for (let i = 1; i < positionedColors.length; i++) {
                let prev = positionedColors[i - 1];
                let current = positionedColors[i];
    
                if (!(current.lightness >= prev.lightness && 
                    ((current.chroma >= prev.chroma && current.position !== prev.position) ||
                     (current.chroma <= prev.chroma && current.position !== prev.position)))) {
                    isValid = false;
                    break;
                }

                if (Math.abs(current.lightness - prev.lightness) < minShadeDifferences.lightness) {
                    isValid = false;
                    break;
                }

                if (Math.abs(current.chroma - prev.chroma) < minShadeDifferences.chroma) {
                    isValid = false;
                    break;
                }
    
                // Check for likeness thresholds to potentially assign the same position
                if (Math.abs(current.lightness - prev.lightness) <= lightnessLikenessThreshold &&
                    Math.abs(current.chroma - prev.chroma) <= chromaLikenessThreshold) {
                    if (current.position !== prev.position) {
                        isValid = false;
                        break;
                    }
                }
            }


    
            if (isValid && positionedColors.length > 0) {
                validConfigurations.push(positionedColors);
            }
        });
    
        return validConfigurations;
    }
    
    permute(permutation) {
        let length = permutation.length,
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1, k, p;
    
        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                result.push(permutation.slice());
            } else {
                c[i] = 0;
                ++i;
            }
        }
        return result;
    }

    getRandomBetween(a, b) {
        return Math.random() * (b - a) + a;
    }

    calculateRangeForOneColor(colorCount, limit, value, index) {
        const leftDistance = value - limit.min
        const rightDistance = limit.max - value

        if(colorCount === 0) {
            const maxAllowedSideRange = Math.min(leftDistance, rightDistance)
            return {
                min: value - maxAllowedSideRange,
                max: value + maxAllowedSideRange
            }
        } else {
            const leftRange = index === 0 ? Infinity : leftDistance/index
            const rightRange = (colorCount - index) === 0 ? Infinity : rightDistance/(colorCount - index)
            const maxAllowedSideRange = Math.min(leftRange, rightRange)
            const distance = this.getRandomBetween(0, maxAllowedSideRange)

            return {
                min: value - (distance * index),
                max: value + (distance * (colorCount + 1 - index))
            }
        }
    }

    calculateRangeForTwoColors(colorCount, valueA, indexA, valueB, indexB) {
        const distance = (indexA === indexB) ? 0 : (Math.abs(valueA - valueB) / Math.abs(indexA - indexB))

        const min = valueA - distance * indexA
        const max = valueA + (distance * (colorCount + 1 - indexA))

        return { min, max }
    }

    generateLightnessChromaVariations() {
        return this.colorGroups.map(colorGroup => {
            const variations = []

            for(let i = colorGroup.shadeLimits.min; i <= colorGroup.shadeLimits.max; i++) {
                if(colorGroup.requiredColors.length > 0) {
                    const possiblePositions = this.generatePossiblePositions(i, colorGroup.requiredColors, 0, 0, {
                        lightness: colorGroup.lightness.minShadeDifference,
                        chroma: colorGroup.chroma.minShadeDifference
                    }).map(pp => {
                        const lightness = {
                            limit: colorGroup.lightness.limit,
                            distribution: [0, 0, 1, 1]
                        }

                        const chroma = {
                            limit: colorGroup.chroma.limit,
                            distribution: [0, 0, 1, 1]
                        }

                        if(!pp.length) return null

                        // Calculate ranges and distribution
                        switch(pp.length) {
                            case 1:
                                lightness.range = this.calculateRangeForOneColor(i, lightness.limit, pp[0].lightness, pp[0].position)
                                chroma.range = this.calculateRangeForOneColor(i, chroma.limit, pp[0].chroma, pp[0].position)
                                break
                            case 2:
                                lightness.range = this.calculateRangeForTwoColors(i, pp[0].lightness, pp[0].position, pp[1].lightness, pp[1].position)
                                chroma.range = this.calculateRangeForTwoColors(i, pp[0].chroma, pp[0].position, pp[1].chroma, pp[1].position)
                                break
                            case 3:
                                // TODO: change to curve fitting
                                lightness.range = this.calculateRangeForTwoColors(i, pp[0].lightness, pp[0].position, pp[1].lightness, pp[1].position)
                                chroma.range = this.calculateRangeForTwoColors(i, pp[0].chroma, pp[0].position, pp[1].chroma, pp[1].position)
                                break
                        }

                        return {
                            count: i,
                            lightness,
                            chroma
                        }
                    })
                    
                    const filtered = possiblePositions.filter(v => {
                        return  v.lightness.range.min < v.lightness.range.max && 
                                v.lightness.range.min >= v.lightness.limit.min && v.lightness.range.max <= v.lightness.limit.max && 
                                v.chroma.range.min >= v.chroma.limit.min && v.chroma.range.max <= v.chroma.limit.max 
                                // && (v.lightness.rang e.max - v.lightness.range.min)*2 > (v.lightness.limit.max - v.lightness.limit.min)
                                // && Math.abs(v.chroma.range.max - v.chroma.range.min)*2 < (v.chroma.limit.max - v.chroma.limit.min)
                    })

                    const idealFiltered = filtered.filter(v => {
                        return  (v.lightness.range.max - v.lightness.range.min)*2 > (v.lightness.limit.max - v.lightness.limit.min)
                                && Math.abs(v.chroma.range.max - v.chroma.range.min)*2 < (v.chroma.limit.max - v.chroma.limit.min)
                    })

                    if(idealFiltered.length) variations.push(...idealFiltered)
                    else if(filtered.length) variations.push(...filtered)
                    else variations.push(...possiblePositions)

                } else {
                    for(let j = 0; j < 10; j++) {
                        const a = this.getRandomBetween(colorGroup.lightness.limit.min * 1.1, colorGroup.lightness.limit.max * 0.9)
                        const b = this.getRandomBetween(colorGroup.lightness.limit.min * 1.1, colorGroup.lightness.limit.max * 0.9)
                        const c = this.getRandomBetween(colorGroup.chroma.limit.min * 1.1, colorGroup.chroma.limit.max * 0.9)
                        const d = this.getRandomBetween(colorGroup.chroma.limit.min * 1.1, colorGroup.chroma.limit.max * 0.9)

                        const lightness = {
                            limit: colorGroup.lightness.limit,
                            range: { min: Math.min(a, b), max: Math.max(a, b) },
                            distribution: [0, 0, 1, 1]
                        }

                        const chroma = {
                            limit: colorGroup.chroma.limit,
                            range: { min: c, max: d },
                            distribution: [0, 0, 1, 1]
                        }

                        variations.push({
                            count: i,
                            lightness,
                            chroma
                        })
                    }
                }
            }

            return {
                title: colorGroup.title,
                id: colorGroup.id,
                variations
            }
        })
    }
}

// 1. Define color harmony to work with
//     1.1 Extract given hues
//     1.2 Group hues if they're within 2 degrees [Magic number] of each other and use
//         the one with higher chroma as original
//     1.3 Go through each color harmony and evaluate how well it would
//         work with given hues
//         - 1 hue would match every harmony
//         - 2 hues would match one of analogous, triadic, (complementary and square) or
//             split complementary, and always tetradic
//         - 3 hues would match one of analogous, triadic, square or split complementary
//             and most likely always tetradic. Never complementary, sometimes square
// 2. Generate list of hues to work with
//     2.1 Define missing hues within the harmony and add them
// 3. Define list of color hues to work within each color group
//     3.1 Place each original hue into their color groups
//     3.2 Generate a list of possible variations, where each variation gets
//         some colors assigned to the color groups [Magic numbers].
// 4. Calculate lightness distribution and chroma distribution 
//    based on the lightness and chroma of the given colors
//     4.1 For each color group, get a list of possible color counts
//     4.2 Pick out random [Magic number] lists of
//         min and max values, where the range would cover values of the given colors
//     4.3 Generate a list of possible point groups to test, where
//         each value (y) crosses one of the color interval line (x),
//         and points increase in both x and y compared to the previous ones
//     4.4 Filter the possible point groups out by validating if a bezier
//         curve can be drawn through the points with 0 to 1 value limits
//         for each p1 to p4 value
// 5. Build color palettes
//     5.1 Mix harmonies (hue lists assigned to color groups), lightness (min, max and distribution),
//         and chroma (min, max and distribution) results to generate endless color palettes

// min limit ------------------------------------------- max limit
//             min range ------------------------- max range
//                       |   |   |   |   |   |   |    intervals
//                           X           X            requiredColors

// 1. Iterate through each number of possible counts from minRequiredColorCount to maxColorCount
// 2. Iterate through every possible combination of requiredColors falling on every interval (two colors can't overlap unless they share same value, in which case they must)
// Maybe there's a formula to calculate min and max range so that requiredColors fall on the intervals?
// 3. 
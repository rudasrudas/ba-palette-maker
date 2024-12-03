import HarmonyList from "./harmonyList"

const { isValidHex, hexToOklch, isOklch } = require("./colorConversion")
const SIMILARITY_TOLERANCE = 2

export default class ColorHarmonyBuilder {

    constructor(colors) {
        this.original = colors.map(color => this.parseColor(color))
        this.hues = this.bundleSimilarHues()
    }

    static fromColors(colors) {
        return new ColorHarmonyBuilder(colors)
    }

    bundleSimilarHues() {
        const correctedHues = this.original.map(color => ({
            ...color,
            correctedHue: color.hue
        }));

        correctedHues.forEach((color, index) => {
            let maxChromaColor = color

            correctedHues.forEach((compareColor, compareIndex) => {
                if (index !== compareIndex && this.getHueDifference(color.hue, compareColor.hue) <= SIMILARITY_TOLERANCE) {
                    if (compareColor.chroma > maxChromaColor.chroma) {
                        maxChromaColor = compareColor
                    }
                }
            })

            color.correctedHue = maxChromaColor.hue
        })

        // Return unique corrected hues only
        const uniqueCorrectedHues = new Set(correctedHues.map(color => color.correctedHue))
        return Array.from(uniqueCorrectedHues)
    }

    getColors() {
        return this.original
    }

    getHues() {
        return this.hues.map(hue => hue % 360)
    }

    parseColor(color) {
        
        if(isOklch(color))
            return color

        if(isOklch(color.oklch))
            return color.oklch

        if(isValidHex(color.hex)) 
            return hexToOklch(color.hex)
        
        else throw Error('Color is invalid')
    }

    clone() {
        const cloned = new ColorHarmonyBuilder(this.original.map(color => {
            if (typeof color === 'string') {
                return color
            } else {
                return { ...color }
            }
        }))
        cloned.hues = [...this.hues]
        return cloned
    }

    getHueDifference(a, b) {
        const diff = Math.abs(a - b)
        return Math.min(diff, 360 - diff)
    }

    groupHues(degrees, errorMargin = 0) {
        let groups = []
        let grouped = []
        let unassigned = [...this.hues]

        unassigned.sort((a, b) => a - b)

        for (let i = 0; i < unassigned.length; i++) {
            let currentGroup = [unassigned[i]]
            let currentHue = unassigned[i]

            for (let j = i + 1; j < unassigned.length; j++) {
                let difference = this.getHueDifference(currentHue, unassigned[j])
                if (difference <= degrees + errorMargin) {
                    currentGroup.push(unassigned[j])
                    currentHue = unassigned[j]
                    grouped.push(unassigned[j])
                } else {
                    break
                }
            }

            if (currentGroup.length > 1) {
                groups.push(currentGroup)
                grouped.push(unassigned[i])
            } else {
                unassigned[i] = null
            }
        }

        unassigned = unassigned.filter(h => h !== null)
        return { groups, grouped, unassigned, allGrouped: !unassigned.length }
    }

    hueCountEquals(x) {
        return this.hues.length === x
    }

    findLargestGap() {
        this.hues.sort((a, b) => a - b) // Ensure the hues are sorted
        let maxGap = 0
        let extremes = {low: 0, high: 0}

        for (let i = 0; i < this.hues.length; i++) {
            let nextIndex = (i + 1) % this.hues.length
            let currentGap = (this.hues[nextIndex] - this.hues[i] + 360) % 360
            if (currentGap >= maxGap) {
                maxGap = currentGap
                extremes.low = this.hues[i]
                extremes.high = this.hues[nextIndex]
            }
        }

        // Ensure the wrap-around gap is properly calculated
        if (this.hues.length > 1) {
            let wrapAroundGap = (360 - this.hues[this.hues.length - 1] + this.hues[0]) % 360
            if (wrapAroundGap >= maxGap) {
                maxGap = wrapAroundGap
                extremes.low = this.hues[this.hues.length - 1]
                extremes.high = this.hues[0]
            }
        }

        return extremes
    }

    findSmallestGap() {
        this.hues.sort((a, b) => a - b) // Ensure the hues are sorted
        let minGap = Infinity
        let extremes = {low: 0, high: 0}

        for (let i = 0; i < this.hues.length; i++) {
            let nextIndex = (i + 1) % this.hues.length
            let currentGap = (this.hues[nextIndex] - this.hues[i] + 360) % 360
            if (currentGap < minGap) {
                minGap = currentGap
                extremes.low = this.hues[i]
                extremes.high = this.hues[nextIndex]
            }
        }

        // Check wrap-around gap
        if (this.hues.length > 1) {
            let wrapAroundGap = (360 - this.hues[this.hues.length - 1] + this.hues[0]) % 360
            if (wrapAroundGap < minGap) {
                minGap = wrapAroundGap
                extremes.low = this.hues[this.hues.length - 1]
                extremes.high = this.hues[0]
            }
        }

        return extremes
    }

    findUniqueSmallestGapExtreme() {
        const largestGap = this.findLargestGap()
        const smallestGap = this.findSmallestGap()

        if (smallestGap.low === largestGap.low || smallestGap.low === largestGap.high) {
            return smallestGap.high
        } else {
            return smallestGap.low
        }
    }

    insertHues(...huesToInsert) {
        const largestGap = this.findLargestGap()

        huesToInsert.forEach(hue => {
            if(hue > 0) this.hues.push(largestGap.low + hue + 360 % 360)
            else this.hues.push(largestGap.high + hue + 360 % 360)
        })

        return this
    }

    insertHueAtLargestGapMidpoint() {
        const gap = this.findLargestGap()
        const midpoint = (gap.low + (gap.high + 360 - gap.low) % 360 / 2) % 360
        this.insertHues(midpoint)

        return this
    }

    insertHueAtSmallestGapMidpoint() {
        const gap = this.findSmallestGap()
        const midpoint = (gap.low + (gap.high + 360 - gap.low) % 360 / 2) % 360
        this.insertHues(midpoint)

        return this
    }

    getHarmonies() {
        const harmonies = []

        harmonies.push(...this.getMonochromatic())
        harmonies.push(...this.getAnalogous())
        harmonies.push(...this.getComplementary())
        harmonies.push(...this.getSplitComplementary())
        harmonies.push(...this.getTriadic())
        harmonies.push(...this.getSquare())
        harmonies.push(...this.getTetradic())

        return harmonies
    }

    getMonochromatic() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(1)) {
            harmonies.addMonochromatic(this.clone().getHues())
        }

        return harmonies.get()
    }

    getAnalogous() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(1)) {
            harmonies.addAnalogous(this.clone().insertHues(-30, -60).getHues())
            harmonies.addAnalogous(this.clone().insertHues(-30, +30).getHues())
            harmonies.addAnalogous(this.clone().insertHues(+30, +60).getHues())
        } else if (this.hueCountEquals(2)) {
            if(this.groupHues(30, 10).allGrouped) {
                const group = this.groupHues(30, 10).grouped
                const gap = this.getHueDifference(group[0], group[1])
                harmonies.addAnalogous(this.clone().insertHues(+gap).getHues())
                harmonies.addAnalogous(this.clone().insertHues(-gap).getHues())
            } else if(this.groupHues(60, 20).allGrouped) {
                harmonies.addAnalogous(this.clone().insertHueAtSmallestGapMidpoint().getHues())
            } 
        } else if (this.hueCountEquals(3)) {
            if(this.groupHues(30, 10).grouped.length === 3) {
                harmonies.addAnalogous(this.clone().getHues())
            }
        }

        return harmonies.get()
    }

    getComplementary() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(1)) {
            harmonies.addComplementary(this.clone().insertHues(+180).getHues())
        } else if (this.hueCountEquals(2)) {
            if(this.groupHues(180, 30).allGrouped) {
                harmonies.addComplementary(this.clone().getHues())
            }
        }

        return harmonies.get()
    }

    getSplitComplementary() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(1)) {
            harmonies.addSplitComplementary(this.clone().insertHues(-150, +150).getHues())
            harmonies.addSplitComplementary(this.clone().insertHues( -60, +150).getHues())
            harmonies.addSplitComplementary(this.clone().insertHues(-150,  +60).getHues())
        } else if (this.hueCountEquals(2)) {
            if(this.groupHues(60, 20).allGrouped) {
                harmonies.addSplitComplementary(this.clone().insertHueAtLargestGapMidpoint().getHues())
            } else if (this.groupHues(150, 20).allGrouped) {
                harmonies.addSplitComplementary(this.clone().insertHues(-60).getHues())
                harmonies.addSplitComplementary(this.clone().insertHues(+60).getHues())
            }
        } else if (this.hueCountEquals(3)) {
            if(this.groupHues(150, 20).allGrouped) {
                harmonies.addSplitComplementary(this.clone().getHues())
            }
        }

        return harmonies.get()
    }

    getTriadic() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(1)) {
            harmonies.addTriadic(this.clone().insertHues(-120, +120).getHues())
        } else if(this.hueCountEquals(2)) {
            if(this.groupHues(120, 15).allGrouped) {
                harmonies.addTriadic(this.clone().insertHueAtLargestGapMidpoint().getHues())
            }
        } else if(this.hueCountEquals(3)) {
            if(this.groupHues(120, 15).allGrouped) {
                harmonies.addTriadic(this.clone().getHues())
            }
        }

        return harmonies.get()
    }

    getSquare() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(1)) {
            harmonies.addSquare(this.clone().insertHues(-90, +180, +90).getHues())
        } else if(this.hueCountEquals(2)) {
            if(this.groupHues(90, 15).allGrouped) {
                const group = this.groupHues(90, 15).grouped
                const gap = this.getHueDifference(group[0], group[1])
                harmonies.addSquare(this.clone().insertHues(-(180-gap), +(180-gap)).getHues())
            } else if(this.groupHues(180, 30).allGrouped) {
                harmonies.addSquare(this.clone().insertHueAtSmallestGapMidpoint().insertHueAtLargestGapMidpoint().getHues())
            }
        } else if(this.hueCountEquals(3)) {
            if(this.groupHues(90, 15).allGrouped) {
                harmonies.addSquare(this.clone().insertHueAtLargestGapMidpoint().getHues())
            }
        } else if(this.hueCountEquals(4)) {
            if(this.groupHues(90, 15).allGrouped) {
                harmonies.addSquare(this.clone().getHues())
            }
        }

        return harmonies.get()
    }

    getTetradic() {
        const harmonies = new HarmonyList()

        if(this.hueCountEquals(2)) {
            if(this.groupHues(90, 15).unassigned.length) {
                const group = this.groupHues(90, 15).unassigned
                const gap = this.getHueDifference(group[0], group[1])
                harmonies.addTetradic(this.clone().insertHues(-(180-gap), +(180-gap)).getHues())
            }
        } else if(this.hueCountEquals(3)) {
            if(this.groupHues(180, 30).grouped.length === 2 && this.groupHues(90, 15).unassigned.length) {
                const unsharedHue = this.findUniqueSmallestGapExtreme()
                harmonies.addTetradic(this.clone().insertHues(unsharedHue+180).getHues())
            }
        } else if(this.hueCountEquals(4)) {
            if(this.groupHues(180, 30).allGrouped && this.groupHues(90, 15).unassigned.length) {
                harmonies.addTetradic(this.clone().getHues())
            }
        }

        return harmonies.get()
    }
}

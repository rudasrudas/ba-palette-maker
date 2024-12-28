import PaletteGenerator from "@utils/paletteGenerator"
import { useEffect, useState } from "react"

// Generates color palettes based on provided colors.

const usePaletteGenerator = (providedColors) => {
    const paletteGenerator = new PaletteGenerator()

    const [createdPalettes, setCreatedPalettes] = useState([])
    const [activePalette, setActivePalette] = useState(null)
    const [variations, setVariations] = useState()

    const generate = () => {
        const generated = variations?.generate()
        setCreatedPalettes(prev => [...prev, generated])

        setActivePalette(generated)
    }

    const selectPrevPalette = () => {
        const currentIndex = createdPalettes.findIndex(palette => palette.id === activePalette.id);
        if (currentIndex > 0) {
            setActivePalette(createdPalettes[currentIndex - 1]);
        }
    }

    const selectNextPalette = () => {
        const currentIndex = createdPalettes.findIndex(palette => palette.id === activePalette.id);
        if (currentIndex >= 0 && currentIndex < createdPalettes.length - 1) {
            setActivePalette(createdPalettes[currentIndex + 1]);
        }
    }

    useEffect(() => {
        setVariations(paletteGenerator.createVariations(providedColors))
    }, [])

    useEffect(() => {
        generate()
    }, [variations])

    return { generate, createdPalettes, activePalette, selectPrevPalette, selectNextPalette, providedColors: variations?.providedColors }
}
export default usePaletteGenerator
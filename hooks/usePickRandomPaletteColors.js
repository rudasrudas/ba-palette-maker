import paletteOklch from "@utils/oklch"
import { useEffect, useState } from "react"
import useColor from "./useColor"

const usePickRandomPaletteColors = (palette, options) => {
    const { min = 1, max = 1 } = options

    const [chosenColors, setChosenColors] = useState([])

    useEffect(() => {
        const count = Math.floor(Math.random() * (max - min + 1)) + min
        
        let colors = getPaletteColors()
        const chosen = []

        for(let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length)
            const randomColorRow = colors[randomIndex]
            const randomColorIndex = Math.floor(Math.random() * randomColorRow.length)
            colors = colors.filter(c => c !== randomColorRow)
            chosen.push(randomColorRow[randomColorIndex])
        }

        setChosenColors(chosen)

    }, [palette])


    const getPaletteColors = () => {
        const colors = []

        palette.forEach(cg => {
            cg.colors.forEach(color => {
                const shades = useColor({ 
                    count: cg.count, 
                    lightness: cg.lightness, 
                    chroma: cg.chroma,
                    hue: color.hue, 
                })

                colors.push([...shades])
            })
        })

        return colors
    }

    return chosenColors
}
export default usePickRandomPaletteColors
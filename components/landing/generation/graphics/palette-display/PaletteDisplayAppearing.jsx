import { motion } from "framer-motion"
import PaletteDisplayRowAppearing from "./PaletteDisplayRowAppearing"
import useColor from "@hooks/useColor"
import { shuffleArray } from "@utils/arrays"
import { useEffect, useState } from "react"

const PaletteDisplayAppearing = ({ delay, duration, palette, startingColors }) => {

    const displayVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: delay + 0.1,
                duration: 0
            }
        },
        exit: {
            opacity: [0.8, , 0.5, 0],
            scale: [1.05, 1.05, 0.8],
            transition: { duration: 0.2, ease: "easeInOut" }
        }
    }

    const PAUSE_BEFORE_FADING = 0.6
    const PAUSE_BEFORE_HIDING = 1

    const getAllColors = () => {
        const colors = palette.map(cg => {
            return cg.colors.map(color => {
                const colors = useColor({
                    count: cg.count,
                    lightness: cg.lightness,
                    chroma: cg.chroma,
                    hue: color.hue
                })

                return colors.map(c => ({ hex: c.text?.hex, delay }))
            })
        })

        const colorFadeDuration = (duration - delay - PAUSE_BEFORE_FADING - PAUSE_BEFORE_HIDING - 0.2) / colors.flat(2).length 

        const reducedColors = colors.flat(2).filter(c => !startingColors.map(sc => sc.text.hex).includes(c.hex))
        const shuffledColors = shuffleArray(reducedColors)
        colors.forEach(cg => cg.forEach(hue => hue.forEach(color => {
            const index = shuffledColors.indexOf(color) + 1
            color.delay = index * colorFadeDuration + delay
            if(index) color.delay += PAUSE_BEFORE_FADING
        })))

        return colors
    }

    const colors = getAllColors().flat()

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false) 
        }, duration * 1000 - 200 + 500)

        return () => clearTimeout(timer)
    }, [duration])
    
    return (
        <motion.div 
            variants={displayVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "exit"}
            className="absolute overflow-hidden top-0 w-full h-full border-0 border-black dark:border-white rounded-xl flex flex-col"
        >
            {
                colors.map((row) => {
                    const colorFadeDuration = (duration - delay - PAUSE_BEFORE_FADING - PAUSE_BEFORE_HIDING - 0.2) / colors.flat(2).length /2
                    return (
                        <PaletteDisplayRowAppearing 
                            colors={row} 
                            startingColors={startingColors}
                            delay={delay + colorFadeDuration + 0.3}
                        />
                    )
                })
            }
        </motion.div>
    )
}
export default PaletteDisplayAppearing
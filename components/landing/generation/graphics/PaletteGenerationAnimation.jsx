import PALETTES from "@json/heroPalettes.json"
import usePaletteShifter, { SHIFTER_MODES } from "@hooks/usePaletteShifter"
import ColorInputAnimation from "./ColorInputAnimation"
import PaletteAppearingAnimation from "./PaletteAppearingAnimation"
import { useSequentialAnimations } from "@hooks/useSequentialAnimations"
import usePickRandomPaletteColors from "@hooks/usePickRandomPaletteColors"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const PaletteGenerationAnimation = ({  }) => {

    const STARTING_DELAY = 0
    const PALETTE_APPEARING_ANIMATION_DURATION = 8
    const STAGGER_INPUTS = 1

    const [paletteShiftTrigger, setPaletteShiftTrigger] = useState(0)
    const { shiftedPalette } = usePaletteShifter(PALETTES, {
        mode: SHIFTER_MODES.TRIGGER,
        trigger: paletteShiftTrigger
    })

    const randomStartingColors = usePickRandomPaletteColors(shiftedPalette, { min: 1, max: 3 })
    const colorInputAnimationDuration = randomStartingColors.length * 1.6

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: STAGGER_INPUTS,
                delay: STARTING_DELAY,
                when: "beforeChildren"
            },
        },
    }

    const ANIMATION_STAGES = [
        { value: 'colorInput', duration: colorInputAnimationDuration },
        { value: 'paletteAppearing', duration: PALETTE_APPEARING_ANIMATION_DURATION },
    ]

    const activeAnimation = useSequentialAnimations(ANIMATION_STAGES)
    
    useEffect(() => {
        if (activeAnimation === 'paletteAppearing') {
            setTimeout(() => setPaletteShiftTrigger(prev => prev + 1), PALETTE_APPEARING_ANIMATION_DURATION * 1000 + STARTING_DELAY);
        }
    }, [activeAnimation]);

    const renderColorInputs = () => {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className=" will-change-[transform,_contents] w-full h-full flex gap-4 items-center md:justify-center"
            >
                {
                    randomStartingColors.map((color, index) => {
                        return (
                            <ColorInputAnimation
                                key={color.text.hex + index} 
                                color={color} 
                                duration={colorInputAnimationDuration}
                                delay={index * STAGGER_INPUTS + STARTING_DELAY}
                            />
                        )
                    })
                }
            </motion.div>
        )
    }

    return (
        <div className='w-full h-full md:min-h-[450px] max-h-[40dvh] relative'>
            { activeAnimation === 'colorInput' && renderColorInputs() }
            { activeAnimation === 'paletteAppearing' && 
                <PaletteAppearingAnimation 
                    duration={PALETTE_APPEARING_ANIMATION_DURATION} 
                    delay={STARTING_DELAY}
                    palette={shiftedPalette}
                    startingColors={randomStartingColors}
                />
            }
        </div>
    )
}
export default PaletteGenerationAnimation
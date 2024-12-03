import BorderAnimation from "@components/landing/hero/BorderAnimation"
import { motion } from "framer-motion"
import PaletteDisplayAppearing from "./palette-display/PaletteDisplayAppearing"

const PaletteAppearingAnimation = ({ duration, palette, startingColors, delay = 0 }) => {
    
    const BORDER_DURATION = 1
    const POP_DURATION = 0.3

    return (
        <div className=" will-change-[transform,_contents] w-full h-full relative">
            <BorderAnimation borderDuration={BORDER_DURATION} popDuration={POP_DURATION} delay={delay} />
            <PaletteDisplayAppearing 
                delay={BORDER_DURATION + POP_DURATION + delay} 
                duration={duration - BORDER_DURATION - POP_DURATION}
                palette={palette}
                startingColors={startingColors}
            />
        </div>
    )
}
export default PaletteAppearingAnimation
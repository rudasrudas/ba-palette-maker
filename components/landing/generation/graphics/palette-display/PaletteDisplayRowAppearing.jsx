import { motion } from "framer-motion"
import PaletteDisplayColorAppearing from "./PaletteDisplayColorAppearing"

const PaletteDisplayRowAppearing = ({ colors, startingColors, delay }) => {

    const hasStartingColors = startingColors.map(c => c.text.hex).filter(value => colors.map(c => c.hex).includes(value)).length

    const variants = {
        starting: {
            height: hasStartingColors ? '100%' : '0%'
        },
        finish: {
            height: '100%',
            transition: {
                delay
            }
        }
    }

    return (
        <motion.div
            variants={variants}
            initial="starting"
            animate="finish"
            className="h-full grow flex border-b-0 last:border-b-0 border-black dark:border-white">
            {
                colors.map(color => {
                    return (
                        <PaletteDisplayColorAppearing
                            hex={color.hex}
                            delay={color.delay}
                            isStarting={startingColors.map(c => c.text.hex).includes(color.hex)}
                        />
                    )
                })
            }
        </motion.div>
    )
}
export default PaletteDisplayRowAppearing
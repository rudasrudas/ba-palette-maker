import { motion } from "framer-motion"
import ColorShifting from "./ColorShifting"
import useColor from "@hooks/useColor"

const ColorSetShifting = ({ colorGroup, color, visible }) => {

    const variations = {
        visible: {
            height: '100%'
        },
        hidden: {
            height: '0px',
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }

    const COLOR_INFO = {
        count: colorGroup?.count,
        lightness: colorGroup?.lightness,
        chroma: colorGroup?.chroma,
        hue: color?.hue,
        advanced: false
    }

    const finalColors = useColor(COLOR_INFO)

    const renderColors = () => {
        const colors = []
        let lastColor = null

        for(let i = 0; i < 9; i++) {
            const visible = finalColors[i]
            if(visible) lastColor = visible
            
            colors.push(
                <ColorShifting key={i+lastColor} color={lastColor} visible={visible} />
            )
        }

        return colors
    }

    return (
        <motion.div
            variants={variations}
            initial={visible ? 'visible' : 'hidden'}
            animate={visible ? 'visible' : 'hidden'}
            className='w-full flex'
        >
            { renderColors() }
        </motion.div>
    )
}
export default ColorSetShifting
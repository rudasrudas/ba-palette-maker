import { motion } from "framer-motion"
import { useState } from "react"

const ColorShifting = ({ color, visible }) => {

    const variations = {
        visible: {
            width: '50%',
            backgroundColor: color?.text?.hex,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        hidden: {
            width: '0px',
            backgroundColor: color?.text?.hex,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }

    return (
        <motion.div
            variants={variations}
            initial={visible ? 'visible' : 'hidden'}
            animate={visible ? 'visible' : 'hidden'}
            className={`h-full`}
        />
    )
}
export default ColorShifting
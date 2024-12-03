import Color from "@components/palette-editor/color-set/Color"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

const ColorInputAnimation = ({ color, duration, delay = 0 }) => {

    const TYPING_SPEED = 0.1

    const colorObject = {
        oklch: color.oklch,
        text: {
            hex: color.hex
        },
        name: color.name
    }

    const itemVariants = {
        hidden: { 
            y: 10, 
            opacity: 0,
            transition: {
                duration: 0.2,
            }, 
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.2,
            },
        },
        exit: {
            opacity: 0,
            scale: 1.5,
            transition: { duration: 0.2 }
        }
    }

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false) 
        }, duration * 1000 - 200)

        return () => clearTimeout(timer)
    }, [duration])

    const controls = useAnimation()
    const [displayText, setDisplayText] = useState('')

    useEffect(() => {
        let currentText = ''
        color.text.hex.split('').forEach((char, index) => {
            setTimeout(() => {
                currentText += char
                setDisplayText(currentText)
            }, (index * TYPING_SPEED + delay) * 1000)
        })

        return () => controls.stop()
    }, [color.text.hex, controls])

    const colorVariants = {
        hidden: { 
            opacity: 0, 
            scale: 1,
        },
        visible: { 
            opacity: [1, 1, 1],
            scale: [1, 1.05, 1],
            transition: {
                delay: TYPING_SPEED * 7 + delay,
                times: [0.2, 0.5, 0.7]
            }
        },
    }
    
    return (
        <motion.div 
            variants={itemVariants} 
            animate={isVisible ? "visible" : "exit"}
            exit="exit"
            className=' will-change-[transform,_contents] max-w-32 w-full grow flex flex-col gap-2 min-w-10 transition-all'
        >
            <motion.div
                variants={colorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="rounded-lg"
            >
                <Color 
                    color={colorObject} 
                    colorFormat={{ value: null }} 
                    transition={false} 
                    className='min-h-[20dvh] rounded-lg'
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay }}
                className="border border-black dark:border-white rounded-lg w-full h-fit px-1"
            >
                <span className="text-lg font-bold">{displayText}</span>
            </motion.div>
        </motion.div>
    )
}
export default ColorInputAnimation
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

const BorderAnimation = ({ borderDuration, popDuration, delay = 0 }) => {
    const { theme } = useTheme()
    const containerRef = useRef(null)
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 })

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, [])

    const svgVariants = {
        default: {
            scale: 1
        },
        pop: {
            scale: [1, 1.05, 1],
            opacity: [1, 1, 0],
            transition: {
                scale: {
                    delay: borderDuration + delay,
                    duration: popDuration,
                    times: [0, 0.9, 1],
                    ease: ["easeInOut", "easeInOut", "easeOut"],
                },
                opacity: {
                    duration: 0.01,
                    ease: "linear",
                    delay: borderDuration + popDuration - 0.01 + delay,
                }
            }
        },
    }

    const rectVariants = {
        hidden: { 
            pathLength: 0, 
            pathOffset: -1,
        },
        visible: {
            pathLength: 1,
            pathOffset: 0,
            transition: { 
                delay,
                duration: borderDuration, 
                ease: "easeInOut" 
            },
        },
    }

    return (
        <div ref={containerRef} className='w-full h-full'>
            <motion.svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                xmlns="http://www.w3.org/2000/svg"
                initial="default"
                animate="pop"
                variants={svgVariants}
                className=''
            >
                <motion.rect
                    width={`${dimensions.width - 2}`}
                    height={`${dimensions.height - 2}`}
                    x="1"
                    y="1"
                    fill="none"
                    strokeWidth="0.5"
                    rx="9"
                    ry="9"
                    stroke={theme === 'dark' ? 'white' : "black"}
                    initial="hidden"
                    animate="visible"
                    variants={rectVariants}
                />
            </motion.svg>
        </div>
    )
}
export default BorderAnimation
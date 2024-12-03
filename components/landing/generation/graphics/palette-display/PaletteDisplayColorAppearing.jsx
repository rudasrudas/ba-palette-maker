import { motion } from "framer-motion"

const PaletteDisplayColorAppearing = ({ hex, isStarting, delay }) => {
    
    const variants = {
        transparent: {
            backgroundColor: '#00000000',
            width: isStarting ? '100%' : '0%',
            // height: isStarting ? '100%' : '0%',
            scale: 1.2
        },
        visible: {
            backgroundColor: hex,
            width: '100%',
            // height: '100%',
            scale: 1,
            transition: {
                delay,
                width: {
                    delay: 2
                }
            }
        }
    }

    return (
        <motion.div
            variants={variants}
            initial="transparent"
            animate="visible"
            className='h-full m-auto border-r-0 border-black dark:border-white last:border-r-0'>
            
        </motion.div>
    )
}
export default PaletteDisplayColorAppearing
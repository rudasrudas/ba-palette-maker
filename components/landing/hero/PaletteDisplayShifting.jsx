import { MAX_COLORS_IN_COLOR_GROUP } from "@components/palette-editor/color-group/ColorGroup"
import { motion } from "framer-motion"
import ColorSetShifting from "./ColorSetShifting"
import PALETTES from "@json/heroPalettes.json"
import usePaletteShifter, { SHIFTER_MODES } from "@hooks/usePaletteShifter"

const PaletteDisplayShifting = ({ delay = 0, shift }) => {

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
        }
    }

    const { shiftedPalette } = usePaletteShifter(PALETTES, {
        mode: SHIFTER_MODES.INTERVAL,
        interval: shift, 
        startDelay: delay
    }) 

    const renderSets = () => {
        return shiftedPalette.map(colorGroup => {
            const colorSets = []
            let lastSet = null

            for(let i = 0; i < MAX_COLORS_IN_COLOR_GROUP; i++) {
                const visible = colorGroup.colors[i]
                if(visible) lastSet = visible

                colorSets.push(
                    <ColorSetShifting colorGroup={colorGroup} color={lastSet} visible={visible} />
                )
            }

            return colorSets
        })
    }

    return (
        <motion.div 
            variants={displayVariants}
            initial="hidden"
            animate="visible"
            className=' will-change-[transform,_contents] overflow-hidden w-full h-full rounded-xl bg-black border-black dark:border-white absolute top-0 bottom-0 flex flex-col'
        >
            {renderSets()}
        </motion.div>
    )
}
export default PaletteDisplayShifting
import PaletteDisplayShifting from "./PaletteDisplayShifting"
import BorderAnimation from "./BorderAnimation"

const PaletteDisplayHero = () => {

    const STARTING_DELAY = 0
    const BORDER_DURATION = 1
    const POP_DURATION = 0.3
    
    return (
        <div className='relative max-h-xl h-full will-change-[transform,_contents]'>
            <BorderAnimation delay={STARTING_DELAY} borderDuration={BORDER_DURATION} popDuration={POP_DURATION} />
            <PaletteDisplayShifting delay={BORDER_DURATION + POP_DURATION + STARTING_DELAY}/>
        </div>
    )
}
export default PaletteDisplayHero
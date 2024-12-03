import { shuffleArray } from "@utils/arrays"
import PaletteDisplayRow from "./PaletteDisplayRow"

const PaletteDisplay = ({ providedColors, colorGroups, className, ...props }) => {
    
    return (
        <div className={`will-change-[transform,_contents] rounded-lg overflow-hidden w-full flex flex-col items-stretch grow ${className}`} {...props}>
            {colorGroups?.map(cg => {
                return <PaletteDisplayRow providedColors={providedColors} colorGroup={cg} />
            })}
        </div>
    )
}
export default PaletteDisplay
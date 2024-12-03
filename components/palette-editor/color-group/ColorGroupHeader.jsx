import TitleLarge from "@components/ui/text/TitleLarge"
import ButtonNewColorSet from "./ButtonNewColorSet"
import { SETTING_TYPES } from "@hooks/useActiveSetting"
import Tooltip from "@components/ui/Tooltip"

const ColorGroupHeader = ({ colorGroup, selectColorGroup, addColorSet, isActiveSetting, isColorLimitReached, ...props }) => {

    const isSelected = isActiveSetting(colorGroup.id)

    const colSpan = () => {
        const colorCount = colorGroup.colors.length
        const hasNewColorSet = isActiveSetting(colorGroup.id) && isActiveSetting(colorGroup.id) === SETTING_TYPES.newColorSet
        
        return hasNewColorSet ? colorCount : colorCount
    }

    return (
        <div {...props} onClick={selectColorGroup} className={`col-span-${colSpan()} ${isSelected ? 'min-w-[600px]' : 'min-w-[0px]'} transition-all cursor-pointer flex pb-2 justify-between items-center group/color-group-header`} >
            <div onClick={selectColorGroup} className='flex gap-2 justify-between'>
                <TitleLarge className={`!text-3xl !leading-7 transition-all group-hover/color-group-header:border-black dark:group-hover/color-group-header:border-white border rounded-lg p-1 ${isSelected ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'border-transparent'}`}>{colorGroup.title}</TitleLarge>
            </div>
            <div className={`h-1 border-b border-black dark:border-white transition-all duration-300 mr-auto ${isSelected ? 'opacity-100 w-full' : 'opacity-0 w-2'}`}></div>
            <Tooltip text={isColorLimitReached ? 'Maximum color limit reached' : 'Add new color'}>
                <ButtonNewColorSet onClick={addColorSet} disabled={isColorLimitReached} className={`transition-all ${isColorLimitReached ? 'group-hover/color-group-header:opacity-50' : 'group-hover/color-group-header:opacity-100'} ${isSelected ? (isColorLimitReached ? 'opacity-50' : 'opacity-100') : 'opacity-0'}`}/>
            </Tooltip>
        </div>
    )
}
export default ColorGroupHeader
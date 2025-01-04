import TitleLarge from "@components/ui/text/TitleLarge"
import ButtonNewColorSet from "./ButtonNewColorSet"
import { SETTING_TYPES } from "@hooks/useActiveSetting"
import Tooltip from "@components/ui/Tooltip"
import ParameterSmall from "@components/ui/ParameterSmall"
import CountSelector from "@components/ui/inputs/CountSelector"
import { useCallback } from "react"
import NumberInput from "@components/ui/inputs/number/NumberInput"
import { mapRange } from "@utils/colorConversion"
import ParameterDivider from "@components/ui/ParameterDivider"
import ButtonIcon from "@components/ui/inputs/buttons/ButtonIcon"
import { IconContrast2, IconEaseInOut, IconEaseInOutControlPoints, IconTrendingUp3 } from "@tabler/icons-react"

const ColorGroupHeader = ({ colorGroup, setColorGroup, selectColorGroup, addColorSet, isActiveSetting, isColorLimitReached, ...props }) => {

    const isSelected = isActiveSetting(colorGroup.id)

    const colSpan = () => {
        const colorCount = colorGroup.colors.length
        const hasNewColorSet = isActiveSetting(colorGroup.id) && isActiveSetting(colorGroup.id) === SETTING_TYPES.newColorSet
        
        return hasNewColorSet ? colorCount : colorCount
    }

    function updateNestedObject(obj, keys, val) {
        const result = { ...obj }; // Clone only once at the top level
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            } else {
                // Clone only the necessary nested objects to ensure immutability
                current[keys[i]] = { ...current[keys[i]] };
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = (typeof val === 'function' ? val(current[keys[keys.length - 1]]) : val);
        return result;
    }

    const memoizedHandleParameterChange = useCallback(
        (path) => (value) => {
            setColorGroup(prev => updateNestedObject({ ...prev }, path, value));
        },
        []
    );

    return (
        <div {...props} onClick={selectColorGroup} className={`col-span-${colSpan()} ${isSelected ? 'min-w-fit' : 'min-w-[0px]'} h-min pb-4 transition-all cursor-pointer flex gap-2 justify-between items-end group/color-group-header`} >
            <div onClick={selectColorGroup} className='flex gap-2 justify-between'>
                <TitleLarge className={`!text-3xl !leading-7 transition-all group-hover/color-group-header:border-black dark:group-hover/color-group-header:border-white border rounded-lg p-1 mr-auto ${isSelected ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'border-transparent'}`}>{colorGroup.title}</TitleLarge>
            </div>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${isSelected ? 'opacity-100 w-fit' : 'group-hover/color-group-header:opacity-30 opacity-0 select-none w-auto'} overflow-hidden relative cursor-default flex justify-stretch h-min items-end gap-2 transition-all duration-300`}
            >
                <div onClick={selectColorGroup} className={`cursor-pointer h-full w-full z-60 absolute right-0 left-0 top-0 bottom-0 ${isSelected ? 'hidden' : 'block'}`}></div>
                <div onClick={selectColorGroup} className={`cursor-pointer h-full z-50 bg-gradient-to-r from-transparent to-white dark:to-black absolute right-0 top-0 bottom-0 transition-all ${isSelected ? 'w-0' : 'w-32'}`}></div>
                <ParameterDivider/>
                <ParameterSmall title="Shades">
                    <CountSelector
                        setCount={memoizedHandleParameterChange(['count'])}
                        count={colorGroup.count}
                        min={1} 
                        max={9}
                    />
                </ParameterSmall>
                <ParameterDivider/>
                <ParameterSmall title="Lightness range">
                    <NumberInput
                        setValue={memoizedHandleParameterChange(['lightness', 'range', 'min'])}
                        value={colorGroup.lightness.range.min}
                        transformValueForDisplay={(v) => Number((v*100).toFixed(1))}
                        transformValueForStorage={(v) => v/100}
                        min={colorGroup.lightness.limit.min}
                        max={colorGroup.lightness.limit.max}
                        step={0.1}
                        precision={0.1}
                        name="%"
                        className={'max-w-14'}
                    />
                    <NumberInput
                        setValue={memoizedHandleParameterChange(['lightness', 'range', 'max'])}
                        value={colorGroup.lightness.range.max}
                        transformValueForDisplay={(v) => Number((v*100).toFixed(1))}
                        transformValueForStorage={(v) => v/100 + 0.0001}
                        min={colorGroup.lightness.limit.min}
                        max={colorGroup.lightness.limit.max}
                        step={0.1}
                        precision={0.1}
                        name="%"
                        className={'max-w-14'}
                    />
                    <ButtonIcon
                        className={`aspect-square h-full`}
                        Icon={IconEaseInOutControlPoints}
                    />
                </ParameterSmall>
                <ParameterDivider/>
                <ParameterSmall title="Saturation range">
                    <NumberInput
                        setValue={memoizedHandleParameterChange(['chroma', 'range', 'min'])}
                        value={colorGroup.chroma.range.min}
                        transformValueForDisplay={(v) => parseInt(mapRange(v, colorGroup.chroma.limit.min, colorGroup.chroma.limit.max, 0, 100))}
                        transformValueForStorage={(v) => mapRange(v, 0, 100, colorGroup.chroma.limit.min, colorGroup.chroma.limit.max)}
                        min={colorGroup.chroma.limit.min}
                        max={colorGroup.chroma.limit.max}
                        step={0.4}
                        precision={1}
                        name="%"
                        className={'max-w-14'}
                    />
                    <NumberInput
                        setValue={memoizedHandleParameterChange(['chroma', 'range', 'max'])}
                        value={colorGroup.chroma.range.max}
                        transformValueForDisplay={(v) => parseInt(mapRange(v, colorGroup.chroma.limit.min, colorGroup.chroma.limit.max, 0, 100))}
                        transformValueForStorage={(v) => mapRange(v, 0, 100, colorGroup.chroma.limit.min, colorGroup.chroma.limit.max) + 0.0001}
                        min={colorGroup.chroma.limit.min}
                        max={colorGroup.chroma.limit.max}
                        step={0.4}
                        precision={1}
                        name="%"
                        className={'max-w-14'}
                    />
                    <ButtonIcon
                        className={`aspect-square h-full`}
                        Icon={IconEaseInOutControlPoints}
                    />
                </ParameterSmall>
                <ParameterDivider/>
                <Tooltip text={isColorLimitReached ? 'Maximum color limit reached' : 'Add new color'}>
                    <ButtonNewColorSet onClick={addColorSet} disabled={isColorLimitReached} className={`transition-all ${isColorLimitReached ? 'group-hover/color-group-header:opacity-50' : 'group-hover/color-group-header:opacity-100'} ${isSelected ? (isColorLimitReached ? 'opacity-50' : 'opacity-100') : 'opacity-0'}`}/>
                </Tooltip>
            </div>
        </div>
    )
}
export default ColorGroupHeader
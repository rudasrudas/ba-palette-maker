import { COLOR_FORMATS } from "@hooks/useColorExport";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import useQueryState from "@hooks/useQueryState";
import { IconCopy, IconCopyCheckFilled, IconStarFilled } from "@tabler/icons-react"
import { EDITOR_MODES } from "../palette-settings/GeneralSettings";
import { COLORBLIND_MODES } from "../palette-settings/dropdown-settings/ColorblindnessDropdown";
import useColorContrast, { CONTRAST_RATINGS } from "@hooks/useColorContrast";
import { PAGES } from "@components/page-structure/PaletteMaker";
import { cn } from "@utils/utils";

const Color = ({ color, size, selectColorSet = () => {}, contrastBaseColor, setContrastBaseColor = () => {}, className, transition = true, ...props }) => {

    const [pageId, setPageId] = useQueryState('status')
    const [modeId, setModeId] = useQueryState('mode')
    const [colorFormatId, setColorFormatId] = useQueryState('format')
    const [colorblindModeId, setColorblindModeId] = useQueryState('colorblindness')

    const isCopyMode = modeId && modeId === EDITOR_MODES.COPY.value && pageId && pageId === PAGES.EDITOR
    const isColorblindMode = modeId && modeId === EDITOR_MODES.COLORBLIND.value
    const isContrastMode = modeId && modeId === EDITOR_MODES.CONTRAST.value

    const isSelectedContrastColor = contrastBaseColor && contrastBaseColor === color?.text?.hex

    const { contrast, contrastRating } = useColorContrast(contrastBaseColor, color?.text?.hex)
    
    const getColorText = () => {
        if(!isCopyMode) return ''

        const value = colorFormatId ? colorFormatId : COLOR_FORMATS.HEX.value

        switch(value) {
            case COLOR_FORMATS.RGB.value: return color?.text.rgb
            case COLOR_FORMATS.OKLCH.value: return color?.text.oklch
            case COLOR_FORMATS.HSL.value: return color?.text.hsl
            case COLOR_FORMATS.HEX.value: return color?.text.hex
            case null: return ''
            default: return value
        }
    }

    const { copyToClipboard, isCopied } = useCopyToClipboard(getColorText())

    const handleColorClick = (v) => {
        if(isCopyMode) copyToClipboard(v)
        else if(isContrastMode) setContrastBaseColor(isSelectedContrastColor ? null : color?.text?.hex)
        else selectColorSet(v)
    }

    const finalColor = () => {
        if(isColorblindMode) {
            const colorblindModes = Object.values(COLORBLIND_MODES)
            const colorblindMode = colorblindModes.find(c => c.value === colorblindModeId) || COLORBLIND_MODES.NONE
            if(!colorblindMode) return

            return colorblindMode.convert(color?.text?.hex)
        }
        return color?.text?.hex
    }

    return (
        <div className={cn(`relative w-full min-h-8 lg:p-2 p-1 group/wrapper flex cursor-pointer grow ${transition ? 'transition-all' : ''}`, className)}
            style={{ backgroundColor: finalColor(), color: color?.contrastTextColor }}
            onClick={handleColorClick}
            {...props}
        >
            { isCopyMode &&
                <>
                    <span className={`text-sm font-medium invisible text-nowrap truncate group-hover/wrapper:visible leading-none peer/hex h-fit`}>
                        {isCopied ? 'Copied!' : getColorText()}
                    </span>
                    
                    { isCopied ?
                        <IconCopyCheckFilled className={`h-4 invisible w-4 group-hover/wrapper:ml-2 group-hover/wrapper:visible ${transition ? '' : ''}`} />
                        :
                        <IconCopy className={`h-4 invisible w-4 group-hover/wrapper:ml-2 group-hover/wrapper:visible ${transition ? 'transition-color' : ''}`} />
                    }
                </>
            }

            { isContrastMode &&
                <>
                    { isContrastMode && isSelectedContrastColor &&
                        <span className='absolute top-2 left-2 text-xs font-semibold flex items-center' style={{ borderColor: color?.contrastTextColor }}>
                            Active
                            {/* <IconContrastFilled className='w-3 h-3'/> */}
                        </span>
                        
                    }
                    <div className='ml-auto flex absolute top-2 right-2 my-auto'>
                        <span style={{ color: contrastBaseColor }} className={`text-xs font-semibold transition-[opacity] opacity-0 pr-1 ${contrast >= CONTRAST_RATINGS.GOOD.rating ? 'group-hover/wrapper:opacity-100' : ''}`}>
                            {parseFloat(contrast).toFixed(2)}
                        </span> 
                        <IconStarFilled className='w-3 h-3 my-auto transition-all' style={{ color: contrastBaseColor, width: contrast >= CONTRAST_RATINGS.GREAT.rating ? '12px' : '0px' }} />
                        <IconStarFilled className='w-3 h-3 my-auto transition-all' style={{ color: contrastBaseColor, width: contrast >=CONTRAST_RATINGS.GOOD.rating ? '12px' : '0px' }} />
                    </div>
                </>
            }
        </div>
    )
}

export default Color
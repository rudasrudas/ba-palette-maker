import HueInput from "@components/ui/inputs/number/HueInput"
import NumberInput from "@components/ui/inputs/number/NumberInput"
import ColorName from "@components/ui/text/ColorName"
import { IconLink, IconLinkOff, IconLinkPlus, IconPencil, IconTrashX, IconUnlink, IconWand, IconWandOff } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"

const ColorSetHeader = ({ isEditable = false, isLockable, color, setColor, className, selectColorSet, isSelected, removeColor, linkFunctions, ...props }) => {

    const [isEditing, setIsEditing] = useState(false)

    const name = color?.name
    const isLocked = color?.isLocked
    const empty = color?.empty

    const handleEditingChange = (e) => {
        if(isEditable) {
            return (v) => {
                e.stopPropagation()
                setIsEditing(v)
            }
        } else return () => {}
    }

    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEditingChange(e)(false)
            setColor(prev => ({ ...prev, isLocked: true }))
        }
    }

    const handleColorLock = (v) => {
        return (e) => {
            e.stopPropagation()
            setColor(prev => ({ ...prev, isLocked: v }))
        }
    }

    const handleAddLink = (e) => {
        e.stopPropagation()
        linkFunctions.addLink(color)
    }

    const handleRemoveLink = (e) => {
        e.stopPropagation()
        linkFunctions.removeLink(color)
    }

    return (
        <div className={`flex gap-1 group/header items-center justify-start ${selectColorSet ? 'cursor-pointer' : 'cursor-default'} w-full min-w-fit ${className}`} onClick={selectColorSet} {...props}>
            { (isEditing && isEditable) ?
                // Text input to change name
                <>
                    <input
                        ref={inputRef}
                        type='text' 
                        value={name} 
                        onChange={(e) => setColor(prev => ({ ...prev, name: e.target.value }))}
                        onBlur={(e) => handleEditingChange(e)(false)}
                        onKeyDown={handleKeyDown}
                        className={`min-w-5 leading-none font-medium outline-none grow border border-black dark:border-white rounded-md p-1 ${isSelected ? ' bg-black dark:bg-white text-white dark:text-black' : ''}`}
                    />
                </>
                :
                // Header
                <>
                    { empty ? 
                        // Preset header for new color
                        <>
                            <div className={`group/name transition-colors flex items-center ${selectColorSet ? 'cursor-pointer' : 'cursor-default'} border rounded-md p-1 ${isSelected ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'group-hover/color-set:border-black dark:group-hover/color-set:border-white border-transparent'}`}>
                                <span className={`truncate whitespace-nowrap leading-none`}>New color</span>
                            </div>
                            {
                                isSelected &&
                                <div className="ml-auto">
                                    <HueInput
                                        colorId={color.id}
                                        linkFunctions={linkFunctions}
                                        hue={color.hue || 0}
                                        setHue={(v) => setColor(prev => ({ ...prev, empty: false, hue: typeof v === 'function' ? v(prev.hue || 0) : v }))}
                                        className={`${isSelected ? 'visible w-full' : 'invisible w-0'} ml-auto`}
                                    />
                                </div>
                            }
                        </>
                        :
                        // Default header
                        <>
                            {/* Name */}
                            <div onClick={(e) => handleEditingChange(e)(true)} title={isEditable ? 'Edit name' : undefined} className={`mr-auto group/name transition-colors flex items-center cursor-pointer border rounded-md p-1 ${isSelected ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'group-hover/color-set:border-black dark:group-hover/color-set:border-white border-transparent'}`}>
                                <ColorName>{name}</ColorName>
                                { isEditable &&
                                    <IconPencil className={`transition-all -my-1 h-4 cursor-pointer ${isSelected ? 'w-4 ml-2 visible group-hover/name:scale-110' : 'w-0 invisible group-hover/name:w-4 group-hover/name:ml-2 group-hover/name:visible'}`} />
                                }
                            </div>
                            <div className={`ml-auto transition-all duration-75 ${isSelected ? 'opacity-100' : 'group-hover/color-set:opacity-30 !hover:opacity-100 opacity-0'}`}>
                            {/* <div className={`ml-auto ${isSelected ? 'visible w-fit' : 'invisible w-0'}`}> */}
                                <HueInput
                                    colorId={color.id}
                                    linkFunctions={linkFunctions}
                                    hue={color.hue}
                                    setHue={(v) => setColor(prev => ({ ...prev, hue: typeof v === 'function' ? v(prev.hue) : v }))}
                                    className={`${isSelected ? 'hover:select-all select-none' : ''}`}
                                />
                            </div>

                            {/* Details */}
                            <div className='flex gap-1'>
                                {/* Auto name */}
                                { (isLockable && setColor) &&
                                    ( isLocked ?
                                        <span title='Enable auto name' onClick={handleColorLock(false)} className={`cursor-pointer ml-auto`} >
                                            <IconWandOff className={`h-4 transition-all ${isSelected ? 'w-4 visible opacity-100' : 'w-0 invisible opacity-0'} hover:w-4 hover:scale-110`}/> 
                                        </span>
                                        :
                                        <span title='Disable auto name' onClick={handleColorLock(true)} className={`cursor-pointer ml-auto`}>
                                            <IconWand className={`h-4 transition-all ${isSelected ? 'w-4 visible opacity-100' : 'w-0 invisible opacity-0'} hover:w-4 hover:scale-110`} /> 
                                        </span>
                                    )
                                }
                                {/* Link */}
                                { linkFunctions?.hasActiveColor() &&
                                    ( linkFunctions?.isLinkedToActiveColor(color) ?
                                        <span title='Remove link' className={`group/remove`} onClick={handleRemoveLink}>
                                            <IconLink className={`h-4 cursor-pointer transition-all w-4 block group-hover/remove:hidden opacity-100 hover:w-4`} /> 
                                            <IconUnlink className={`h-4 cursor-pointer transition-all w-4 hidden ${isSelected ? 'hover:scale-110' : 'hover:scale-125'} group-hover/remove:block opacity-100 hover:w-4`} /> 
                                        </span>
                                        :
                                        ( !isSelected &&
                                            <span title='Link to selected color' onClick={handleAddLink}>
                                                <IconLinkPlus className={`h-4 cursor-pointer transition-all w-4 invisible opacity-0 hover:scale-125 group-hover/color-set:visible group-hover/color-set:opacity-100 hover:w-4`} /> 
                                            </span>
                                        )
                                    )
                                }
                                {/* Remove */}
                                { removeColor &&
                                    <span title='Remove from palette' onClick={removeColor}>
                                        <IconTrashX className={`h-4 cursor-pointer transition-all ${(!!isSelected == !!selectColorSet) ? 'w-4 visible' : 'w-0 invisible group-hover/color-set:visible group-hover/color-set:w-4'} hover:w-4 hover:scale-110`} /> 
                                    </span>
                                }
                            </div>
                        </>
                    }
                </>
            }
        </div>
    )
}
export default ColorSetHeader
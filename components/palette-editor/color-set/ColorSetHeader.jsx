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
        <div className={`flex gap-1 group/header items-center cursor-pointer ${className}`} onClick={selectColorSet} {...props}>
            { (isEditing && isEditable) ?
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
                <>
                    { empty ? 
                        <div className={`group/name transition-colors flex items-center cursor-pointer border rounded-md p-1 ${isSelected ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'group-hover/color-set:border-black dark:group-hover/color-set:border-white border-transparent'}`}>
                            <span className={`truncate whitespace-nowrap leading-none`} >New color</span>
                        </div>
                        :
                        <>
                            <div onClick={(e) => handleEditingChange(e)(true)} title={isEditable ? 'Edit name' : undefined} className={`group/name transition-colors flex items-center cursor-pointer border rounded-md p-1 w-fit ${isSelected ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' : 'group-hover/color-set:border-black dark:group-hover/color-set:border-white border-transparent'}`}>
                                <ColorName>{name}</ColorName>
                                { isEditable &&
                                    <IconPencil className='transition-all -my-1 h-4 cursor-pointer invisible w-0 group-hover/name:w-4 group-hover/name:ml-2 group-hover/name:visible' />
                                }
                            </div>
                            <div className='ml-auto flex gap-1'>
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
                                { linkFunctions?.hasActiveColor() &&
                                    ( linkFunctions?.isLinkedToActiveColor(color) ?
                                        <span title='Remove link' className={`group/remove`} onClick={handleRemoveLink}>
                                            <IconLink className={`h-4 cursor-pointer transition-all w-4 block group-hover/remove:hidden opacity-100 hover:w-4`} /> 
                                            <IconUnlink className={`h-4 cursor-pointer transition-all w-4 hidden ${isSelected ? 'hover:scale-110' : 'hover:scale-125'} group-hover/remove:block opacity-100 hover:w-4`} /> 
                                        </span>
                                        :
                                        ( !isSelected &&
                                            <span title='Link to selected color' onClick={handleAddLink}>
                                                <IconLinkPlus className={`h-4 cursor-pointer transition-all w-4 invisible opacity-0 hover:scale-125 group-hover/header:visible group-hover/header:opacity-100 hover:w-4`} /> 
                                            </span>
                                        )
                                    )
                                }
                                { removeColor &&
                                    <span title='Remove from palette' onClick={removeColor}>
                                        <IconTrashX className={`h-4 cursor-pointer transition-all ${isSelected ? 'w-4 visible opacity-100' : 'w-0 invisible opacity-0'} hover:w-4 hover:scale-110`} /> 
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
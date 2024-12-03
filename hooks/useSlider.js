import { useState, useRef, useCallback } from 'react'

const useSlider = ({ limit, onChange, isRange = false, initial }) => {
    const [value, setValue] = useState(initial || (isRange ? {min: limit.min, max: limit.max} : limit.min))
    const sliderRef = useRef(null)
    const offsetRef = useRef(0)  // Ref to store the initial offset of the mouse click on the handle

    const updateValue = useCallback((mouseX, type = null) => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect()
            // Adjust mouseX by subtracting the offset to keep handle under cursor
            const adjustedMouseX = mouseX - offsetRef.current
            const newPos = ((adjustedMouseX - rect.left) / rect.width) * (limit.max - limit.min) + limit.min
            const newValue = Math.min(Math.max(newPos, limit.min), limit.max)

            setValue((prevValue) => {
                let updatedValue = prevValue
                if (!isRange) {
                    updatedValue = newValue
                } else {
                    updatedValue = { ...prevValue, [type]: newValue }
                }
                onChange(updatedValue)
                return updatedValue
            })
        }
    }, [limit, onChange, isRange])

    const handleMouseDown = useCallback((e, type = null) => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect()
            
            offsetRef.current = e.clientX - rect.left

            const handleMouseMove = (moveEvent) => {
                updateValue(moveEvent.clientX + e.clientX - rect.left, type)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', handleMouseMove)
            }, { once: true })
        }
    }, [updateValue])

    return {
        sliderProps: {
            ref: sliderRef,
            onMouseDown: isRange ? null : (e) => handleMouseDown(e),
        },
        handleProps: isRange ? {
            min: {
                onMouseDown: (e) => handleMouseDown(e, 'min'),
            },
            max: {
                onMouseDown: (e) => handleMouseDown(e, 'max'),
            },
        } : null,
        value,
    }
}

export default useSlider

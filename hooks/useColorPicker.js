import { useState, useRef, useCallback, useEffect } from 'react'

const useColorPicker = ({ min, max, onChange = () => {}, initialAngle = 0, initialRadius = 0 }) => {
  const [angle, setAngle] = useState(initialAngle || 0)
  const [radius, setRadius] = useState(initialRadius || min)
  const pickerRef = useRef(null)

//   useEffect(() => {
//     if (angle !== initialAngle) setAngle(initialAngle)
//     if (radius !== initialRadius) setRadius(initialRadius)
//   }, [initialAngle, initialRadius, angle, radius])

  const getPositionFromCenter = useCallback((clientX, clientY) => {
    if (pickerRef.current) {
      const rect = pickerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = clientX - centerX
      const dy = clientY - centerY
      const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI)
      const distance = Math.sqrt(dx * dx + dy * dy)
      return { angle: (angleDeg + 360) % 360, radius: distance }
    }
    return { angle: 0, radius: min }
  }, [min, max])

  const updateValue = useCallback((clientX, clientY) => {
    const { angle, radius } = getPositionFromCenter(clientX, clientY)

    setAngle(angle)
    setRadius(radius)
    onChange({ angle, radius })
  }, [getPositionFromCenter, onChange])

  const handleMouseDown = useCallback((e) => {
    updateValue(e.clientX, e.clientY)

    const handleMouseMove = (moveEvent) => {
      updateValue(moveEvent.clientX, moveEvent.clientY)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [updateValue])

  return {
    pickerProps: {
      ref: pickerRef,
      onMouseDown: handleMouseDown,
    },
    angle,
    radius,
    setAngle,
    setRadius
  }
}

export default useColorPicker

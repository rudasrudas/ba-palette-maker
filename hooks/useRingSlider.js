import { useState, useRef, useCallback, useEffect } from 'react';

const useRingSlider = ({ min, max, onChange, initial }) => {
  const [value, setValue] = useState(initial || min);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (value !== initial) setValue(initial);
  }, [initial, value]);

  const getAngleFromPosition = useCallback((clientX, clientY) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angleDeg = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
      return (angleDeg + 360) % 360; // Normalize angle to be between 0 and 360
    }
    return 0;
  }, []);

  const roundValue = useCallback((value, shiftPressed) => {
    return shiftPressed ? Math.round(value / 10) * 10 : value;
  }, []);

  const updateValue = useCallback((clientX, clientY, shiftPressed = false) => {
    const angle = getAngleFromPosition(clientX, clientY);
    let newValue = ((angle - min) / (360 - min)) * (max - min) + min;
    newValue = roundValue(newValue, shiftPressed);
    setValue(newValue);
    onChange(newValue);
  }, [min, max, onChange, getAngleFromPosition, roundValue]);

  const handleMouseDown = useCallback((e) => {
    const shiftPressed = e.shiftKey;
    updateValue(e.clientX, e.clientY, shiftPressed);

    const handleMouseMove = (moveEvent) => {
      updateValue(moveEvent.clientX, moveEvent.clientY, moveEvent.shiftKey);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [updateValue]);

  return {
    sliderProps: {
      ref: sliderRef,
      onMouseDown: handleMouseDown,
    },
    value,
  };
};

export default useRingSlider;

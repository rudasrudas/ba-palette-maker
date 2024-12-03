import { useState, useEffect, useRef } from 'react'

const useDynamicDimensions = () => {
  const ref = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    };

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => {
      window.removeEventListener('resize', updateDimensions)
    };
  }, [])

  return { ref, dimensions }
};

export default useDynamicDimensions
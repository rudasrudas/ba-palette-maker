import { useEffect, useRef, useState, createRef } from 'react'

const TabList = ({ value, options, onChange, className, ...props }) => {
    const refs = useRef([])
    refs.current = options.map((_, i) => refs.current[i] ?? createRef())

    const [boxStyle, setBoxStyle] = useState({})

    const updateBoxPosition = () => {
        const selectedIndex = options.findIndex(option => option.value === value)
        const selectedRef = refs.current[selectedIndex]

        const padding = 8

        if (selectedRef?.current) {
            const { width, left } = selectedRef.current.getBoundingClientRect()
            const parentLeft = selectedRef.current.parentNode.offsetLeft
            
            setBoxStyle({
                width: `${width + padding * 2}px`,
                left: left - parentLeft - padding,
            })
        }
    }

    useEffect(() => {
        updateBoxPosition()
        
        window.addEventListener('resize', updateBoxPosition)
        return () => {
            window.removeEventListener('resize', updateBoxPosition)
        }
    }, [value, options.length])

    return (
        <div className={`relative w-fit p-2 px-3 rounded-lg border border-black dark:border-white flex gap-4 cursor-pointer ${className}`} {...props}>
            <div className="absolute border-black bg-black dark:border-white dark:bg-white border rounded-md top-1 bottom-1 transition-all z-[3]" style={boxStyle}></div>
            {options.map((option, index) => (
                <span
                    key={option.value}
                    ref={refs.current[index]}
                    className={`z-[4] text-sm font-medium transition-all whitespace-nowrap ${option.value === value ? 'text-white dark:text-black' : 'text-black dark:text-white hover:scale-105'}`}
                    onClick={() => onChange(option.value)}
                >
                    {option.name}
                </span>
            ))}
        </div>
    )
}

export default TabList
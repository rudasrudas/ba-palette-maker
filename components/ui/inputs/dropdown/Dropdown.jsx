import { useState, useRef, useEffect } from 'react'
import ButtonSecondaryMedium from '../buttons/ButtonSecondaryMedium'
import { IconCheck, IconChevronDown } from '@tabler/icons-react'

const Dropdown = ({ options, placeholder = "Select option", onChange, defaultOption = null, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultOption)
    const dropdownRef = useRef(null)

    useEffect(() => {
        setSelectedOption(defaultOption)
    }, [defaultOption])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setIsOpen(false)
        if (onChange) {
            onChange(option)
        }
    }

    return (
        <div className={`relative inline-block w-full max-w-xs ${className}`} {...props} ref={dropdownRef}>
            <ButtonSecondaryMedium onClick={toggleDropdown} className={`w-full relative ${isOpen ? 'hover:scale-100' : ''}`}>
                {selectedOption ? selectedOption.heading : placeholder}
                <IconChevronDown className={`w-4 h-4 absolute right-2 top-0 bottom-0 my-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </ButtonSecondaryMedium>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white dark:bg-black border border-white dark:border-black outline-1 outline outline-black dark:outline-white overflow-hidden rounded-md h-fit mt-2">
                    {options.map(option => (
                        <li key={option.value} 
                            onClick={() => handleOptionClick(option)}
                            className={`px-2 py-2 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-sm flex gap-2 items-center`}
                        >
                            {option.heading}
                            { option === selectedOption &&
                                <IconCheck className='w-4 h-4'/>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown
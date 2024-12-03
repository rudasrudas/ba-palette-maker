import { forwardRef } from 'react'
import InputText from './InputText'

const InputHex = forwardRef(({ className, onChange, value, ...props }, ref) => {

    const handleChange = (e) => {
        let value = e.target.value.toUpperCase();
    
        // Remove non-hex characters
        value = value.replace(/[^0-9A-F]/g, '');
        
        // Add hashtag at the beginning if not present
        if (value && value[0] !== '#') {
            value = '#' + value;
        }

        // Limit to 6 characters (excluding the hashtag)
        if (value.startsWith('#')) {
            value = '#' + value.slice(1, 7);
        } else {
            value = value.slice(0, 6);
        }

        onChange(value)
    }

    return (
        <InputText
            ref={ref}
            className={className}
            placeholder="#"
            value={value}
            onChange={handleChange}
            {...props}
        />
    )
})

export default InputHex
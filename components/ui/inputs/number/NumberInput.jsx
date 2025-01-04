import { useCallback } from "react";
import DragLabel from "./DragLabel";
import useVerticalDrag from "@hooks/useVerticalDrag";

const NumberInput = ({ 
        value, 
        setValue, 
        min = 0, 
        max = 100, 
        step = 1, 
        wrapValue = false, 
        name, 
        className, 
        precision = 0.1, 
        transformValueForDisplay = (v) => v, 
        transformValueForStorage = (v) => v,
        ...props 
    }) => {

    const displayValue = transformValueForDisplay(value);

    const handleSetValue = (v) => {
        const normalizedValue = transformValueForStorage(normalizeValue(v)); // Scale for storage
        setValue(normalizedValue); // Constrain and update state
    };

    const normalizeValue = (v) => {
        const investedPrecision = Math.pow(precision, -1);
        let rounded = Math.round(v * investedPrecision) / investedPrecision;
        if(wrapValue) rounded = ((rounded % max) + max) % max;

        return Math.max(Math.min(rounded, transformValueForDisplay(max)), transformValueForDisplay(min));
    }
    
    const onInputChange = useCallback(
        (ev) => {
            const userInput = Number(ev.target.value); // Parse user input
            const normalizedValue = transformValueForStorage(normalizeValue(userInput)); // Transform for storage
            setValue(normalizedValue); // Constrain and update state
        },
        [transformValueForStorage, normalizeValue]
    );

    const { onStart } = useVerticalDrag(displayValue, handleSetValue, { scale: step })
    
    return (
        <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative group/input"
        >
            <input
                type="text"
                inputmode="numeric"
                value={displayValue}
                onChange={onInputChange}
                onMouseDown={onStart}
                onDoubleClick={(e) => e.stopPropagation()}
                className={`p-1 pr-4 rounded-md leading-none text-right border-black dark:border-white group-hover/input:border-black dark:group-hover/input:border-white border-[1px] transition-all ${className}`}
                {...props}
            />
            <DragLabel
                onStart={onStart}
                name={name}
            />
        </div>
    );
}
export default NumberInput
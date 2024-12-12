import { useState, useCallback, useEffect } from "react";

function DragLabel({ value, setValue, name, className, scale = 1, ...props }) {

    const [snapshot, setSnapshot] = useState(value);
    const [startVal, setStartVal] = useState(0);
  
    const onStart = useCallback(
        (event) => {
            setStartVal(event.clientY);
            setSnapshot(value);

            document.body.classList.add("dragging"); // Add dragging class
        },
        [value]
    );
  
    useEffect(() => {
        const onUpdate = (event) => {
            if (startVal) {
                const delta = event.clientY - startVal; // Calculate how far the mouse has moved
                const newValue = snapshot - delta * scale; // Apply scaling factor
                setValue(newValue); // Update the value
            }
        };
    
        const onEnd = () => {
            setStartVal(0);
            document.body.classList.remove("dragging"); // Cleanup on unmount
        };
    
        document.addEventListener("mousemove", onUpdate);
        document.addEventListener("mouseup", onEnd);
        return () => {
            document.removeEventListener("mousemove", onUpdate);
            document.removeEventListener("mouseup", onEnd);
        };
    }, [startVal, setValue, snapshot]);
  
    return (
        <span
            onClick={(e) => e.stopPropagation()}
            onMouseDown={onStart}
            className={`absolute right-1 top-0 bottom-0 leading-0 select-none cursor-n-resize ${className}`}
            {...props}
        >
            {name}
        </span>
    );
}

export default DragLabel;
import { useCallback, useEffect, useState } from "react";

const useVerticalDrag = (value, setValue, options) => {

    const { scale = 1 } = options;

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

    return { onStart }
}
export default useVerticalDrag
const { useState, useCallback, useRef, useEffect } = require("react")

const useBezierCurve = ({ onChange, initial }) => {
	const [controlPoints, setControlPoints] = useState(initial || [0, 0, 1, 1])
	const ref = useRef(null)

	useEffect(() => {
		if(controlPoints !== initial)
        	setControlPoints(initial);
    }, [initial])

	const updateControlPoint = useCallback((index, value) => {
		setControlPoints((prev) => {
		if (prev[index] !== value) { // Check if the update is necessary
			const updated = [...prev];
			updated[index] = value;
			onChange(updated); // Call onChange only if there's a change
			return updated;
		}
		return prev;
		});
	}, [onChange])

	const handleProps = {
		startHandle: {
			onMouseDown: (e) => handleMouseDown(e, 0, 1),
		},
		endHandle: {
			onMouseDown: (e) => handleMouseDown(e, 2, 3),
		},
	}

	const handleMouseDown = (e, xIndex, yIndex) => {
		e.preventDefault();
		const div = ref.current;
		
		const move = (moveEvent) => {
			const { x, y } = toDivCoordinates(moveEvent.clientX, moveEvent.clientY, div);
			updateControlPoint(xIndex, x);
			updateControlPoint(yIndex, y);
		};

		const up = () => {
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', up);
		};

		document.addEventListener('mousemove', move);
		document.addEventListener('mouseup', up);
	};

	const toDivCoordinates = (clientX, clientY, div) => {
		const rect = div.getBoundingClientRect();
		const limitedX = Math.max(Math.min(clientX - rect.left, rect.width), 0);
		// Correct the inversion calculation: We want to subtract the relative Y position from the height.
		const limitedY = rect.height - Math.max(Math.min(clientY - rect.top, rect.height), 0);
	
		const x = limitedX / rect.width;
		const y = limitedY / rect.height;  // Normalize by dividing by height
	
		return { x, y };
	};

	return { 
		bezierCurveProps: { ref },
		controlPoints, 
		setControlPoints, 
		updateControlPoint,
		handleProps 
	}
}

export default useBezierCurve
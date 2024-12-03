import { useState, useEffect } from 'react';

export const useSequentialAnimations = (stages) => {
    const [currentStage, setCurrentStage] = useState(1)

    useEffect(() => {
        const current = stages[currentStage]
        const timeoutId = setTimeout(() => {
            setCurrentStage((prevStage) => (prevStage + 1) % stages.length)
        }, current.duration * 1000)

        return () => clearTimeout(timeoutId)
    }, [currentStage, stages])

    return stages[currentStage].value
}

import { useEffect, useRef, useState } from "react"

export const SHIFTER_MODES = {
    INTERVAL: 'interval',
    TRIGGER: 'trigger'
}

const usePaletteShifter = (palettes, options) => {

    const shiftPaletteHues = (p) => {
        const hueShift = Math.random() * 360
        return p.map(cg => ({...cg, colors: cg.colors.map(c => ({ ...c, hue: c.hue + hueShift })) }))
    }

    const { mode = SHIFTER_MODES.INTERVAL, interval = 1, startDelay = 0, trigger = () => {} } = options
    const [activePaletteId, setActivePaletteId] = useState(Math.floor(Math.random() * palettes.length) )
    const intervalRef = useRef(null)
    const activePalette = palettes[activePaletteId]

    const [shiftedPalette, setShiftedPalette] = useState(shiftPaletteHues(activePalette))

    useEffect(() => {
        setShiftedPalette(shiftPaletteHues(activePalette))
    }, [activePalette])

    useEffect(() => {
        if(mode !== SHIFTER_MODES.TRIGGER) return
        setActivePaletteId(prevId => (prevId + 1) % palettes.length);
    }, [trigger]);

    useEffect(() => {
        if(mode !== SHIFTER_MODES.INTERVAL) return
        const updateColorGroup = () => setActivePaletteId(prevId => (prevId + 1) % palettes.length)

        const timeout = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }

            intervalRef.current = setInterval(updateColorGroup, interval * 1000)
        }, startDelay * 1000)

        return () => {
            clearTimeout(timeout)
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [startDelay, interval])

    return { shiftedPalette, activePalette, activePaletteId }
}
export default usePaletteShifter
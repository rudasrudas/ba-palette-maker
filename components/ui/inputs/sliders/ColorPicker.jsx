import { useEffect, useRef, useState } from "react"
import Parameter from "../../Parameter"
import Slider from "./Slider"
import useColorPicker from "@hooks/useColorPicker"
import { oklchToHex, oklchToRgb } from "@utils/colorConversion"

const ColorPicker = ({ color, setColor = () => {}, className, ...props }) => {

    const size = 300;
    const canvasRef = useRef(null);
    const maxChroma = 0.25
    const minChroma = 0
    
    const [lightness, setLightness] = useState(0.5)
    const [debouncedLightness, setDebouncedLightness] = useState(lightness)
    
    const radiusPixels = size / 2
    const handleSize = 16
    const centerAdjustment = radiusPixels - handleSize / 2
    
    const { pickerProps, angle, radius, setAngle, setRadius } = useColorPicker({
        min: 0, max: radiusPixels, initialAngle: color?.oklch?.hue || 0, initialRadius: color?.oklch?.chroma || 0
    })

    function getNormalizedRadius(radius) {
        return ((Math.min(radius, radiusPixels) / radiusPixels) * (maxChroma - minChroma)) + minChroma
    }

    const angleRadians = (angle * Math.PI) / 180
  
    const xPosition = (radiusPixels * (getNormalizedRadius(radius) / maxChroma)) * -Math.cos(angleRadians)
    const yPosition = (radiusPixels * (getNormalizedRadius(radius) / maxChroma)) * Math.sin(angleRadians)
    // console.log(color)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const radius = size / 2;
        canvas.width = size;
        canvas.height = size;

        for (let a = 0; a <= 360; a++) {
            for (let chroma = radius; chroma >= 0; chroma--) {

                // Apply a logarithmic function to scale chroma
                const chromaRatio = chroma / radius * maxChroma;

                // Define your custom base here
                const logBase = 4;
                const c = (Math.log(chromaRatio + 1) / Math.log(logBase)) * maxChroma;

                const color = oklchToHex({ lightness: debouncedLightness, chroma: chromaRatio, hue: a });

                ctx.beginPath();
                ctx.moveTo(radius, radius);

                const startAngle = (a - 0.5) * (Math.PI / 180);
                const endAngle = (a + 0.5) * (Math.PI / 180);

                ctx.fillStyle = color;
                ctx.arc(radius, radius, chroma, startAngle, endAngle);
                ctx.closePath();
                ctx.fill();
            }
        }

        canvas.style.webkitFilter = "blur(2px)"
    }, [size, debouncedLightness]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedLightness(lightness)
        }, 100)

        return () => {
            clearTimeout(handler)
        };
    }, [lightness])

    // return <canvas ref={canvasRef} />;

    useEffect(() => {
        if(!color?.oklch) return

        setLightness(color.oklch.lightness)
        setRadius(color.oklch.chroma / maxChroma * size)
        setAngle(color.oklch.hue)
    }, [color?.oklch])

    useEffect(() => {
        const oklch = {
            lightness,
            chroma: getNormalizedRadius(radius),
            hue: angle
        }

        if(oklch === color?.oklch) return
        // console.log(oklch)

        setColor(prev => ({ ...prev, oklch }))
    }, [lightness, radius, angle])

    return (
        <div className={`flex flex-col gap-2 ${className}`} {...props}>
            <div className="relative">
                <div {...pickerProps} style={{ width: size+2, height: size+2 }} className={`relative aspect-square rounded-full border border-black dark:border-white cursor-grab`}>
                    <canvas ref={canvasRef} />
                    <div 
                        style={{
                            left: `${centerAdjustment - xPosition + handleSize/2 }px`,
                            top: `${centerAdjustment + yPosition + handleSize/2 }px`, // Note the adjustment for the Y-axis
                            transform: 'translate(-50%, -50%)' // Center the handle on the calculated position
                        }}
                        className={`
                            absolute pointer-events-none select-none rounded-md w-4 h-4 border  cursor-grab
                            ${lightness > 0.5 ? 'bg-black border-white' : 'bg-white border-black'}
                        `} 
                    ></div>
                </div>

            </div>
            <Parameter title="Lightness">
                <Slider min={0} max={1} initial={lightness} onChange={setLightness}/>
            </Parameter>
        </div>
    )
}
export default ColorPicker
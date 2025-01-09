import SmallBezierButton from "../buttons/SmallBezierButton"
import useBezierCurve from "@hooks/useBezierCurve"
import useDynamicDimensions from "@hooks/useDynamicDimensions"
import { arrayEquals } from "@utils/arrays"
import { useTheme } from "next-themes"

const CubicBezierSelector = ({ onChange, initial }) => {

    const { theme } = useTheme() 

    const { 
        controlPoints, 
        setControlPoints, 
        bezierCurveProps, 
        handleProps 
    } = useBezierCurve({ onChange, initial })

    const { ref : svgRef, dimensions : dim } = useDynamicDimensions()

    const [x1, y1, x2, y2] = controlPoints

    return (
        <div className='flex flex-col gap-3 mt-1 w-fit bg-gray-100'>
            <div {...bezierCurveProps} className="relative bg-white dark:bg-black w-72 h-40 overflow-visible border border-black dark:border-white rounded-lg">
            <svg ref={svgRef} 
                width={dim.width} 
                height={dim.height} 
                viewBox={`0 0 ${dim.width} ${dim.height}`}
                preserveAspectRatio="none" 
                className="absolute left-0 top-0 w-full h-full rounded-lg overflow-hidden"
            >
                <path
                    d={`M0,${dim.height} C${x1 * dim.width},${(1 - y1) * dim.height} ${x2 * dim.width},${(1 - y2) * dim.height}, ${dim.width},0`}
                    stroke={theme === 'dark' ? 'white' : `black`}
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    d={`M0,${dim.height} L${x1 * dim.width},${(1 - y1) * dim.height}`}
                    stroke={theme === 'dark' ? 'white' : `black`}
                    strokeWidth="1"
                    fill="none"
                />
                <path
                    d={`M${dim.width},0 L${x2 * dim.width},${(1 - y2) * dim.height}`}
                    stroke={theme === 'dark' ? 'white' : `black`}
                    strokeWidth="1"
                    fill="none"
                />
            </svg>

                <div
                    {...handleProps.startHandle} 
                    className="z-30 absolute my-auto rounded-md w-4 h-4 hover:scale-110 bg-black dark:bg-white cursor-grab" 
                    style={{ 
                        left: `${x1 * dim.width}px`, 
                        bottom: `${y1 * dim.height}px`,
                        transform: 'translate(-50%, 50%)'
                    }}
                ></div>
                <div 
                    {...handleProps.endHandle} 
                    className="z-30 absolute my-auto rounded-md w-4 h-4 hover:scale-110 bg-black dark:bg-white cursor-grab" 
                    style={{ 
                        left: `${x2 * dim.width}px`, 
                        bottom: `${y2 * dim.height}px`,
                        transform: 'translate(-50%, 50%)'
                    }}
                ></div>
            </div>
            {/* <div className='flex gap-2'>
                { renderSuggestions() }
            </div> */}
        </div>
    )
}
export default CubicBezierSelector
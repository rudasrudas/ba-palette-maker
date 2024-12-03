import useDynamicDimensions from "@hooks/useDynamicDimensions"

const SmallBezierButton = ({ controlPoints, onClick, isSelected = false }) => {

    const { ref : svgRef, dimensions : dim } = useDynamicDimensions()

    const [x1, y1, x2, y2] = controlPoints

    return (
        <button onClick={onClick} className={(isSelected ? 'border-2' : 'border') + ' relative box-border bg-white overflow-hidden border-black rounded-lg w-full h-10'}>
            <svg ref={svgRef} 
                    width={dim.width} 
                    height={dim.height} 
                    viewBox={`0 0 ${dim.width} ${dim.height}`}
                    preserveAspectRatio="none" 
                    className="absolute left-0 top-0 w-full h-full">
                <path
                    d={`M0,${dim.height} C${x1 * dim.width},${y1 * dim.height} ${x2 * dim.width},${y2 * dim.height}, ${dim.width},0`}
                    stroke="black"
                    strokeWidth="1"
                    fill="none"
                />
            </svg>
        </button>
    )
}
export default SmallBezierButton
import useSlider from "@hooks/useSlider";

const RangeSlider = ({ onChange, initial = { min: 0, max: 1 }, limit = { min: 0, max: 1 }, allowCrossing = false }) => {

    const { sliderProps, handleProps, value } = useSlider({
        limit,
        onChange,
        isRange: true,
        initial
    })

    return (
        <div {...sliderProps} className='relative w-96 mb-4 mt-2'>
            <div className="absolute bg-black dark:bg-white h-[1px] w-full top-0 bottom-0 my-auto"></div>
            <div className="absolute bg-black dark:bg-white h-[3px] w-full top-0 bottom-0 my-auto" style={{ left: `${value.min/limit.max*100}%`, width: `${value.max/limit.max*100 - value.min/limit.max*100}%` }}></div>
            <div {...handleProps.min} draggable={false} className={`absolute top-0 bottom-0 my-auto rounded-md w-4 h-4 hover:scale-110 bg-black dark:bg-white -translate-x-2 cursor-grab`} style={{ left: `${value.min/limit.max*100}%` }}></div>
            <div {...handleProps.max} draggable={false} className={`absolute top-0 bottom-0 my-auto rounded-md w-4 h-4 hover:scale-110 -translate-x-2 cursor-grab border border-black dark:border-white ${allowCrossing ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}`} style={{ left: `${value.max/limit.max*100}%` }}></div>
        </div>
    )
}
export default RangeSlider
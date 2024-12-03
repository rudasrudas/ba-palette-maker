import useSlider from "@hooks/useSlider";

const Slider = ({ limit = { min: 0, max: 1 }, onChange = () => {}, initial }) => {
    const { sliderProps, value, handleProps } = useSlider({
        limit,
        onChange,
        isRange: false,
        initial
      });
    
      const valuePercentage = ((value - limit.min) / (limit.max - limit.min)) * 100;
    
      return (
        <div {...sliderProps} className="relative w-96 mb-4 mt-2">
          <div className="absolute bg-black dark:bg-white h-[1px] w-full top-0 bottom-0 my-auto"></div>
          <div className="absolute bg-black dark:bg-white h-[3px] w-full top-0 bottom-0 my-auto" style={{ width: `${valuePercentage}%` }}></div>
          <div {...handleProps} className="absolute top-0 bottom-0 my-auto rounded-md w-4 h-4 hover:scale-110 bg-black dark:bg-white -translate-x-2 cursor-grab" style={{ left: `${valuePercentage}%` }}></div>
        </div>
      );
}
export default Slider
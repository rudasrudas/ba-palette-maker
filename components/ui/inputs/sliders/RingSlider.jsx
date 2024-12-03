import useRingSlider from "@hooks/useRingSlider";
import useSlider from "@hooks/useSlider";

const RingSlider = ({ min = 0, max = 360, onChange, initial }) => {
    const { sliderProps, value } = useRingSlider({ min, max, onChange, initial });
  
    const radius = 64
    const handleSize = 16

    const centerAdjustment = radius - handleSize / 2
  
    const angleRadians = (value * Math.PI) / 180
  
    const xPosition = radius * -Math.cos(angleRadians)
    const yPosition = radius * Math.sin(angleRadians)
  
    return (
        <div style={{ width: radius*2, height: radius*2 }} className='border border-black dark:border-white rounded-full relative' {...sliderProps}>
              <div 
                  className='absolute rounded-md w-4 h-4 hover:scale-110 bg-black dark:bg-white cursor-grab'
                  style={{
                    left: `${centerAdjustment - xPosition + handleSize/2 }px`,
                    top: `${centerAdjustment + yPosition + handleSize/2 }px`, // Note the inversion for the Y-axis to match the DOM's coordinate system
                    transform: `translate(-50%, -50%)` // Center the handle on the calculated position
                  }}
              ></div>
              <div className='text-xl font-bold absolute flex items-center justify-center pointer-events-none left-0 right-0 bottom-0 top-0'>{parseFloat(value).toFixed(1)}°</div>
        </div>
    );
  };
  
  export default RingSlider;
  
  
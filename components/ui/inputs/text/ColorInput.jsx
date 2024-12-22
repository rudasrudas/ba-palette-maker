import { useRef } from "react";

const ColorInput = ({ id, color, setColor, className, ...props }) => {

    const inputRef = useRef(null)

    const handleColorChange = (e) => {
        setColor(e.target.value)
    };

    const handleClick = () => {
        inputRef.current?.click()
    }

    return (
        <div 
            className="flex flex-col items-center justify-center rounded-lg  " 
            {...props}
        >
          <div
            className={`w-32 h-32 max-w-32 max-h-32 rounded-lg cursor-pointer ${color ? '' : 'border-black border'}`}
            style={{ backgroundColor: color }}
            onClick={handleClick}
          ></div>
          <input
            ref={inputRef}
            type="color"
            value={color}
            onChange={handleColorChange}
            className="invisible w-0 h-0"
          />
        </div>
      );
}
export default ColorInput
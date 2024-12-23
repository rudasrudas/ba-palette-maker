import Paragraph from "@components/ui/text/Paragraph";
import Text from "@components/ui/text/Text";
import { IconColorPicker } from "@tabler/icons-react";
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
            className="relative flex flex-col group/color-input items-center justify-center rounded-lg" 
            {...props}
        >
          <div
            className={`w-32 h-32 max-w-32 max-h-32 rounded-lg cursor-pointer flex flex-col items-center justify-center ${color ? '' : 'border-black border'}`}
            style={{ backgroundColor: color }}
            onClick={handleClick}
          >
            { !color &&
                <div className="flex flex-col items-center justify-center text-gray-400 group-hover/color-input:scale-105 transition-all">
                    <IconColorPicker stroke={1.5} className="w-6 h-6"/>
                    <Paragraph>Click to edit</Paragraph>
                </div>
            }
          </div>
          <input
            ref={inputRef}
            type="color"
            value={color}
            onChange={handleColorChange}
            className="invisible w-0 h-0 absolute top-2 right-2"
          />
        </div>
      );
}
export default ColorInput
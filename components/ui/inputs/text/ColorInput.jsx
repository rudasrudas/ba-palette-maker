const ColorInput = ({ id, color, setColor, className, ...props }) => {

    const handleColorChange = (e) => {
        setColor(e.target.value);
      };

      return (
        <div 
            className="flex flex-col items-center justify-center rounded-lg bg-gray-100" 
            {...props}
        >
          <div
            className="w-32 h-32 max-w-32 max-h-32 rounded-lg border border-gray-300 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => document.getElementById('color-' + id).click()}
          ></div>
          <input
            id={'color-' + id}
            type="color"
            value={color}
            onChange={handleColorChange}
            className="invisible w-0 h-0 border-2 border-red-600"
          />
        </div>
      );
}
export default ColorInput
import { useState, useCallback, useEffect } from "react";

function DragLabel({ onStart, name, className, ...props }) {
  
    return (
        <span
            onClick={(e) => e.stopPropagation()}
            onMouseDown={onStart}
            className={`absolute right-1 top-0 bottom-0 leading-0 select-none cursor-n-resize ${className}`}
            {...props}
        >
            {name}
        </span>
    );
}

export default DragLabel;
'use client'

import { useEffect, useState } from "react";

const useHueShift = (timing = 3000) => {
    const [hue, setHue] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const randomHue = Math.floor(Math.random() * 360);
        setHue(randomHue);
      }, timing); 
  
      return () => clearInterval(interval);
    }, []);
  
    return hue;
  };

  export default useHueShift;
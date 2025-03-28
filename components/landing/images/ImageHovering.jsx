'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useHueShift from "@hooks/useHueShift";

const ImageHovering = ({ src, alt, parallaxStrength = 20, width, height, applyHueShift = false, ...props }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const hue = useHueShift();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * parallaxStrength/2;
      const y = (clientY / innerHeight - 0.5) * parallaxStrength/2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallaxStrength]);

  return (
    <div className="relative" {...props}>
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{
          stiffness: 10, // Adjust stiffness for the speed of movement
          damping: 1000, // Adjust damping for how bouncy or soft the movement feels
        }}
      >
        <Image 
          src={src} 
          alt={alt} 
          className="object-cover border border-black rounded-xl shadow-2xl transition-all duration-1000" 
          width={width} 
          height={0}
          layout="intrinsic"
          style={{
            filter: applyHueShift ? `hue-rotate(${hue}deg)` : 'none',
          }}
        />
      </motion.div>
    </div>
  );
};

export default ImageHovering;
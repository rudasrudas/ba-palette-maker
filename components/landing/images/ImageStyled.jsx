'use client'

import Image from "next/image"
import { motion, useAnimation, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ImageStyled = ({ src, alt, ...props }) => {

  const { scrollY } = useViewportScroll();
  const ref = useRef(null);

  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    if(!window) return

    const element = ref.current;
    if (element) {
      const onScroll = () => {
        const rect = element.getBoundingClientRect();
        setElementTop(rect.top + window.scrollY);
        setElementHeight(rect.height);
      };
      window.addEventListener("scroll", onScroll);
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  const windowWrapper = typeof window === 'object' ? window : undefined

  const inputRange = [
    elementTop - windowWrapper?.innerHeight || 0,
    elementTop,
    elementTop + elementHeight,
  ];
  const outputRange = [1, 1.1, 1];

  const scale = useTransform(scrollY, inputRange, outputRange);

  return (
    <motion.div 
      ref={ref}
      style={{ 
        scale,
      }}
      className="inset-0 h-full w-full"

    >
      <Image 
          src={src}
          alt={alt}
          className="h-full w-full transition-transform object-cover duration-700 ease-in-out group-hover/img:scale-105 m-auto"

          {...props}
      />
      <div 
        className="absolute inset-0 h-full w-full" 
        style={{
          boxShadow: 'inset 0px 0px 10px 20px transparent'
        }}> 

        </div>
    </motion.div>
  )
}
export default ImageStyled
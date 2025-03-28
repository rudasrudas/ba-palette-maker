import ImageHovering from "../images/ImageHovering"

const HeroScreenshotComposition = ({ className }) => {
  return (
    <div className={`relative w-full h-full lg:max-h-[40vw] flex ${className}`}>
        
        <ImageHovering
            src="/pics/ss-toolbar-selected.png"
            alt="screenshot"
            parallaxStrength={40}
            width={300}
            className="absolute z-[15] top-10 lg:top-[5%] right-[40%]"
        />

        <ImageHovering
            src="/pics/ss-export.png"
            alt="screenshot"
            parallaxStrength={25}
            width={350}
            className="absolute z-[11] translate-x-5 lg:-translate-x-1/4 lg:right-1/2 right-1/3 md:top-1/2 md:-translate-y-1/4 lg:-translate-y-1/2"
        />
        
        <ImageHovering
            src="/pics/ss-editor.png"
            alt="screenshot"
            parallaxStrength={10}
            width={700}
            applyHueShift={true}
            className="absolute z-[13] bottom-[-30%] lg:bottom-[5%] md:right-[-5%]"
        />

        <ImageHovering
            src="/pics/ss-form.png"
            alt="screenshot"
            parallaxStrength={20}
            width={400}
            applyHueShift={true}
            className="absolute z-[14] top-0 lg:top-[5%] lg:left-1/2 left-1/3 lg:-translate-y-1/4"
        />

    </div>
  )
}
export default HeroScreenshotComposition
import Line from "@components/palette-editor/color-group/Line"
import ButtonSecondaryMedium from "@components/ui/inputs/buttons/ButtonSecondaryMedium"
import Title from "@components/ui/text/Title"

const RadioList = ({ title, children, className, ...props }) => {

    return (
        <div className={`w-fit ${className}`} {...props}>
            {title && 
                <div className='flex w-full items-center mb-4'>
                    <Title className=' whitespace-nowrap'>{title}</Title>
                    {/* <Line/>
                    <ButtonSecondaryMedium>Hey</ButtonSecondaryMedium> */}
                </div>
            }
            <div className={`flex gap-2 flex-wrap`}>
                {children}  
            </div>
        </div>
    )
}
export default RadioList
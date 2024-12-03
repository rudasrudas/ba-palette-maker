import Paragraph from "@components/ui/text/Paragraph"
import Text from "@components/ui/text/Text"
import Title from "@components/ui/text/Title"
import TitleSmall from "@components/ui/text/TitleSmall"

const RadioOption = ({ value, actual, from = [], select, heading, description, className, children, ...props }) => {

    const object = from.find(f => f.value === value)
    const isSelected = actual.value == value

    return (
        <div onClick={() => select(object)} className={`group flex flex-col gap-2 cursor-pointer max-w-[200px] rounded-lg p-0 border transition-all ${isSelected ? 'border-transparent' : 'border-transparent'} ${className}`} {...props}>
            <div className={`rounded-full w-4 h-4 border border-black dark:border-white transition-all flex items-center`}>
                <div className={`rounded-full ${isSelected ? 'w-[9px] h-[9px]' : 'w-0 group-hover:w-[4px] h-0 group-hover:h-[4px]'} m-auto transition-all bg-black dark:bg-white`}></div>
            </div>
            <div className='flex flex-col w-fit'>
                <TitleSmall className={``}>{heading}</TitleSmall>
                <Paragraph>{description}</Paragraph>
                <div className={`pt-4 transition-all ${isSelected ? 'opacity-100' : 'opacity-0 select-none'}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default RadioOption
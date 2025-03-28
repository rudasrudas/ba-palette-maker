import Paragraph from "@components/ui/text/Paragraph";
import Text from "@components/ui/text/Text";
import TitleExtraSmall from "@components/ui/text/TitleExtraSmall";
import { IconStarFilled } from "@tabler/icons-react"

const Testimonial = ({ stars, author, text, className}) => {

    const renderStars = () => {
        const starList = []
        for(let i = 0; i < stars; i++) {
            starList.push(<IconStarFilled key={i} className={'w-4 h-4 text-gray-800'}/>);
        }

        return (
            <div className={'flex gap-0.5'}>
                {...starList}
            </div>
        )
    }

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {renderStars()}
            <Text className={'text-gray-800'}>{text}</Text>
            <TitleExtraSmall className={'text-gray-400'}>-{author}</TitleExtraSmall>
        </div>
    )
}
export default Testimonial
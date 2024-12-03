import Description from "@components/ui/text/Description"
import Title from "@components/ui/text/Title"
import { HARMONIES } from "@utils/harmonyList"
import { useTheme } from "next-themes"

const ColorHarmonyInfo = ({ harmonyType, className, ...props }) => {

    const harmony = Object.values(HARMONIES).find(h => h.id === harmonyType)

    const { theme } = useTheme()

    return (
        <div className={`flex gap-5 ${harmony ? 'visible' : 'invisible'} ${className}`} {...props}>
            <img src={`/svg/harmonies/${harmony?.file}`} className={`${theme === 'dark' ? 'invert' : ''}`} />
            <div className='flex flex-col w-fit'>
                <Title>{harmony?.name} harmony</Title>
                <Description>{harmony?.description}</Description>
            </div>
        </div>
    )
}
export default ColorHarmonyInfo
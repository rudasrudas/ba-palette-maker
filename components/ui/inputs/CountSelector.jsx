import ButtonIcon from "@components/ui/inputs/buttons/ButtonIcon"
import { IconMinus, IconPlus } from "@tabler/icons-react"

const CountSelector = ({ count, setCount, min = 0, max = 10 }) => {

    const handleSubtract = () => {
        setCount(prev => Math.max(prev - 1, min))
    }

    const handleAdd = () => {
        setCount(prev => Math.min(prev + 1, max))
    }

    return (
        <div className="flex items-center rounded-md border border-black dark:border-white w-fit">
            {/* <ButtonIcon Icon={IconMinus} onClick={handleSubtract} /> */}
            <IconMinus 
                className="w-4 h-4 mx-1 duration-75 cursor-pointer hover:scale-105 active:scale-110"
                onClick={handleSubtract}
            />
            <span className='select-none mx-1 font-base aspect-square'>{count}</span>
            <IconPlus
                className="w-4 h-4 mx-1 duration-75 cursor-pointer hover:scale-105 active:scale-110"
                onClick={handleAdd}
            />
            {/* <ButtonIcon Icon={IconPlus} onClick={handleAdd} /> */}
        </div>
    )
}

export default CountSelector
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
        <div className="flex gap-4">
            <ButtonIcon Icon={IconMinus} onClick={handleSubtract} />
            <span className='select-none font-semibold'>{count}</span>
            <ButtonIcon Icon={IconPlus} onClick={handleAdd} />
        </div>
    )
}

export default CountSelector
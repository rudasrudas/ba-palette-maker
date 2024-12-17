import DropdownSmall from "@components/ui/inputs/dropdown/DropdownSmall"
import Paragraph from "@components/ui/text/Paragraph"
import TitleSmall from "@components/ui/text/TitleSmall"
import useQueryState from "@hooks/useQueryState"

const HeaderTool = ({ Icon, title, onClick, options, defaultOption, query, isActive, className, ...props }) => {

    const [value, setValue] = query ? useQueryState(query) : []
    const currentValue = options?.find(cf => cf.value === value) || null

    return (
        <div onClick={onClick} className={`flex flex-row cursor-pointer items-center gap-1 p-1 pr-2 rounded-lg border border-transparent ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:border-black dark:hover:border-white'} ${className}`} {...props}>
            <Icon className="w-8 h-8" stroke={1}/>
            <div className="flex flex-col gap-0 justify-center w-fit">
                <TitleSmall className="w-fit">{title}</TitleSmall>
                <DropdownSmall
                    className={`transition-all w-fit ${query && options ? '' : 'w-0 h-3'} ${query && options && isActive ? 'visible h-auto w-fit' : 'select-none invisible'} ${isActive ? 'dark:text-black text-white' : ''}`}
                    options={options}
                    defaultOption={currentValue || defaultOption}
                    onChange={(option) => setValue(option.value)}
                />
            </div>
        </div>
    )
}
export default HeaderTool
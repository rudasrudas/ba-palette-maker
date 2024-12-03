import { IconPlus } from "@tabler/icons-react"

const ButtonNewColorSet = ({ className, disabled, ...props}) => {
    return (
        <button className={`border border-dashed rounded-lg border-black dark:border-white flex items-center justify-center group active:border-solid active:bg-black dark:active:bg-white active:text-white dark:active:text-black duration-75 ${className}`} {...props}>
            <IconPlus className={`m-1 ${disabled ? 'rotate-45' : 'group-hover:rotate-90'} [&:not(:active)]:group-hover:duration-300 transition-transform`}/>
        </button>
    )
}

export default ButtonNewColorSet
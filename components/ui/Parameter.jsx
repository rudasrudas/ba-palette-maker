const Parameter = ({ title, children, className, visibility = true, horizontal, ...props }) => {
    return (
        <div className={'flex flex-col gap-1 ' + (visibility ? '' : 'hidden ') + className} {...props}>
            <span className='text-md font-medium leading-4 select-none'>{title}</span>
            <div className={`flex gap-2 ${horizontal ? 'flex-row items-center' : 'flex-col'}`}>
                {children}
            </div>
        </div>
    )
}

export default Parameter
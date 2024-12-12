const ParameterSmall = ({ title, children, className = '', visibility = true, horizontal, reverse, ...props }) => {

    const flexFlow = () => {
        if(horizontal) {
            return 'gap-2 items-center'
        } else {
            return 'gap-1 flex-col'
        }
    }
    
    return (
        <div className={`flex ${flexFlow()} mr-auto ${visibility ? '' : 'hidden '} ${className}`} {...props}>
            { reverse ? 
                <>
                    <div className="flex gap-1 items-center">{children}</div>
                    <span className='text-xs select-none whitespace-nowrap font-medium'>{title}</span>
                </> :
                <>
                    <span className='text-xs select-none whitespace-nowrap font-medium'>{title}</span>
                    <div className="flex gap-1 items-center">{children}</div>
                </>
            }
        </div>
    )
}

export default ParameterSmall
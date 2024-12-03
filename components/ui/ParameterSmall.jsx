const ParameterSmall = ({ title, children, className = '', visibility = true, horizontal, reverse, ...props }) => {

    const flexFlow = () => {
        if(horizontal) {
            return 'gap-2 items-center'
        } else {
            return 'flex-col'
        }
    }
    
    return (
        <div className={`flex ${flexFlow()} mr-auto ${visibility ? '' : 'hidden '} ${className}`} {...props}>
            { reverse ? 
                <>
                    {children}
                    <span className='text-xs select-none whitespace-nowrap font-medium'>{title}</span>
                </> :
                <>
                    <span className='text-xs select-none whitespace-nowrap font-medium'>{title}</span>
                    {children}
                </>
            }
        </div>
    )
}

export default ParameterSmall
const Column = ({ className, children, ...props }) => {
    return (
        <div className={`flex flex-col lg:gap-8 md:gap-6 sm:gap-5 gap-4 ${className}`} {...props}>{children}</div>
    )
}
export default Column
const TextColumn = ({ className, ...props }) => {
    return (
        <div className={`flex flex-col gap-3 h-full ${className}`} {...props}></div>
    )
}
export default TextColumn
const ColumnSection = ({ className, width = 1, ...props }) => {
    return (
        <div className={`w-full flex flex-col gap-5 grow-${width} ${className}`} {...props}></div>
    )
}
export default ColumnSection
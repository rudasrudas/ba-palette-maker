const ColorName = ({ children, className, ...props }) => {
  return (
    <span className={`truncate whitespace-nowrap leading-none font-medium ${className}`} {...props} >{children}</span>
  )
}
export default ColorName
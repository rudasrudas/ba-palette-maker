const Description = ({ children, className, ...props }) => {
  return (
    <p className={`text-balance text-xs ${className}`} {...props}>{children}</p>
  )
}
export default Description
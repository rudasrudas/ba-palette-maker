const Text = ({ children, className, ...props}) => {
  return (
    <p className={`text-balance leading-6 text-md ${className}`} {...props}>{children}</p>
  )
}
export default Text
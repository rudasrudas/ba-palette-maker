const TitleSmall = ({ children, className, ...props }) => {
    return (
      <h3
        style={{
            fontSize: 'clamp(12px, 2vw, 14px)',
            lineHeight: 'clamp(10px, 2vw, 16px)'
        }}
      className={`font-medium ${className}`} {...props}>{children}</h3>
    )
}
  
export default TitleSmall
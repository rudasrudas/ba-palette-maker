const TitleSmall = ({ children, className, ...props }) => {
    return (
      <h3
        style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            lineHeight: 'clamp(12px, 2vw, 18px)'
        }}
      className={`font-medium ${className}`} {...props}>{children}</h3>
    )
}
  
export default TitleSmall
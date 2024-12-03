const Paragraph = ({ children, className, ...props}) => {
    return (
      <p style={{
            fontSize: 'clamp(12px, 3vw, 14px)',
            lineHeight: 'clamp(12px, 3vw, 20px)'
        }}
        className={`text-balance max-w-lg ${className}`} {...props}>{children}</p>
    )
  }
  export default Paragraph
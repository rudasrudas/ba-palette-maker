const Title = ({ children, className, ...props }) => {
    return (
        <h2 
            style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                lineHeight: 'clamp(12px, 3vw, 28px)'
            }}
            className={`font-medium text-balance tracking-tight ${className}`} {...props}>{children}</h2>
    )
}
  
export default Title
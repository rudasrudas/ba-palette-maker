const TitleExtraLarge = ({ children, className, ...props }) => {
    return (
      <h1
        style={{
          fontSize: 'clamp(32px, 7vw, 72px)',
          lineHeight: 'clamp(30px, 5.5vw, 64px)'
        }}
        className={`text-balance font-bold tracking-tight ${className}`} {...props}>{children}</h1>
    )
  }
  
  export default TitleExtraLarge
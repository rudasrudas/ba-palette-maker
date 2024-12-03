const TitleLarge = ({ children, className, ...props }) => {
    return (
        <h2 
            style={{
                fontSize: 'clamp(24px, 6vw, 48px)',
                lineHeight: 'clamp(22px, 5vw, 44px)'
            }}
            className={`font-medium text-balance ${className}`} {...props}>{children}</h2>
    )
}

export default TitleLarge
const ParagraphLarge = ({ children, className, ...props}) => {
    return (
        <p
            style={{
                fontSize: 'clamp(12px, 3vw, 16px)',
                lineHeight: 'clamp(12px, 3vw, 22px)'
            }}
            className={`text-balance tracking-wide max-w-md ${className}`} {...props}>{children}</p>
    )
}
export default ParagraphLarge
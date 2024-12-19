

const TitleExtraLarge = ({ children, className, isTitle = true, ...props }) => {

  const Element = isTitle ? 'h1' : 'h2';

  return (
    <Element
      style={{
        fontSize: 'clamp(32px, 7vw, 72px)',
        lineHeight: 'clamp(30px, 5.5vw, 64px)'
      }}
      className={`text-balance font-bold tracking-tight ${className}`} {...props}>{children}</Element>
  )
}

export default TitleExtraLarge
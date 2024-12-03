const Line = ({ isActive = true, className }) => {
  return (
    <div className={`h-1 border-b grow border-black dark:border-white transition-all min-w-2 ${isActive ? 'opacity-100 w-full' : 'opacity-0 w-2'} ${className}`}></div>
  )
}
export default Line
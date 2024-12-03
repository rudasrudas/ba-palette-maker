const Block = ({ className, ...props }) => {
  return (
    <div className={`border-black dark:border-white border p-4 min-h-24 min-w-32 rounded-xl bg-white dark:bg-black ${className}`} {...props}/>
  )
}
export default Block
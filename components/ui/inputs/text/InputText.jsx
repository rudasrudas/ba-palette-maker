import { forwardRef } from "react"

const InputText = forwardRef(({ className, ...props }, ref) => {
  return (
    <input ref={ref} className={`h-fit text-md font-medium border border-black dark:border-white bg-white dark:bg-black rounded-md p-1 ${className}`} {...props} />
  )
})

export default InputText
import { cn } from "@utils/utils"
import { forwardRef } from "react"

const Block = forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(`border-black dark:border-white border p-4 min-h-24 min-w-32 rounded-xl bg-white dark:bg-black`, className)} {...props}/>
  )
})
export default Block
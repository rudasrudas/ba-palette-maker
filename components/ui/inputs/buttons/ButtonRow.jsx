import { cn } from "@utils/utils"

const ButtonRow = ({ children, className, ...props }) => {
  return (
    <div className={cn(`flex flex-row gap-x-4 gap-y-2 flex-wrap items-center`, className)} {...props}>{children}</div>
  )
}

export default ButtonRow
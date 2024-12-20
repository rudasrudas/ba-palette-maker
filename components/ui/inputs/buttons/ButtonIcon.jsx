const ButtonIcon = ({ Icon, onClick, className, ...props }) => {
  return (
    <Icon className={`rounded-md p-1 w-6 h-6 border transition-all duration-75 border-black dark:border-white cursor-pointer active:bg-black dark:active:bg-white active:text-white dark:active:text-black hover:scale-105 ${className}`} onClick={onClick} {...props}/>
  )
}
export default ButtonIcon
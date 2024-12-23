const ButtonIcon = ({ Icon, onClick, className, border = true, ...props }) => {
  return (
    <Icon className={`rounded-md w-6 h-6 ${border ? 'border border-black dark:border-white active:bg-black dark:active:bg-white active:text-white dark:active:text-black hover:scale-105' : 'active:hover:scale-100 hover:scale-110'} p-1 transition-all duration-75 cursor-pointer ${className}`} onClick={onClick} {...props}/>
  )
}
export default ButtonIcon
const ButtonIconPrimary = ({ Icon, children, onClick, ...props }) => {
    return (
        <button onClick={onClick} className='h-fit p-2 leading-none border border-black dark:border-white rounded-lg bg-black dark:bg-white text-white dark:text-black active:bg-white dark:active:bg-black active:text-black dark:active:text-white ' { ...props }>
            <Icon className='w-4 h-4' />
        </button>
    )
  }
  
  export default ButtonIconPrimary
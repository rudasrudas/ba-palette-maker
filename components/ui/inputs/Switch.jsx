import { IconCheck, IconX } from "@tabler/icons-react"
import * as gtag from '@utils/gtag'

const Switch = ({ value, setValue, isOn, onValue = true, offValue = false, showIcon = true, tracking, OnIcon = IconCheck, OffIcon = IconX }) => {

    const isOnValue = isOn ? isOn : value === onValue

    const handleClick = () => {
        if(tracking) {
            tracking.value = !isOnValue
            gtag.event(tracking)
        }
        setValue(isOnValue ? offValue : onValue)
    }
    
    return (
        <div onClick={handleClick} className={`border border-black dark:border-white rounded-lg p-1 min-w-12 w-fit h-fit cursor-pointer transition-all ${isOnValue ? 'bg-black dark:bg-white' : ''}`}>
            <div className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${isOnValue ? 'translate-x-[1.4rem] mr-0 bg-white dark:bg-black' : 'bg-black dark:bg-white'}`}>
                { showIcon &&
                    (
                        isOnValue ?
                            <OnIcon className='text-black dark:text-white w-3 h-3' />
                            :
                            <OffIcon className='text-white dark:text-black w-3 h-3' />
                    )
                }
            </div>
        </div>
    )
}
export default Switch
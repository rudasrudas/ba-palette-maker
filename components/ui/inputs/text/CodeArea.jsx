import TextArea from "./TextArea"
import { spaceMono } from "@utils/fonts"

const CodeArea = ({ value = '', setValue, className, ...props }) => {
    return (
        // <div className={`relative overflow-hidden font-mono text-md rounded-lg border h-fit border-black`}>
            <textarea value={value} className={`border bg-white dark:bg-black border-black dark:border-white text-md text-gray-600 dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black p-2 font-mono font-normal rounded-lg w-fit min-w-[500px] -mb-0 min-h-[400px] h-full ${className}`} {...props}>
            </textarea>
            // {/* <div className="absolute h-full top-0 left-0 bottom-0 w-fit p-2">1</div> */}
        // </div>
    )
}
export default CodeArea
import { useState } from "react"

const useCopyToClipboard = (value) => {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = async (e) => {
        e.stopPropagation()
        try {
            await navigator.clipboard.writeText(value)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            setIsCopied(false)
        }
    }

    return { copyToClipboard, isCopied }
}
export default useCopyToClipboard
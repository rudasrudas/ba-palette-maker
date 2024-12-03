const TextArea = ({ value = '', setValue, className, ...props }) => {
    return (
        <textarea value={value} className={`relative text-gray-600 font-mono rounded-lg border border-black p-2 font-normal w-fit min-w-[500px] min-h-[400px] text-md ${className}`} {...props}>
        </textarea>
    )
}
export default TextArea
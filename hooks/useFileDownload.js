const useFileDownload = ({ fileName, fileFormat, content = '' }) => {

    if(!fileFormat || !fileName) return {}

    const handleFileDownload = async (event) => {
        event.preventDefault()
    
        const response = await fetch('/api/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName, fileFormat, content }),
        })
    
        const blob = await response.blob()
    
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${fileName}.${fileFormat}`
        link.click()
        link.remove()
    }

    return { handleFileDownload }
}
export default useFileDownload
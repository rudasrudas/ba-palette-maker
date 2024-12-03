import useColorName from "@hooks/useColorName"
import ColorSuggestion from "./ColorSuggestion"

const ColorSuggestionList = ({ suggestions, selected, setSelected, refresh, count, maxSelect }) => {

    const renderSuggestions = () => {
        const filteredSuggestions = suggestions.filter(suggestion => !selected.includes(suggestion))
        const list = [...selected, ...filteredSuggestions].splice(0, count)
        
        return list.map(suggestion => {

            const handleSuggestionSelect = () => {
                if(selected.includes(suggestion)) {
                    setSelected((prev) => prev.filter(s => s !== suggestion))
                    refresh()
                } else if(selected.length < maxSelect) {
                    setSelected((prev) => [...prev, suggestion])
                    refresh()
                }
                
            }

            const suggestionObject = {
                ...suggestion,
                name: useColorName({ colors: [{ hex: suggestion.hex }], useShort: true })
            }

            return (
                <ColorSuggestion 
                    key={suggestion.hex}
                    isSelected={selected.includes(suggestion)} 
                    select={handleSuggestionSelect} 
                    color={suggestionObject}
                />
            )
        })
    }

    return (
        <div className='flex items-stretch gap-2 w-[100dvw] sm:w-full min-h-[20dvh] py-4 overflow-x-auto px-10 -mx-10'>
            { renderSuggestions() }
        </div>
    )
}
export default ColorSuggestionList
import useColorName from "@hooks/useColorName"
import ColorSuggestion from "./ColorSuggestion"

const ColorSuggestionList = ({ suggestions, onSelect, refresh }) => {

    const renderSuggestions = () => {
        return suggestions.map(suggestion => {
            const handleSuggestionSelect = () => {
                onSelect(suggestion)
                refresh()
            }

            const suggestionObject = {
                ...suggestion,
                name: useColorName({ colors: [{ hex: suggestion.hex }], useShort: true })
            }

            return (
                <ColorSuggestion 
                    key={suggestion.hex}
                    select={handleSuggestionSelect} 
                    color={suggestionObject}
                />
            )
        })
    }

    return (
        <div className='flex items-stretch gap-0.5 w-[100dvw] sm:w-full min-h-[10dvh] py-1 overflow-x-auto px-10 -mx-10'>
            { renderSuggestions() }
        </div>
    )
}
export default ColorSuggestionList
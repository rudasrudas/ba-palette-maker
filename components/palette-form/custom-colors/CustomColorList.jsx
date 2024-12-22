import ButtonNewColorSet from "@components/palette-editor/color-group/ButtonNewColorSet"
import CustomColor from "./CustomColor"
import ColorSetHeader from "@components/palette-editor/color-set/ColorSetHeader"

const CustomColorList = ({ colors, setColors, addColor, maxSelectedLimitReached }) => {

    const renderCustomColors = () => {
        return colors.map(color => {
            const setColor = (newColor) => {
                setColors(prev => 
                    [...prev].map(c => {
                        if (c.id !== color.id) return c
                        return typeof newColor === 'function'
                            ? { ...c, ...newColor(c) }
                            : { ...c, ...newColor }
                    })
                )
            }

            const remove = () => {
                setColors(prev => prev.filter(pc => pc.text.hex != color.text.hex))
            }

            return (
                <CustomColor
                    key={color.id}
                    color={color}
                    remove={remove}
                    setColor={setColor}
                />
            )
        })
    }

    return (
        <div className='flex items-stretch gap-2 w-full min-h-32'>
            { renderCustomColors() }
            { !maxSelectedLimitReached && 
                <div className="flex gap-2 w-full max-w-32 min-w-10 grow flex-col h-full min-h-32 transition-all">
                    <ColorSetHeader color={{ name: 'Add new' }} className={"invisible select-none"}/>
                    <ButtonNewColorSet className={"h-full"} onClick={addColor} />
                </div>
            }
        </div>
    )
}
export default CustomColorList
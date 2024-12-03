import { useEffect, useState } from "react"
import CustomColor from "./CustomColor"
import useColor from "@hooks/useColor"
import { oklchToHex } from "@utils/colorConversion"

const CustomColorList = ({ colors, setColors, activeColor, setActiveColor }) => {

    const renderCustomColors = () => {
        return colors.map(color => {
            const setColor = (newColor) => {
                setColors((prevColors) => prevColors.map(c => {
                  if (c.id !== color.id) return c
                  return typeof newColor === 'function' ? newColor(c) : newColor
                }))
            }

            const isSelected = () => {
                return color.id && color.id === activeColor?.id
            }

            const select = () => {
                setActiveColor(color)
            }

            const deselect = () => {
                if(isSelected()) {
                    setActiveColor(null)
                }
            }

            const remove = () => {
                setColors(prevColors => prevColors.filter(pc => pc.id !== color.id))
            }

            if(!isSelected && color.empty && colors.length > 1) {
                remove()
                return
            }

            return (
                <CustomColor
                    key={color.id}
                    color={color}
                    isSelected={isSelected()}
                    select={select}
                    deselect={deselect}
                    remove={remove}
                    setColor={setColor}
                />
            )
        })
    }

    return (
        <div className='flex items-stretch gap-2 w-full min-h-[20dvh]'>
            { renderCustomColors() }
        </div>
    )
}
export default CustomColorList
import Parameter from "@components/ui/Parameter"
import CountSelector from "../../ui/inputs/CountSelector"
import Slider from "../../ui/inputs/sliders/Slider"
import RangeSlider from "../../ui/inputs/sliders/RangeSlider"
import CubicBezierSelector from "../../ui/inputs/sliders/CubicBezierSelector"
import { useCallback, useEffect } from "react"
import Switch from "@components/ui/inputs/Switch"

const ColorGroupSettings = ({ colorGroup, setColorGroup }) => {

    const handleParameterChange = (path) => {
        return (value) => {
            return setColorGroup((prev) => {
                const updateNestedObject = (obj, keys, val) => {
                    let current = obj
                    for (let i = 0; i < keys.length - 1; i++) {
                        if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
                            current[keys[i]] = {}
                        }

                        current = current[keys[i]]
                    }
                    current[keys[keys.length - 1]] = (typeof val === 'function' ? val(current[keys[keys.length - 1]]) : val)
                    return obj
                }
        
                return updateNestedObject({ ...prev }, path, value)
            })
        }
    }

    function updateNestedObject(obj, keys, val) {
        const result = { ...obj }; // Clone only once at the top level
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            } else {
                // Clone only the necessary nested objects to ensure immutability
                current[keys[i]] = { ...current[keys[i]] };
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = (typeof val === 'function' ? val(current[keys[keys.length - 1]]) : val);
        return result;
    }

    const memoizedHandleParameterChange = useCallback(
        (path) => (value) => {
            setColorGroup(prev => updateNestedObject({ ...prev }, path, value));
        },
        [] // Dependencies can be adjusted based on what variables affect the paths or values
    );

    // useEffect(() => {
    //     if(colorGroup.advanced) {
    //         setColorGroup(prev => ({
    //             ...prev,
    //             chroma: {
    //                 ...prev.chroma,
    //                 range: {
    //                     min: prev.chroma.range.min,
    //                     max: Math.min(prev.chroma.range.min * 1.2, prev.chroma.limit.max)
    //                 }
    //             },
    //         }))
    //     } else {
    //         setColorGroup(prev => ({
    //             ...prev,
    //             lightness: {
    //                 ...prev.lightness,
    //                 distribution: [0, 0, 1, 1]
    //             },
    //             chroma: {
    //                 ...prev.chroma,
    //                 range: {
    //                     min: prev.chroma.range.min,
    //                     max: prev.chroma.range.min
    //                 },
    //                 distribution: [0, 0, 1, 1]
    //             },
    //         }))
    //     }
    // }, [colorGroup.advanced])

    return (
        <div className={`flex gap-10`}>
            <div className='flex flex-col gap-6'>
                <Parameter title='Shade count'>
                    <CountSelector 
                        setCount={memoizedHandleParameterChange(['count'])} 
                        count={colorGroup.count} 
                        min={1} 
                        max={9}
                    />
                </Parameter>
                <Parameter title='Advanced settings'>
                    <Switch
                        value={colorGroup.advanced}
                        setValue={memoizedHandleParameterChange(['advanced'])}
                    />
                </Parameter>
            </div>
            <div className='flex flex-col gap-2'>
                    { colorGroup.advanced ?
                        <>
                            <Parameter title='Lightest saturation'>
                                <Slider
                                    onChange={memoizedHandleParameterChange(['chroma', 'range', 'max'])}
                                    initial={colorGroup.chroma.range.max} 
                                    limit={colorGroup.chroma.limit}
                                />
                            </Parameter>
                            <Parameter title='Darkest saturation'>
                                <Slider
                                    onChange={memoizedHandleParameterChange(['chroma', 'range', 'min'])}
                                    initial={colorGroup.chroma.range.min} 
                                    limit={colorGroup.chroma.limit}
                                />
                            </Parameter>
                        </>
                    :
                        <Parameter title='Saturation'>
                            <Slider
                                onChange={memoizedHandleParameterChange(['chroma', 'range', 'min'])}
                                initial={colorGroup.chroma.range.min} 
                                limit={colorGroup.chroma.limit}
                            />
                        </Parameter>
                    }
                { colorGroup.advanced &&
                    <Parameter title='Saturation distribution' className='row-span-10 col-span-1' visibility={colorGroup.count > 2}>
                        <CubicBezierSelector 
                            onChange={memoizedHandleParameterChange(['chroma', 'distribution'])} 
                            initial={colorGroup.chroma.distribution}
                        />
                    </Parameter>
                }
            </div>
            <div className='flex flex-col gap-2'>
                <Parameter title='Lightness range' visibility={colorGroup.count > 1 || true}>
                    <RangeSlider 
                        onChange={memoizedHandleParameterChange(['lightness', 'range'])}
                        initial={colorGroup.lightness.range} 
                        limit={colorGroup.lightness.limit}
                    />
                </Parameter>
                { colorGroup.advanced &&
                    <Parameter title='Lightness distribution' className='row-span-10 col-span-1' visibility={colorGroup.count > 2}>
                        <CubicBezierSelector 
                            onChange={memoizedHandleParameterChange(['lightness', 'distribution'])} 
                            initial={colorGroup.lightness.distribution}
                        />
                    </Parameter>
                }
            </div>
        </div>
    )
}
export default ColorGroupSettings
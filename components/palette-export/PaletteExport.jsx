'use client'

import PaletteDisplay from "@components/palette-display/PaletteDisplay"
import Line from "@components/palette-editor/color-group/Line"
import ButtonPrimary from "@components/ui/inputs/buttons/ButtonPrimary"
import ButtonSecondary from "@components/ui/inputs/buttons/ButtonSecondary"
import ButtonSecondaryMedium from "@components/ui/inputs/buttons/ButtonSecondaryMedium"
import RadioList from "@components/ui/inputs/radio/RadioList"
import RadioOption from "@components/ui/inputs/radio/RadioOption"
import TabList from "@components/ui/inputs/tabs/TabList"
import CodeArea from "@components/ui/inputs/text/CodeArea"
import TitleLarge from "@components/ui/text/TitleLarge"
import Text from "@components/ui/text/Text"
import TitleSmall from "@components/ui/text/TitleSmall"
import useColorExport, { COLOR_FORMATS, EXPORT_TYPES } from "@hooks/useColorExport"
import useCopyToClipboard from "@hooks/useCopyToClipboard"
import useFileDownload from "@hooks/useFileDownload"
import useQueryState from "@hooks/useQueryState"
import { IconArrowLeft, IconCopy, IconCopyCheckFilled, IconFileDownload } from "@tabler/icons-react"
import { useState } from "react"

const PaletteExport = ({ palette, close }) => {

    const [exportType, setExportType] = useState(EXPORT_TYPES.CSS.value)

    const colorFormats = Object.values(COLOR_FORMATS)
    const [colorFormatId, setColorFormatId] = useQueryState('format')
    const colorFormat = colorFormats.find(cf => cf.value === colorFormatId) || COLOR_FORMATS.HEX
    
    const exportCode = useColorExport({
        colorGroups: palette?.colorGroups,
        exportType,
        colorFormat
    })

    const exportFileFormat = Object.values(EXPORT_TYPES).find(e => e.value === exportType).fileFormat

    const renderColorFormats = () => {
        return colorFormats.map(cf => {
            return (
                <RadioOption
                    actual={colorFormat}
                    select={(v) => setColorFormatId(v.value)}
                    from={colorFormats}
                    {...cf}
                />
            )
        })
    }

    const { copyToClipboard, isCopied } = useCopyToClipboard(exportCode)
    const { handleFileDownload } = useFileDownload({
        fileName: 'colors',
        fileFormat: exportFileFormat,
        content: exportCode
    })

    return (
        <div className={`flex flex-col gap-8`}>
            <ButtonSecondaryMedium onClick={close}>
                <IconArrowLeft className="w-4 h-4"/>
                Return
            </ButtonSecondaryMedium>
            <div>
                <TitleLarge className='pt-0'>Export and share</TitleLarge>
                <Text className='max-w-md pt-0'>Use your new palette for your next designs and projects</Text>
            </div>

            <div className="flex gap-16">
                <div className='flex flex-col gap-4 max-w-[50%] items-stretch justify-stretch'>
                    <div className="flex items-center">
                        <TabList
                            className='w-fit'
                            value={exportType}
                            options={Object.values(EXPORT_TYPES)}
                            onChange={setExportType}
                        />
                        <Line/>
                        { handleFileDownload &&
                            <ButtonSecondary onClick={handleFileDownload} tracking={{
                                action: 'download_file',
                                category: 'Button',
                                label: 'Download File Button',
                                value: '1',
                            }}>
                                Download
                                <IconFileDownload className='w-4 h-4'/>
                            </ButtonSecondary>
                        }
                        <div className='h-1 border-bX border-black w-16 my-auto'></div>
                        { copyToClipboard &&     
                            <ButtonPrimary onClick={copyToClipboard} tracking={{
                                action: 'export_copy_code',
                                category: 'Button',
                                label: 'Copy Code Button',
                                value: '1',
                            }}>
                                Copy code
                                { isCopied ?
                                    <IconCopyCheckFilled className='w-4 h-4'/>
                                    :
                                    <IconCopy className='w-4 h-4'/>
                                }
                            </ButtonPrimary>
                        }
                    </div>

                    <div className="w-full">
                        <TitleSmall>{exportFileFormat}</TitleSmall>
                        <CodeArea key={exportCode} value={exportCode} readOnly className='w-full resize-none h-max' />
                    </div>
                </div>
                <PaletteDisplay key={palette} colorGroups={palette?.colorGroups} className='' />

            </div>

            { exportType !== EXPORT_TYPES.ANDROID_XML.value &&
                <RadioList title='Color format' className=''>
                    {renderColorFormats()}
                </RadioList>
            }
        </div>
    )
}
export default PaletteExport
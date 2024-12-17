import { COLORBLIND_MODES } from "@components/palette-editor/palette-settings/dropdown-settings/ColorblindnessDropdown"
import { COLOR_FORMATS } from "@hooks/useColorExport"
import { IconContrast, IconEyeglass2, IconPointer } from "@tabler/icons-react"
import HeaderTool from "./HeaderTool"
import useQueryState from "@hooks/useQueryState"

const PALETTE_TOOLS = {
    COPY_TOOL: {
        key: "copy",
        title: "Copy tool",
        Icon: IconPointer,
        query: "format",
        options: Object.values(COLOR_FORMATS),
        defaultOption: COLOR_FORMATS.HEX
    },
    CONTRAST_TOOL: {
        key: "contrast",
        title: "Contrast",
        Icon: IconContrast
    },
    COLORBLIND_TOOL: {
        key: "colorblind",
        title: "Colorblind",
        Icon: IconEyeglass2,
        query: "colorblindness",
        options: Object.values(COLORBLIND_MODES),
        defaultOption: COLORBLIND_MODES.NONE
    }
}

const HeaderTools = () => {

    const [activeTool, setActiveTool] = useQueryState('mode')

    const renderTools = () => {
        return Object.values(PALETTE_TOOLS).map(tool => {

            const isActive = tool.key === activeTool
            return (
                <>
                    <HeaderTool
                        {...tool}
                        isActive={isActive}
                        onClick={() => setActiveTool(isActive ? null : tool.key)}
                    />
                    {/* <ParameterDivider/> */}
                </>
            )
        })
    }

    return (
        <>
            {/* <ParameterDivider/> */}
            {renderTools()}
            
        </>
    )
}
export default HeaderTools
import { COLORBLIND_MODES } from "@components/palette-editor/palette-settings/dropdown-settings/ColorblindnessDropdown"
import { COLOR_FORMATS } from "@hooks/useColorExport"
import { IconContrast, IconEyeglass2, IconPointer } from "@tabler/icons-react"
import HeaderTool from "./HeaderTool"
import useQueryState from "@hooks/useQueryState"

const PALETTE_TOOLS = {
    COPY_TOOL: {
        id: "copy",
        title: "Copy tool",
        Icon: IconPointer,
        query: "format",
        options: Object.values(COLOR_FORMATS),
        defaultOption: COLOR_FORMATS.HEX
    },
    CONTRAST_TOOL: {
        id: "contrast",
        title: "Contrast",
        Icon: IconContrast
    },
    COLORBLIND_TOOL: {
        id: "colorblind",
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

            const isActive = tool.id === activeTool
            return (
                <>
                    <HeaderTool
                        key={tool.id}
                        {...tool}
                        isActive={isActive}
                        onClick={() => setActiveTool(isActive ? null : tool.id)}
                    />
                </>
            )
        })
    }

    return (
        <>
            {renderTools()}
        </>
    )
}
export default HeaderTools
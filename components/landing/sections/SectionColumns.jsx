import React from "react"
import ColumnSection from "./ColumnSection"

const SectionColumns = ({ children, className, ...props }) => {

    return (
        <div className={`w-full flex flex-col sm:flex-row lg:gap-16 md:gap-8 sm:gap-6 gap-4 ${className}`} {...props}>
            {children}
        </div>
    )
}
export default SectionColumns

SectionColumns.ColumnSection = ColumnSection
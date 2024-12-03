import Description from "@components/ui/text/Description"
import Text from "@components/ui/text/Text"
import Link from "next/link"

const LinkText = ({ className, ...props }) => {
  return (
    <Description>
        <Link className={`flex pointer gap-1 ${className}`} {...props}/>
    </Description>
  )
}
export default LinkText
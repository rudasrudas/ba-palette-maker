import Link from "next/link"
import logoSvg from '@public/svg/logo.svg'
import Image from "next/image"
import { useTheme } from "next-themes"

const Logo = ({ className, dark = false }) => {
  const { theme } = useTheme()

  return (
    <Link href="/" className={`text-2xl flex gap-2 tracking-normal items-center font-medium ${className}`}>
      <Image src={logoSvg} height={20} className={`sm:w-8 w-6 ${dark || theme === 'dark' ? 'invert' : 'invert-0'}`}/>
      <span className="text-xl sm:text-2xl ">palettemaker.io</span>
    </Link>
  )
}

export default Logo
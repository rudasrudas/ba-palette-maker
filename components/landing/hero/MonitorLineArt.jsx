import Image from "next/image"
import screenshotImg from "@public/pics/screenshot.png"

const MonitorLineArt = () => {
  return (
    <div className="">
        <div className='relative w-full min-w-[200px] z-0 min-h-[120px] border border-black dark:border-white rounded-2xl p-4 pb-6'>
            <Image src={screenshotImg} className="w-full h-full border border-black dark:border-white rounded-lg">
            </Image>
            <div className='absolute left-0 right-0 bottom-2 mx-auto w-2 h-2 rounded-full border border-black dark:border-white'></div>
        </div>
        <div className='flex items-center justify-center'>
            <div className="w-6 h-12 rounded-ee-3xl border-r border-black dark:border-white"></div>
            <div className="w-20 h-12 bg-white dark:bg-black z-10"></div>
            <div className="w-6 h-12 rounded-es-3xl border-l border-black dark:border-white"></div>
        </div>
        <div className="mx-20 border border-black dark:border-white rounded-t-xl h-6"></div>
    </div>
  )
}
export default MonitorLineArt
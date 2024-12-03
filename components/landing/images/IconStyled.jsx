import Title from "@components/ui/text/Title"

const IconStyled = ({ Icon, title }) => {
    return (
        <div className='overflow-hidden rounded-xl border border-black dark:border-white h-28 w-full max-w-[200px]'>
            <div className='w-full h-full flex gap-2 items-center justify-center hover:scale-110 duration-700 transition-all'>
                <Icon 
                    style={{
                        width: 'clamp(32px, 5vw, 54px)',
                        height: 'clamp(32px, 5vw, 54px)'
                    }}
                    stroke="1"
                />
                <Title>{title}</Title>
            </div>
        </div>
    )
}
export default IconStyled

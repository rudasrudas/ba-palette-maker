const Page = ({ children, ...props }) => {
  return (
    <main className='relative w-full h-full grow flex flex-col gap-4 sm:gap-6 md:gap-8 min-h-screen p-2 sm:p-8 md:p-10' {...props}>
        {children}
    </main>
  )
}
export default Page
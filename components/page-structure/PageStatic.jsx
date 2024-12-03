const PageStatic = ({ children, ...props }) => {
    return (
      <main className='relative w-full h-full grow flex flex-col gap-32 sm:gap-32 md:gap-36 lg:gap-40 min-h-screen py-10 lg:px-24 md:px-16 sm:px-8 px-4' {...props}>
          {children}
      </main>
    )
  }
  export default PageStatic
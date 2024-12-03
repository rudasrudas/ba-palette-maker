const Notifications = ({ className, ...props }) => {
  return (
    <div
        className={`fixed bottom-5 right-5 pl-5 pt-5 flex flex-col-reverse h-full overflow-hidden ${className}`}
        {...props}
    />
  )
}
export default Notifications
const Tooltip = ({ text, ...props }) => {
  return (
    <span title={text} {...props}/>
  )
}
export default Tooltip
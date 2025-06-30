
interface CustomButtonProps {
    text : string,
    color : string,
    onClick : ()=>void
}

const CustomButton = ( {text,color,onClick}: CustomButtonProps ) => {
  return (
    <button
        onClick={onClick}
        style={{backgroundColor : color}}
        className="text-whilte rounded-md px-2 "
    >
        {text}
    </button>
  )
}

export default CustomButton

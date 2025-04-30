import CrossIcon from "../../icons/CrossIcon"

interface FormContainerProps{
    title : string,
    onClose : ()=> void,
    children : React.ReactNode
}

const FormContainer = ({title,onClose,children}:FormContainerProps) => {
  return (
    <div className=" w-80 flex flex-col border border-white/[0.2] p-4 rounded-lg gap-4 ">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose} className=" hover:scale-110 hover:text-red-600"><CrossIcon/></button>
      </div>
      <div>
        {children}
      </div>      
    </div>
  )
}

export default FormContainer

import { UseFormRegisterReturn } from "react-hook-form"


interface TextAreaProps{
    label : string,
    placeholder : string,
    name : string,
    onChange? : ()=>void,
    register? : UseFormRegisterReturn,

}

const TextArea = ({name,label,placeholder,register}:TextAreaProps) => {
  return (
    <div className="flex flex-col gap-1 w-full" >
        <label className="font-medium text-white cursor-pointer" htmlFor={name}>{label}</label>
        <textarea 
            name={name} 
            id={name}
            placeholder={placeholder}
            {...register}
            className="rounded-md pl-2 min-h-6 max-h-40 w-full text-black focus:outline-none focus:ring-2 focus:ring-slate-500 "
        >
            
        </textarea>
      
    </div>
  )
}

export default TextArea

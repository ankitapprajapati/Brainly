import { ReactElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps{
  name : string;
  placeholder : string;
  label : string;
  type : string;
  onChange? : ()=>void;
  icon? : ReactElement;
  onIconClick? : ()=>void;
  register? : UseFormRegisterReturn;
}


const Input = ({placeholder,type,label,name,register,icon,onIconClick}:InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-white cursor-pointer" htmlFor={name}>{label}</label>
      <div className="relative">
        <input 
          type={type}
          name={name} 
          id={name} 
          placeholder={placeholder}
          className="pl-2 w-full pr-10 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          {...register}
        />
        { icon && 
          <span 
            className="absolute right-3 top-1.5 cursor-pointer"
            onClick={onIconClick}
          >
            {icon}
          </span>
        }
      </div>
    </div>
  )
}

export default Input

interface ToggleProps{
    title : string,
    status : boolean,
    onChange : ()=>void
}
const Toggle = ({title,onChange,status}:ToggleProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer gap-4">
        <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">{title}</span>
        <div className="relative">
          <input 
            onChange={onChange} 
            type="checkbox" 
            checked={status}
            className="sr-only peer "
          />
          <div className=" w-11 h-6 bg-slate-500 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-200 peer-checked:bg-orange-500" ></div>
          <div className="absolute inset-0 h-6 w-6 rounded-full bg-white shadow-lg transform transition peer-checked:translate-x-5 "> </div>
        </div>
    </label>

  )
}

export default Toggle

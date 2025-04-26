
interface FloatingNavButtonProps{
    text:string,
    onclick:()=>void,
}

const FloatingNavButton = ({text,onclick}:FloatingNavButtonProps) => {
  return (

    <button 
        onClick={onclick}
        className="bg-black relative border border-white/[0.2]  text-md font-medium text-white hover:text-neutral-300 rounded-full px-4 py-1 hover:cursor-pointer"
    >   
        <span>{text}</span>
        <span className="absolute w-1/2  h-px inset-x-0 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
    </button>      
  )
}

export default FloatingNavButton

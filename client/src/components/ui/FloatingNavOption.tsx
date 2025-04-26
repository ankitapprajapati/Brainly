import { ReactElement } from "react"

interface FloatingNavOptionProps{
    text:string,
    link:string,
    icon:ReactElement;
}

const FloatingNavOption = ({text,link,icon}:FloatingNavOptionProps) => {
  return (
    <a
        className="flex items-center gap-1 text-white hover:text-neutral-300"
        href={link}
    >
        <span className="hidden sm:block">{icon}</span>
        <span className="">{text}</span>
    </a>
  )
}

export default FloatingNavOption

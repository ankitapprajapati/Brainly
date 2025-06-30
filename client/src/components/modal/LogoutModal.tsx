import { LogoutForm } from "../form/LogoutForm";

interface LogoutModalProps{
    open : boolean,
    onClose : ()=> void,
}

export function LogoutModal({open,onClose}:LogoutModalProps){
    return <>
        { open && 
            <div 
                onClick={onClose}
                className=" fixed h-screen bg-black w-screen z-[1000] top-0 left-0 opacity-90 backdrop-blur-sm flex items-center justify-center"
            >
                <div 
                    onClick={ (e)=>e.stopPropagation() }
                    className="text-purple-200 flex flex-col "
                >
                    <LogoutForm onClose={onClose}   />                    
                </div>
            </div>
        }
    </>
}
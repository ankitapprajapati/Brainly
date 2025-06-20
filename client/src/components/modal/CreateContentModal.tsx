import AddContentForm from "../form/AddContentForm";

interface createContentModalProps {
    open : boolean,
    onClose : ()=> void,
}


export function CreateContentModal({open,onClose}:createContentModalProps){

    return <>
        { open && 
            <div 
                onClick={onClose}
                className="h-screen w-screen fixed z-[1000] top-0 left-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center "
            >
                <div onClick={(e)=>e.stopPropagation()} className="text-purple-200" >
                    <AddContentForm onClose={onClose}/>
                </div>

            </div>
        }
    </>


}
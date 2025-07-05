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
                className="h-screen w-screen fixed aria-hidden:true z-[9999] inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center "
            >
                <div onClick={(e)=>e.stopPropagation()} className="text-purple-200" >
                    <AddContentForm onClose={onClose}/>
                </div>

            </div>
        }
    </>


}
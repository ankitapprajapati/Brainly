

interface shareModalProps{
    open : boolean,
    onClose : ()=> void,
}

const ShareModal = ({open,onClose}: shareModalProps) => {
  return <>
    {open && 
      <div
        onClick={onClose}
        className="h-screen w-screen fixed z-[1000] top-0 left-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center"
      >
                        
      </div>
    }
  </>
}

export default ShareModal

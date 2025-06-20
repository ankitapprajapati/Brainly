import FormContainer from "./FormContainer"

interface LogoutFormProps{
    onClose : ()=> void
}

export const LogoutForm = ({onClose}:LogoutFormProps)=>{
    <FormContainer title="Logout" onClose={onClose} >
        <div>
            
        </div>
    </FormContainer>

}
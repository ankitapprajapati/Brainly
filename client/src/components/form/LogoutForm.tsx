import useLogout from "../../hooks/useLogout"
import CustomButton from "../ui/CustomButton"
import FormContainer from "./FormContainer"

interface LogoutFormProps{
    onClose : ()=> void
}

export const LogoutForm = ({onClose}:LogoutFormProps)=>{
    const logOutHandler = useLogout();
    return(
    <FormContainer title="Are you sure want to logout ? " onClose={onClose} >
        <div className=" flex justify-between px-4 py-4 pr-8">
            <CustomButton text="Stay-Here" color="#16A34A" onClick={onClose}/>
            <CustomButton text="LogOut" color="#DC2626" onClick={logOutHandler}/>
        </div>      
    </FormContainer>
    )
}
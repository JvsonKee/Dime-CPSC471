import { ConfirmButton, FormContainer } from "./PopUp.styled"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

const ConfirmForm = ( {mode, popUp} ) => {
    const [user, setUser] = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(true)

    let navigate = useNavigate()

    const closePopUp = () => {
        setIsOpen(false)
        popUp(isOpen)
    }

    let string = ""

    if (mode === "upgrade") {
        if (user.premium === "y") {
            string = "Downgrade to standard";
        } 

        if (user.premium === "n") {
            string = "Upgrade to premium"
        }

    } else if (mode === "delete") {
        string = "Delete account"
    }

    const handleClick = async () => {
        if (mode === "delete") {
            try{
                await axios.delete("http://localhost:8800/deleted/" + user.userID);
                navigate("/");
            }catch(err) {
                console.log(err)
            }
        }

        if (mode === "upgrade") {
            if (user.premium === "y") {
                user.premium = "n"
                await axios.put("http://localhost:8800/updatepremium/" + user.userID, {premium:"n"})
            } else if (user.premium === "n") {
                user.premium = "y"
                await axios.put("http://localhost:8800/updatepremium/" + user.userID, {premium:"y"})
            }
            closePopUp();
        }
    }   

    return (
        <FormContainer>
            <ConfirmButton onClick={handleClick}>{string}</ConfirmButton>
        </FormContainer>
    )
}

export default ConfirmForm
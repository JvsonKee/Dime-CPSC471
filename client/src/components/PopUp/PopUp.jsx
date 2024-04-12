import { useState } from "react";
import { CloseButton, PopUpContainer, PopUpWrapper } from "./PopUp.styled"
import TextForm from "./TextForm";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ConfirmForm from "./ConfirmForm";
import PaymentMethodForm from "./PaymentMethodForm";
import EditPaymentForm from "./EditPaymentForm";

const PopUp = ( {popUp, mode, data} ) => {
    
    const [isOpen, setIsOpen] = useState(true);

    const closePopUp = () => {
        setIsOpen(false);
        popUp(isOpen)
    }

    const handleChildClick = (e) => {
        e.stopPropagation();
    }

    return (
        <PopUpWrapper onClick={closePopUp}>
            <PopUpContainer onClick={handleChildClick}>    
                <CloseButton onClick={closePopUp} icon={faXmark}/>
                { mode === "email" || mode === "password" ? <TextForm mode={mode} popUp={closePopUp}/> : null }
                { mode === "upgrade" || mode === "delete" ? <ConfirmForm mode={mode} popUp={closePopUp}/> : null }
                { mode === "payment" ? <PaymentMethodForm popUp={closePopUp}/> : null }
                { mode === "editpayment" ? <EditPaymentForm popUp={closePopUp} data={data}/> : null }
            </PopUpContainer>
        </PopUpWrapper>

    )
}

export default PopUp
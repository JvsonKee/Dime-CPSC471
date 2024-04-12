import { useContext, useState } from "react"
import { CardContainer, CardHolder, CardNumber, Expiry, InformationContainer, TypeHeader } from "./PaymentCard.styled"
import { UserContext } from "../App"
import PopUp from "./PopUp/PopUp"

const PaymentCard = ( {methodID, methodType, cardNumber, expiryMonth, expiryYear} ) => {
    const [user, setUser] = useContext(UserContext)
    const [popUp, setPopUp] = useState(false)
    const [mode, setMode] = useState("")

    const showPopUp = (m) => {
        setMode(m)
        setPopUp(true)
    }

    const handlePopUp = () => {
        setPopUp(false)
    }

    const handleClick = () => {
        console.log(methodID)
    }
    return (
        <CardContainer onClick={() => showPopUp("editpayment")}>
            {popUp ? <PopUp mode={mode} popUp={handlePopUp} data={{methodID: methodID, methodType: methodType, cardNumber: cardNumber, expiryMonth: expiryMonth, expiryYear: expiryYear}}/> : null}
            <InformationContainer>
                <TypeHeader>{methodType}</TypeHeader>
                <CardHolder>{user.fName} {user.lName}</CardHolder>
                <CardNumber>{cardNumber}</CardNumber>
                <Expiry>{expiryMonth} / {expiryYear}</Expiry>
            </InformationContainer>
        </CardContainer>
    )
}

export default PaymentCard
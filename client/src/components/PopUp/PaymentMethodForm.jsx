import { useContext, useState } from "react"
import { Dropdown, DropdownContainer, DropWrapper, FormContainer, SubmitButton, TextInput } from "./PopUp.styled"
import axios from "axios"
import { UserContext } from "../../App"
import { cardTypes, months, years } from "../../util"
import { PaymentContext } from "../../pages/Account/PaymentMethods"

const PaymentMethodForm = ( {popUp} ) => {
    const [user, setUser] = useContext(UserContext)
    const [paymentMethods, setPaymentMethods] = useContext(PaymentContext)
    const [card, setCard] = useState({
        methodType: '',
        cardNumber: null, 
        expiryMonth: null, 
        expiryYear: null
    })
    const [error, setError] = useState("")
    const [isOpen, setIsOpen] = useState(true) 

    const updateList = (card) => {
        const updatedList = [card, ...paymentMethods]
        setPaymentMethods(updatedList)
    }

    const closePopUp = () => {
        setIsOpen(false)
        popUp(isOpen)
    }

    const handleChange = (e) => {
        setCard((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log({card})
    }
    
    const validForm = () => {
        let valid = true;

        if (card.methodType === "" || card.methodType === "Choose type") {
            setError("Invalid method type.")
            valid = false;
        }

        if (card.cardNumber === null) {
            setError("No card number provided")
            valid = false;
        }        

        if (card.expiryMonth === null || card.expiryMonth === "Month") {
            setError("No expiry month provided.")
            valid = false;
        }

        if (card.expiryYear === null || card.expiryYear === "Year") {
            setError("No expiry year provided.")
            valid = false;
        }

        return valid
    }


    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/newpaymentmethod/"+ user.userID, card)
                // updateList(card)
                console.log({paymentMethods})
                closePopUp()
            }catch (err) {
                console.log(err)
            }

            try {
                const res = await axios.get("http://localhost:8800/paymentmethods/" + user.userID);
                setPaymentMethods(res.data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <FormContainer>
            <DropdownContainer style={{alignSelf: 'flex-start'}}>
                <DropWrapper>
                    <label>Card type:</label>
                    <Dropdown onChange={handleChange} name="methodType">
                        <option>Choose type</option>
                        {cardTypes.map((type, key) => (
                            <option key={key}>{type}</option>
                        ))}
                    </Dropdown>
                </DropWrapper>
            </DropdownContainer>
            <TextInput type="number" placeholder="Card number" onChange={handleChange} name="cardNumber"/>
            <DropdownContainer>
                <DropWrapper>
                    <label>Expiry month:</label>
                    <Dropdown onChange={handleChange} name="expiryMonth" placeholder="month">
                        <option>Month</option>
                        {months.map((month, key) => (
                            <option key={key}>{month}</option>
                        ))}
                    </Dropdown>
                </DropWrapper>
                <DropWrapper>
                    <label>Expiry year:</label>
                    <Dropdown onChange={handleChange} name="expiryYear">
                        <option>Year</option>
                        {years.map((year, key) => (
                            <option key={key}>{year}</option>
                        ))}
                    </Dropdown>
                </DropWrapper>
            </DropdownContainer>
            {error ? <div>{error}</div> : null}
            <SubmitButton onClick={handleClick}>Submit</SubmitButton>
        </FormContainer>
    )
}

export default PaymentMethodForm
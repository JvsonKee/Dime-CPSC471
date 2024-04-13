import { useContext, useState } from "react"
import { Bottom, DeleteCardButton, DropWrapper, Dropdown, DropdownContainer, EditCardContainer, EditWrapper, FormContainer, InfoContent, InfoHeader, InfoMatrix, InfoWrapper, SubmitButton, SubmitEditButton, Top } from "./PopUp.styled"
import { cardTypes, months, years } from "../../util"
import axios from "axios"
import { PaymentContext } from "../../pages/Account/PaymentMethods"
const EditPaymentForm = ({data, popUp}) => {
    // const [number, setNumber] = (data.number)
    const [paymentMethods, setPaymentMethods] = useContext(PaymentContext)
    const [active, setActive] = useState("")
    const [card, setCard] = useState(data)
    const [isOpen, setIsOpen] = useState(true)

    const closePopUp = () => {
        setIsOpen(false)
        popUp(isOpen)
    }

    const handleReset = () => {
        setActive("")
        console.log({active})
    }

    const updateCard = (input) => {
        setCard(input)
    }

    const handleClick = (mode) => {
        setActive(mode)
    }

    const updateDatabase = async e => {
        e.preventDefault()

        try {
            await axios.put("http://localhost:8800/editpaymentmethod/"+ card.methodID, card)
            console.log({card})
            setPaymentMethods(prevPaymentMethods => {
                const index = prevPaymentMethods.findIndex(item => item.methodID === card.methodID);
                if (index !== -1) {
                    const newPaymentMethods = [...prevPaymentMethods];
                    newPaymentMethods[index] = card;
                    return newPaymentMethods;
                }
                return prevPaymentMethods;
            })

            closePopUp()
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCard = async (card) => {
        try {
            await axios.delete("http://localhost:8800/deletepayment/" + card);
            setPaymentMethods(paymentMethods => paymentMethods.filter(item => item.methodID !== card))
            closePopUp()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <FormContainer>
            <h1>Edit card details</h1>
            <InfoWrapper>
                <InfoMatrix onClick={() => handleClick("type")} style={{borderRadius: "20px 20px 0 0"}}>
                    <InfoHeader>Card Type</InfoHeader>
                    {
                        active === "type" ? 
                        <EditCard mode={active} active={handleReset} data={card} parentCardData={updateCard}/> : 
                        active !== "type" ?
                        <InfoContent>{card.methodType}</InfoContent>
                        : null
                    }
                </InfoMatrix>
                <InfoMatrix onClick={() => handleClick("number")} style={{borderTop: '1px solid var(--dark-grey', borderBottom: '1px solid var(--dark-grey)'}}>
                    <InfoHeader>Card Number</InfoHeader>
                    {
                        active === "number" ?
                        <EditCard mode={active} active={handleReset} data={card} parentCardData={updateCard}/> :
                        active !== "number" ?
                        <InfoContent>{card.cardNumber}</InfoContent> :
                        null
                    }
                </InfoMatrix>
                <InfoMatrix onClick={() => handleClick("expiry")} style={{borderRadius: "0 0 20px 20px"}}>
                    <InfoHeader>Expiry Date</InfoHeader>
                    {
                        active === "expiry" ?
                        <EditCard mode={active} active={handleReset} data={card} parentCardData={updateCard}/> :
                        active !== "expiry" ?
                        <InfoContent>{card.expiryMonth} / {card.expiryYear}</InfoContent> :
                        null
                    }
                </InfoMatrix>
            </InfoWrapper>
            <Bottom>
                <SubmitButton onClick={updateDatabase}>Submit</SubmitButton>
                <DeleteCardButton onClick={() => deleteCard(card.methodID)}>Delete card</DeleteCardButton>
            </Bottom>
        </FormContainer>
    )
}


const EditCard = ({mode, active, data, parentCardData}) => {
    
    const [card, setCard] = useState(data)

    const handleChange = (e) => {
        setCard((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log({card})
    }
    
    const handleEditSubmit = (e) => {
        e.stopPropagation();
        active("")
        parentCardData(card)
        // console.log("helo")
    }

    return (
        <EditCardContainer>
            {
                mode === "type" ?
                <EditWrapper>
                    <Dropdown onChange={handleChange} name="methodType">
                        <option>Choose type</option>
                        {cardTypes.map((type, key) => (
                            <option key={key}>{type}</option>
                        ))}
                    </Dropdown>
                    <SubmitEditButton onClick={handleEditSubmit}>submit</SubmitEditButton>
                </EditWrapper>
                : 
                mode === "number" ?
                <EditWrapper>
                    <input style={{width: "60%"}} type="text" onChange={handleChange} name="cardNumber"/>
                    <SubmitEditButton onClick={handleEditSubmit}>submit</SubmitEditButton>
                </EditWrapper> 
                : 
                mode === "expiry" ?
                <EditWrapper>
                    <DropdownContainer>
                        <DropWrapper>
                            <Dropdown onChange={handleChange} name="expiryMonth">
                                <option>Expiry month</option>
                                {
                                    months.map((month, key) => (
                                        <option key={key}>{month}</option>
                                    ))
                                }
                            </Dropdown>
                        </DropWrapper>
                        <DropWrapper>
                            <Dropdown onChange={handleChange} name="expiryYear">
                                <option>Expiry year</option>
                                {years.map((year, key) => (
                                    <option>{year}</option>
                                ))}
                            </Dropdown>
                        </DropWrapper>
                    </DropdownContainer>
                    <SubmitEditButton onClick={handleEditSubmit}>Submit</SubmitEditButton>
                </EditWrapper> :
                null
            }
        </EditCardContainer>
    )
}

export default EditPaymentForm
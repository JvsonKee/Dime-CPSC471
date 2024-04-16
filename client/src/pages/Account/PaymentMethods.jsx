import React, { createContext, useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { UserContext } from '../../App'
import { AddPaymentButton, CardsContainer, PaymentMethodsContainer } from './PaymentMethods.styled'
import PaymentCard from '../../components/PaymentCard'
import PopUp from '../../components/PopUp/PopUp'
import { Icon } from './Account.styled'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const PaymentContext = createContext()

const PaymentMethods = () => {
    const [user, setUser] = useContext(UserContext)
    const [paymentMethods, setPaymentMethods] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [mode, setMode] = useState("")

    const showPopUp = (m) => {
        setMode(m)
        setPopUp(true)
    }

    const handlePopUp = () => {
        setPopUp(false)
    }

    useEffect(() => {
        const fetchAllPaymentMethods = async () => {
            try{
                const res = await axios.get("http://localhost:8800/paymentmethods/" + user.userID)
                setPaymentMethods(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllPaymentMethods()
    }, [user.userID]);


    const updatePaymentMethodList = (data) => {
        const newList = [...paymentMethods, data]
        setPaymentMethods(newList)
    }

    return(
        <PaymentMethodsContainer>
            <PaymentContext.Provider value={[paymentMethods, setPaymentMethods]}>
                {popUp ? <PopUp mode={mode} popUp={handlePopUp} onUpdate={updatePaymentMethodList}/> : null}
                <AddPaymentButton onClick={() => showPopUp("payment")}><Icon icon={faPlus} /></AddPaymentButton>
                <CardsContainer>
                    {paymentMethods.map((data) => (
                        <PaymentCard key={data.methodID} methodID={data.methodID} methodType={data.methodType} cardNumber={data.cardNumber} expiryMonth={data.expiryMonth} expiryYear={data.expiryYear}/>
                    ))}
                </CardsContainer>
            </PaymentContext.Provider>
        </PaymentMethodsContainer>
    
)}

export default PaymentMethods
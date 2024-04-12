import React, { createContext, useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
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
                console.log("hello")
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


/* <div>
                <div className = "paymentmethods">
                    {paymentMethods.map((payment_methods)=>(
                        <div className = "paymentmethods" key={payment_methods.methodID}>
                            <h2>Type: {payment_methods.methodType}</h2>
                            {payment_methods.cardNumber && <h2>Card Number: {payment_methods.cardNumber}</h2>}
                            {payment_methods.expiryMonth && payment_methods.expiryYear && <h2>Expiry Date: {payment_methods.expiryMonth}/{payment_methods.expiryYear}</h2>}
                            <button>
                                <Link to="/editpaymentmethod" state= {{methodID: payment_methods.methodID}}>Edit</Link>
                            </button>
                            <button onClick = {()=>handleDelete(payment_methods.methodID)}>Delete</button>
                        </div>
                    ))}
                </div>
                <button>
                    <Link to="/newpaymentmethod">Create a new payment method</Link>
                </button>
                <button>
                    <Link to="/account">Return to Account page</Link>
                </button>
            </div> */
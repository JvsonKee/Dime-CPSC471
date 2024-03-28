import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const EditPaymentMethod = () => {
    const location = useLocation();

    const [invalidMethodType, setInvalidMethodType] = useState('')
    const [invalidCardNumber, setInvalidCardNumber] = useState('')
    const [invalidExpiryMonth, setInvalidExpiryMonth] = useState('')
    const [invalidExpiryYear, setInvalidExpiryYear] = useState('')
    const[paymentmethod,setPaymentMethod] = useState({
        pUserID: "",
        methodType:"",
        cardNumber:null,
        expiryMonth:null,
        expiryYear: null
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (paymentmethod.methodType === "") {
            setInvalidMethodType("Invalid method type.")
            valid = false;
        }

        if (paymentmethod.cardNumber === null) {
            setInvalidCardNumber("Invalid card number.")
            valid = false;
        }

        if (paymentmethod.expiryMonth === null) {
            setInvalidExpiryMonth("Invalid expiry month")
            valid = false;
        }

        if (paymentmethod.expiryYear === null) {
            setInvalidExpiryYear("Invalid expiry year.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setPaymentMethod((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/editpaymentmethod/"+ location.state.userID, paymentmethod)
                navigate("/paymentmethods", {state: {userID: location.state.userID, accountType: location.state.accountType}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(paymentmethod)

    return <div>
    <div className = 'paymentMethodForm'>
        <h1>Enter new payment method information. Leave blank if not applicable.</h1>

        <h1>Method type</h1>
        {invalidMethodType && <div>{invalidMethodType}</div>}
        <input type = "text" onChange = {handleChange} name = "methodType"/>

        <h1>Card Number</h1>
        {invalidCardNumber && <div>{invalidCardNumber}</div>}
        <input type = "number" onChange = {handleChange} name = "cardNumber"/>

        <h1>Expiry Month</h1>
        {invalidExpiryMonth && <div>{invalidExpiryMonth}</div>}
        <input type = "number" onChange = {handleChange} name = "expiryMonth"/>

        <h1>Expiry Year</h1>
        {invalidExpiryYear && <div>{invalidExpiryYear}</div>}
        <input type = "number" onChange = {handleChange} name = "expiryYear"/>
    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default EditPaymentMethod
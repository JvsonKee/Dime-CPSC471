import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';

const PaymentMethodNew = () => {
    const [user, setUser] = useContext(UserContext)  
    const location = useLocation();

    const [invalidMethodType, setInvalidMethodType] = useState('')
    const[paymentmethod,setPaymentMethod] = useState({
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

        return valid
    }

    const handleChange = (e) =>{
        setPaymentMethod((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/newpaymentmethod/"+ user.userID, paymentmethod)
                navigate("/paymentmethods")
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(paymentmethod)

    return <div>
    <div className = 'paymentMethodForm'>
        <h1>Enter new payment method information.</h1>

        <h1>Method type</h1>
        {invalidMethodType && <div>{invalidMethodType}</div>}
        <input type = "text" onChange = {handleChange} name = "methodType"/>

        <h1>Card Number</h1>
        <input type = "number" onChange = {handleChange} name = "cardNumber"/>

        <h1>Expiry Month</h1>
        <input type = "number" onChange = {handleChange} name = "expiryMonth"/>

        <h1>Expiry Year</h1>
        <input type = "number" onChange = {handleChange} name = "expiryYear"/>
    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default PaymentMethodNew
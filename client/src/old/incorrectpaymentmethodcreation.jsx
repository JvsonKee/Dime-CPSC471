import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'

const IncorrectPaymentMethodCreation = () => {
    const[paymentmethod,setPaymentMethod] = useState({
        pUserID: "",
        methodType:"",
        cardNumber:null,
        expiryMonth:null,
        expiryYear: null
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setPaymentMethod((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/incorrectpaymentmethodcreation",paymentmethod)
            navigate("/paymentmethod")
        }catch (err) {
            console.log(err)
        }
    }
    console.log(paymentmethod)

    return <div>
    <div className = 'paymentMethodForm'>
        <h1>Please specify all required fields. Leave blank if not applicable.</h1>
        <h1>Method type</h1>
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

export default IncorrectPaymentMethodCreation
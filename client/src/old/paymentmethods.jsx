import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const PaymentMethods = () => {
    const [paymentmethods, setPaymentMethods] = useState([])

    useEffect(() => {
        const fetchAllPaymentMethods = async () => {
            try{
                const res = await axios.get("http://localhost:8800/paymentmethods")
                setPaymentMethods(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllPaymentMethods()
    },[])
    return(
        <div>
            <h1>Payment Methods</h1>
            <div className = "paymentmethods">
                {paymentmethods.map((payment_methods)=>(
                    <div className = "paymentmethods" key={payment_methods.methodID}>
                        <h2>Type: {payment_methods.methodType}</h2>
                        {payment_methods.cardNumber && <h2>Card Number: {payment_methods.cardNumber}</h2>}
                        {payment_methods.expiryMonth && payment_methods.expiryYear && <h2>Expiry Date: {payment_methods.expiryMonth}/{payment_methods.expiryYear}</h2>}
                        <button>
                            <Link to ="/editpaymentmethod">Edit</Link>
                        </button>
                        <button>
                            <Link to ="/paymentmethods">Delete</Link>
                        </button>
                    </div>
                ))}
        </div>
        <button>
            <Link to ="/newpaymentmethod">Create a new payment method</Link>
        </button>
        <button>
            <Link to ="/home/standard">Return to Account page</Link>
        </button>
    </div>
)}

export default PaymentMethods
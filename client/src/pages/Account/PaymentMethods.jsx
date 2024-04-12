import React, { useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'

const PaymentMethods = () => {
    const [user, setUser] = useContext(UserContext)
    const [paymentmethods, setPaymentMethods] = useState([])

    const navigate = useNavigate()
    const location = useLocation();

    const handleDelete = async(payment) => {
        try{
            await axios.delete("http://localhost:8800/deletepayment/" + payment);
            navigate("/paymentmethods")
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllPaymentMethods = async () => {
            try{
                const res = await axios.get("http://localhost:8800/paymentmethods/" + user.userID)
                setPaymentMethods(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllPaymentMethods()
    },[user.userID])
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
    </div>
)}

export default PaymentMethods
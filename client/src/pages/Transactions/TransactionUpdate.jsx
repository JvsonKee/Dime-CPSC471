import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const UpdateTransaction = () => {
    const location = useLocation();
    let user = location.state.account;

    //need to get this user's payment methods from payment_methods table and have it as a drop down menu
    //then update this transaction ID to payment method ID in covers table
    const [invalidTitle, setInvalidTitle] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')

    const[transaction,setTransaction] = useState({
        title:"",
        amount:"",
        tDay:"",
        tMonth:"",
        tDay:""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (transaction.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (transaction.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }
        if (transaction.tDay === "") {
            setInvalidDay("Invalid day.")
            valid = false;
        }
        if (transaction.tMonth === "") {
            setInvalidMonth("Invalid month.")
            valid = false;
        }
        if (transaction.tYear === "") {
            setInvalidYear("Invalid year.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setTransaction((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/updatetransaction/"+ location.state.transactionID, transaction)
                navigate("/transactions", {state: {account: user}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(transaction)

    return <div>
    <div className = 'transactionForm'>
        <h1>Enter updated transaction information.</h1>

        <h1>Title</h1>
        {invalidTitle && <div>{invalidTitle}</div>}
        <input type = "text" onChange = {handleChange} name = "title"/>

        <h1>Amount</h1>
        {invalidAmount && <div>{invalidAmount}</div>}
        <input type = "number" onChange = {handleChange} name = "amount"/>

        <h1>Day</h1>
        {invalidDay && <div>{invalidDay}</div>}
        <input type = "number" onChange = {handleChange} name = "tDay"/>

        <h1>Month</h1>
        {invalidMonth && <div>{invalidMonth}</div>}
        <input type = "number" onChange = {handleChange} name = "tMonth"/>
        
        <h1>Year</h1>
        {invalidYear && <div>{invalidYear}</div>}
        <input type = "number" onChange = {handleChange} name = "tYear"/>
    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default UpdateTransaction
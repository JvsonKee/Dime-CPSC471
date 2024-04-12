import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const ReceiptNew = () => {
    const location = useLocation();
    let user = location.state.account;

    const [invalidImage, setInvalidImage] = useState('')

    const[receipt,setReceipt] = useState({
        image:"",
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (receipt.image === "") {
            setInvalidImage("Invalid image.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setReceipt((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/newreceipt/"+ location.state.transactionID, receipt)
                navigate("/receipts", {state: {account: user, transactionID: location.state.transactionID, transactions: location.state.transactions}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(receipt)

    return <div>
    <div className = 'receiptForm'>
        <h1>Upload new receipt image.</h1>

        <h1>Image</h1>
        {invalidImage && <div>{invalidImage}</div>}
        <input type = "text" onChange = {handleChange} name = "image"/>

    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default ReceiptNew
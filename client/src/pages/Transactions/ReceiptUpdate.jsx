import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';

const UpdateReceipt = () => {
    const [user, useState] = useContext(UserContext)
    const location = useLocation();

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
                await axios.put("http://localhost:8800/updatereceipt/"+ location.state.receiptID, receipt)
                navigate("/receipts", {state: {transactionID: location.state.transactionID}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(receipt)

    return <div>
    <div className = 'receiptForm'>
        <h1>Upload updated receipt image.</h1>

        <h1>Image</h1>
        {invalidImage && <div>{invalidImage}</div>}
        <input type = "text" onChange = {handleChange} name = "image"/>

    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default UpdateReceipt
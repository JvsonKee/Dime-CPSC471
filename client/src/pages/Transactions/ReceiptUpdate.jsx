import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { ReceiptForm, Title, FormGroup, Label, Input, Select, Button } from './ReceiptUpdate.styled';

const UpdateReceipt = () => {
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
                await axios.put("http://localhost:8800/updatereceipt/"+ location.state.receiptID, receipt)
                navigate("/receipts", {state: {account: user, transactionID: location.state.transactionID, transactions: location.state.transactions}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(receipt)

    return (
        <ReceiptForm>
            <Title>Upload updated receipt image.</Title>
            <FormGroup>
                {invalidImage && <div>{invalidImage}</div>}
                <input type = "text" onChange = {handleChange} name = "image"/>
            </FormGroup>
            <Button onClick = {handleClick}>Submit </Button>
        </ReceiptForm>
    )
}

export default UpdateReceipt
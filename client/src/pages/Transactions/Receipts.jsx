import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { ReceiptContainer, ReceiptItem, ReceiptButton, ButtonContainer, Title } from './Receipt.styled';

const Receipts = () => {
    const [receipts, setReceipts] = useState([])

    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;

    const handleDelete = async(receipt) => {
        try{
            await axios.delete("http://localhost:8800/deletereceipt/" + receipt);
            navigate("/receipts", {state: {account: user, transactionID: location.state.transactionID, transactions: location.state.transactions}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllReceipts = async () => {
            try{
                const res = await axios.get("http://localhost:8800/receipts/" + location.state.transactionID)
                setReceipts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllReceipts()
    },[location.state.transactionID])

    return(
        <ReceiptContainer>
            <Title>Receipts</Title>
            {receipts.map((receipts)=>(
                <ReceiptItem key={receipts.receiptID}>
                    <h2>Receipts</h2>
                    <ReceiptButton>
                        <Link to="/updatereceipt" state= {{account: user, transactionID: location.state.transactionID, receiptID: receipts.receiptID, transactions: location.state.transactions}}>Update</Link>
                    </ReceiptButton>
                    <ReceiptButton onClick = {()=>handleDelete(receipts.receiptID)}>Delete</ReceiptButton>
                </ReceiptItem>
            ))}
            <ButtonContainer>
                <ReceiptButton>
                    <Link to="/newreceipt" state= {{account: user, transactionID: location.state.transactionID, transactions: location.state.transactions}}>Upload a new receipt</Link>
                </ReceiptButton>
                <ReceiptButton>
                    <Link to="/transactions" state= {{account: user, transactions: location.state.transactions}}>Return to Transactions</Link>
                </ReceiptButton>
            </ButtonContainer>
        </ReceiptContainer>
)}

export default Receipts
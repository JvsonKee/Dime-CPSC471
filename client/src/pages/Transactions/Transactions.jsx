import React, { useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'
import { TransactionsContainer, TransactionItem, TransactionButton, ButtonContainer, Title } from './Transactions.styled';

const Transactions = () => {
    const [user, setUser] = useContext(UserContext)
    const [transactions, setTransactions] = useState([])

    const navigate = useNavigate()
    const location = useLocation();

    const handleDelete = async(transaction) => {
        try{
            await axios.delete("http://localhost:8800/deletetransaction/" + transaction);
            navigate("/transactions")
        }catch(err) {
            console.log(err)
        }
    }

    const handleReceipt = async(transaction) =>{
        navigate("/receipts", {state: {account:user, transactionID: transaction}})
    }
    
    useEffect(() => {
        const fetchAllTransaction = async () => {
            try{
                const res = await axios.get("http://localhost:8800/transactions/" + user.userID)
                setTransactions(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllTransaction()
    },[user.userID])
    return (
        <TransactionsContainer>
            <Title>Transactions</Title>
            {transactions.map((transaction) => (
                <TransactionItem key={transaction.transactionID}>
                    <h2>Title: {transaction.title}</h2>
                    <h2>Payment Method: {transaction.payment_method}</h2>
                    <h2>Amount: ${transaction.amount}</h2>
                    <h2>Date: {transaction.tDay} / {transaction.tMonth} / {transaction.tYear}</h2>
                    <TransactionButton>
                        <Link to="/updatetransaction" state={{ transactionID: transaction.transactionID }}>Update</Link>
                    </TransactionButton>
                    <TransactionButton onClick={() => handleDelete(transaction.transactionID)}>Delete</TransactionButton>
                    <TransactionButton onClick={() => handleReceipt(transaction.transactionID)}>View receipts</TransactionButton>
                </TransactionItem>
            ))}
            <ButtonContainer>
                <TransactionButton>
                    <Link to="/newtransaction">New Transaction</Link>
                </TransactionButton>
                <TransactionButton>
                    <Link to="/home">Return Home</Link>
                </TransactionButton>
            </ButtonContainer>
        </TransactionsContainer>
    );
}

export default Transactions;
import React, { useContext } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'
import { TransactionsContainer, TransactionItem, TransactionButton, ButtonContainer, Title } from './Transactions.styled';

const Transactions = () => {
    const [user, setUser] = useContext(UserContext)
  

    const navigate = useNavigate()
    const location = useLocation();

    let transactions = location.state.transactions
    const handleDelete = async(transaction) => {
        try{
            await axios.delete("http://localhost:8800/deletetransaction/" + transaction);
            let j = 0
            for (let i = 0; i < location.state.transactions.length;  i++) {
                if (location.state.transactions[i].transactionID === parseInt(transaction)) {
                    j = i
                    break
                }
            }
            console.log(j)
            location.state.transactions.splice(j,1)
            navigate("/transactions", {state: {account: user, transactions: location.state.transactions}})
        }catch(err) {
            console.log(err)
        }
    }

    const handleReceipt = async(transaction) =>{
        navigate("/receipts", {state: {account:user, transactions: location.state.transactions, transactionID: transaction}})
    }
    
    return (
        <TransactionsContainer>
            <Title>Transactions</Title>
            {transactions.map((transactions) => (
                <TransactionItem key={transactions.transactionID}>
                    <h2>Title: {transactions.title}</h2>
                    <h2>Payment Method: {transactions.payment_name}</h2>
                    <h2>Amount: ${transactions.amount}</h2>
                    <h2>Date: {transactions.tDay} / {transactions.tMonth} / {transactions.tYear}</h2>
                    <TransactionButton>
                        <Link to="/updatetransaction" state= {{account: user, transactions: location.state.transactions, transactionID: transactions.transactionID}}>Update</Link>
                    </TransactionButton>
                    <TransactionButton onClick={() => handleDelete(transactions.transactionID)}>Delete</TransactionButton>
                    <TransactionButton onClick={() => handleReceipt(transactions.transactionID)}>View receipts</TransactionButton>
                </TransactionItem>
            ))}
            <ButtonContainer>
                <TransactionButton>
                    <Link to="/newtransaction" state= {{account: user, transactions: location.state.transactions}}>Create a transaction</Link>
                </TransactionButton>
                <TransactionButton>
                    <Link to="/home">Return Home</Link>
                </TransactionButton>
            </ButtonContainer>
        </TransactionsContainer>
    );
}

export default Transactions;
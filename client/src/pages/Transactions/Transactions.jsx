import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'
import { TransactionsContainer, TransactionItem, TransactionButton, ButtonContainer, Title, ItemContainer, Top, TName, TPrice, Mid, Bottom, StyledLink, TotalSpent } from './Transactions.styled';
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers';
import NavBar from '../../components/NavBar';

export const TransactionContext = createContext();

const Transactions = () => {
    const [user, setUser] = useContext(UserContext)
    const [transactions, setTransactions] = useState([])
    const [totalSpent, setTotalSpent] = useState(0)
    var transaction_pass = []
    var transaction_id = 0

    const navigate = useNavigate()

    const fetchTransaction = async() => {
        try{
            const res = await axios.get("http://localhost:8800/prefilltransaction/" + transaction_id)
            transaction_pass = res.data
            console.log(transaction_pass)
        }catch(err){
            console.log(err)
        }
    }
    function setTransactionVar(transactionID) {
        transaction_id = transactionID
        fetchTransaction().then(() => navigate("/updatetransaction", {state: {account:user, transactionID: transaction_id, transactionPass: transaction_pass}}))
    }

    useEffect(() => {
        const getTotalSpent = async () => {
            try {
                const res = await axios.get("http://localhost:8800/sumtransactions/" + user.userID)
                setTotalSpent(res.data[0].total)
            } catch (err) {
                console.log(err)
            }
        }
        getTotalSpent()
    }, [user.userID])

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:8800/transactionswithpaymenttitle/" + user.userID)
                setTransactions(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getTransactions()
    },[user.userID])

    const handleDelete = async(transaction) => {
        try{
            await axios.delete("http://localhost:8800/deletetransaction/" + transaction);
            setTransactions(transactions => transactions.filter(item => item.transactionID !== transaction));
        }catch(err) {
            console.log(err)
        }
    }

    const handleReceipt = async(transaction) =>{
        navigate("/receipts", {state: {transactionID: transaction}})
    }
    
    return (
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <TransactionContext.Provider value={[transactions, setTransactions]}>
                        <TransactionsContainer>
                            <Title>Transactions</Title>
                            <TotalSpent>Total Spent: <span>${totalSpent}</span></TotalSpent>
                            <ItemContainer>
                                {transactions.map((transaction) => (
                                    <TransactionItem key={transaction.transactionID}>
                                        <Top>
                                            <TName>{transaction.title}</TName>
                                            <TPrice>${transaction.amount}</TPrice>
                                        </Top>
                                        <Mid>
                                            <div>{transaction.methodType}</div>
                                            <div>{transaction.tDay} / {transaction.tMonth} / {transaction.tYear}</div>
                                        </Mid>
                                        <Bottom>
                                            <TransactionButton onClick = {()=>setTransactionVar(transaction.transactionID)}>Edit
                                            </TransactionButton>
                                            <TransactionButton style={{backgroundColor: 'var(--red)'}} onClick={() => handleDelete(transaction.transactionID)}>Delete</TransactionButton>
                                            <TransactionButton onClick={() => handleReceipt(transaction.transactionID)}>View receipts</TransactionButton>
                                        </Bottom>
                                    </TransactionItem>
                                ))}
                            </ItemContainer>
                            <ButtonContainer>
                                <TransactionButton>
                                    <Link style={{color: 'white', textDecoration: 'none'}} to="/newtransaction">Add Transaction</Link>
                                </TransactionButton>
                            </ButtonContainer>
                        </TransactionsContainer>
                    </TransactionContext.Provider>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
    );
}

export default Transactions;
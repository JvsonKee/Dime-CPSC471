import React, { useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'

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
    return(
        <div>
            <h1>Transactions</h1>
            <div className = "transactions">
                {transactions.map((transactions)=>(
                    <div className = "transactions" key={transactions.transactionID}>
                        <h2>Title: {transactions.title}</h2>
                        <h2>Payment method: {transactions.payment_method} </h2>
                        <h2>Amount: {transactions.amount}</h2>
                        <h2>Date: {transactions.tDay} / {transactions.tMonth} / {transactions.tYear}</h2>
                        <button>
                            <Link to="/updatetransaction" state= {{transactionID: transactions.transactionID}}>Update</Link>
                        </button>
                        <button onClick = {()=>handleDelete(transactions.transactionID)}>Delete</button>
                        <button onClick = {()=>handleReceipt(transactions.transactionID)}>View receipts</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/newtransaction">Create a transaction</Link>
        </button>
        <button>
            <Link to="/home">Return to home page</Link>
        </button>
    </div>
)}

export default Transactions
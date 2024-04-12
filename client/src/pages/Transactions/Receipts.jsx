import React, { useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'

const Receipts = () => {
    const [user, setUser] = useContext(UserContext)
    const [receipts, setReceipts] = useState([])

    const navigate = useNavigate()
    const location = useLocation();

    const handleDelete = async(receipt) => {
        try{
            await axios.delete("http://localhost:8800/deletereceipt/" + receipt);
            navigate("/receipts", {state: {transactionID: location.state.transactionID}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllReceipts = async () => {
            try{
                const res = await axios.get("http://localhost:8800/receipts/" + location.state.transactionID)
                setReceipts(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllReceipts()
    },[location.state.transactionID])
    return(
        <div>
            <h1>Receipts</h1>
            <div className = "receipts">
                {receipts.map((receipts)=>(
                    <div className = "receipts" key={receipts.receiptID}>
                        <h2>Receipts</h2>
                        <button>
                            <Link to="/updatereceipt" state= {{transactionID: location.state.transactionID, receiptID: receipts.receiptID}}>Update</Link>
                        </button>
                        <button onClick = {()=>handleDelete(receipts.receiptID)}>Delete</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/newreceipt" state= {{transactionID: location.state.transactionID}}>Upload a new receipt</Link>
        </button>
        <button>
            <Link to="/transactions">Return to Transactions</Link>
        </button>
    </div>
)}

export default Receipts
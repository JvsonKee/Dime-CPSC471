import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Income = () => {
    const [income, setIncome] = useState([])

    useEffect(() => {
        const fetchAllIncome = async () => {
            try{
                const res = await axios.get("http://localhost:8800/income")
                setIncome(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllIncome()
    },[])
    return(
        <div>
            <h1>Income</h1>
            <div className = "income">
                {income.map((income)=>(
                    <div className = "income" key={income.incomeID}>
                        <h2>Source: {income.incomeSource}</h2>
                        <h2>Amount: {income.incomeAmount}</h2>
                        <h2>Last Received: {income.lastReceivedDay}/{income.lastReceivedMonth}/{income.lastReceivedYear}</h2>
                        <h2>Receive every: {income.receiveEvery}</h2>
                        <button>
                            <Link to ="/editincome">Edit</Link>
                        </button>
                        <button>
                            <Link to ="/income">Delete</Link>
                        </button>
                    </div>
                ))}
        </div>
        <button>
            <Link to ="/newincome">Create a new income source</Link>
        </button>
        <button>
            <Link to ="/home/standard">Return to Account page</Link>
        </button>
    </div>
)}

export default Income
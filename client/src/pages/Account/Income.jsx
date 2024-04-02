import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Income = () => {
    const [income, setIncome] = useState([]);
    
    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;
    
    const handleDelete = async(income) => {
        try{
            await axios.delete("http://localhost:8800/deleteincome/" + income);
            navigate("/income", {state: {account: user}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllIncome = async () => {
            try{
                const res = await axios.get("http://localhost:8800/income/" + user.userID)
                setIncome(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllIncome()
    },[user.userID])


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
                            <Link to="/editincome" state= {{account: user, incomeID: income.incomeID}}>Edit</Link>
                        </button>
                        <button onClick = {()=>handleDelete(income.incomeID)}>Delete</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/newincome" state= {{account:user}}>Create a new income source</Link>
        </button>
        <button>
            <Link to="/account" state= {{account: user}}>Return to Account page</Link>
        </button>
    </div>
)}

export default Income
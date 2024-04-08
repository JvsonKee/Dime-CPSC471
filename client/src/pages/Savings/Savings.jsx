import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Savings = () => {
    const [savings, setSavings] = useState([])
    

    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;
    const handleDelete = async(savings) => {
        try{
            await axios.delete("http://localhost:8800/deletesavings/" + savings);
            navigate("/savings", {state: {account: user}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllSavings= async () => {
            try{
                const res = await axios.get("http://localhost:8800/savings/" + user.userID)
                setSavings(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllSavings()
    },[user.userID])
    return(
        <div>
            <h1>Savings</h1>
            <div className = "savings">
                {savings.map((savings)=>(
                    <div className = "savings" key={savings.savingsID}>
                        <h2>Title: {savings.title}</h2>
                        {savings.description && <h2>Description: {savings.description}</h2>}
                        <h2>Amount: {savings.amount}</h2>
                        <button>
                            <Link to="/updatesavings" state= {{account:user, savingsID: savings.savingsID}}>Update</Link>
                        </button>
                        <button onClick = {()=>handleDelete(savings.savingsID)}>Delete</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/newsavings" state= {{account: user}}>Create a new savings profile</Link>
        </button>
        <button>
            <Link to="/home" state= {{account:user}}>Return to homepage</Link>
        </button>
    </div>
)}

export default Savings
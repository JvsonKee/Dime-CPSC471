import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Goals = () => {
    const [goals, setGoals] = useState([])

    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;

    const handleDelete = async(goals) => {
        try{
            await axios.delete("http://localhost:8800/deletegoal/" + goals);
            navigate("/goals", {state: {account: user}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllGoals = async () => {
            try{
                const res = await axios.get("http://localhost:8800/goals/" + user.userID)
                setGoals(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllGoals()
    },[user.userID])
    return(
        <div>
            <h1>Savings goals</h1>
            <div className = "goals">
                {goals.map((goals)=>(
                    <div className = "goals" key={goals.goalID}>
                        <h2>Title: {goals.title}</h2>
                        {goals.description && <h2>Description: {goals.description}</h2>}
                        <h2>Target amount: {goals.amount}</h2>
                        <h2>Target date: {goals.gDay} / {goals.gMonth} / {goals.gYear}</h2>
                        <button>
                            <Link to="/updategoals" state= {{account: user, goalID: goals.goalID}}>Update</Link>
                        </button>
                        <button onClick = {()=>handleDelete(goals.goalID)}>Delete</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/newgoals" state= {{account: user}}>Create a savings goal</Link>
        </button>
        <button>
            <Link to="/home" state= {{account: user}}>Return to homepage</Link>
        </button>
    </div>
)}

export default Goals
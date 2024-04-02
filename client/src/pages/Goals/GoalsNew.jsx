import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const GoalsNew = () => {
    const location = useLocation();
    let user = location.state.account;

    const [invalidTitle, setInvalidTitle] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')
 
    const[goal,setGoal] = useState({
        title:"",
        description:null,
        amount:"",
        gDay: "",
        gMonth:"",
        gYear:""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (goal.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (goal.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }

        if (goal.gDay === "") {
            setInvalidDay("Invalid day.")
            valid = false;
        }

        if (goal.gMonth === "") {
            setInvalidMonth("Invalid month.")
            valid = false;
        }

        if (goal.gYear === "") {
            setInvalidYear("Invalid year.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setGoal((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/newgoal/"+ user.userID, goal)
                navigate("/goals", {state: {account: user}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(goal)

    return <div>
    <div className = 'goalForm'>
        <h1>Enter new savings goal information.</h1>

        <h1>Title *</h1>
        {invalidTitle && <div>{invalidTitle}</div>}
        <input type = "text" onChange = {handleChange} name = "title"/>

        <h1>Description</h1>
        <input type = "text" onChange = {handleChange} name = "description"/>

        <h1>Amount *</h1>
        {invalidAmount && <div>{invalidAmount}</div>}
        <input type = "number" onChange = {handleChange} name = "amount"/>

        <h1>Target day *</h1>
        {invalidDay && <div>{invalidDay}</div>}
        <input type = "number" onChange = {handleChange} name = "gDay"/>

        <h1>Target month *</h1>
        {invalidMonth && <div>{invalidMonth}</div>}
        <input type = "number" onChange = {handleChange} name = "gMonth"/>

        <h1>Target year *</h1>
        {invalidYear && <div>{invalidYear}</div>}
        <input type = "number" onChange = {handleChange} name = "gYear"/>

    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default GoalsNew
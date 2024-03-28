import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'

const NewIncome = () => {
    const[income,setIncome] = useState({
        iUserID: "",
        incomeSource:"",
        incomeAmount:"",
        lastReceivedDay:"",
        lastReceivedMonth: "",
        lastReceivedYear: "",
        receiveEvery: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setIncome((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/newincome",income)
            navigate("/income")
        }catch (err) {
            console.log(err)
        }
    }
    console.log(income)

    return <div>
    <div className = 'incomeForm'>
        <h1>Enter new income source information.</h1>
        <h1>Source</h1>
        <input type = "text" onChange = {handleChange} name = "incomeSource"/>
        <h1>Amount</h1>
        <input type = "number" onChange = {handleChange} name = "incomeAmount"/>
        <h1>Last received day</h1>
        <input type = "number" onChange = {handleChange} name = "lastReceivedDay"/>
        <h1>Last received month</h1>
        <input type = "number" onChange = {handleChange} name = "lastReceivedMonth"/>
        <h1>Last received year</h1>
        <input type = "number" onChange = {handleChange} name = "lastReceivedYear"/>
        <h1>Receive every</h1>
        <input type = "text" onChange = {handleChange} name = "receiveEvery"/>
    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default NewIncome
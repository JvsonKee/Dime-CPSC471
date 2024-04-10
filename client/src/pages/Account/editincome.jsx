import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';

const EditIncome = () => {
    const [user, setUser] = useContext(UserContext)
    const [invalidIncomeSource, setInvalidIncomeSource] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')
    const [invalidFrequency, setInvalidFrequency] = useState('')

    const location = useLocation();
    // let user = location.state.account

    const[income,setIncome] = useState({
        incomeSource:"",
        incomeAmount:"",
        lastReceivedDay:"",
        lastReceivedMonth: "",
        lastReceivedYear: "",
        receiveEvery: ""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (income.incomeSource === "") {
            setInvalidIncomeSource("Invalid income source")
            valid = false;
        }

        if (income.incomeAmount === "") {
            setInvalidAmount("Invalid income amount")
            valid = false;
        }

        if (income.lastReceivedDay === "") {
            setInvalidDay("Invalid day")
            valid = false;
        }

        if (income.lastReceivedMonth === "") {
            setInvalidMonth("Invalid month")
            valid = false;
        }

        if (income.lastReceivedYear === "") {
            setInvalidYear("Invalid year")
            valid = false;
        }

        if (income.receiveEvery === "") {
            setInvalidFrequency("Invalid frequency")
            valid = false;
        }

        return valid;
    }

    const handleChange = (e) =>{
        setIncome((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/editincome/" + location.state.incomeID,income)
                navigate("/income")
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(income)

    return <div>
    <div className = 'incomeForm'>
        <h1>Enter updated income source information.</h1>

        <h1>Source *</h1>
        {invalidIncomeSource && <div>{invalidIncomeSource}</div>}
        <input type = "text" onChange = {handleChange} name = "incomeSource"/>

        <h1>Amount *</h1>
        {invalidAmount && <div>{invalidAmount}</div>}
        <input type = "number" onChange = {handleChange} name = "incomeAmount"/>
        
        <h1>Last received day *</h1>
        {invalidDay && <div>{invalidDay}</div>}
        <input type = "number" onChange = {handleChange} name = "lastReceivedDay"/>
        
        <h1>Last received month *</h1>
        {invalidMonth && <div>{invalidMonth}</div>}
        <input type = "number" onChange = {handleChange} name = "lastReceivedMonth"/>
        
        <h1>Last received year *</h1>
        {invalidYear && <div>{invalidYear}</div>}
        <input type = "number" onChange = {handleChange} name = "lastReceivedYear"/>
        
        <h1>Receive every *</h1>
        {invalidFrequency && <div>{invalidFrequency}</div>}
        <input type = "text" onChange = {handleChange} name = "receiveEvery"/>
    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default EditIncome
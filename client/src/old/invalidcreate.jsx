import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'

const InvalidCreate = () => {
    const[account,setAccount] = useState({
        fName:"",
        lName:"",
        email:"",
        password: "",
        premium: "",
        password2: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if ((account.password === account.password2) && ((account.premium === "n") || (account.premium === "y"))) {
            try{
                await axios.post("http://localhost:8800/createaccount",account)
                navigate("/")
            }catch (err) {
                console.log(err)
            }
        }
        else {
            navigate("/invalidcreate")
            window.location.reload()
        }
    }
    console.log(account)

    return <div>
    <div className = 'accountForm'>
        <h1>Error in form. Please enter information again.</h1>
        <h1>First Name</h1>
        <input type = "text" onChange = {handleChange} name = "fName"/>
        <h1>Last Name</h1>
        <input type = "text" onChange = {handleChange} name = "lName"/>
        <h1>Email</h1>
        <input type = "text" onChange = {handleChange} name = "email"/>
        <h1>Enter new password</h1>
        <input type = "text" onChange = {handleChange} name = "password"/>
        <h1>Confirm new password</h1>
        <input type = "text" onChange = {handleChange} name = "password2"/>
        <h1>Premium (y or n)</h1>
        <input type = "text" onChange = {handleChange} name = "premium"/>
    </div>
    <button onClick = {handleClick}>
        Create an account
    </button>
    </div>
}

export default InvalidCreate
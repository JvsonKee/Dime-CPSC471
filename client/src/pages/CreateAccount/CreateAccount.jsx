import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'

const CreateAccount = () => {

    const [invalidFName, setInvalidFName] = useState('')
    const [invalidLName, setInvalidLName] = useState('')
    const [invalidEmail, setInvalidEmail] = useState('')
    const [invalidPassword, setInvalidPassword] = useState('')
    const [invalidPasswordConfirm, setInvalidPasswordConfirm] = useState('')
    const [invalidStatus, setInvalidStatus] = useState('')
    const [account,setAccount] = useState({
        fName:"",
        lName:"",
        email:"",
        password: "",
        premium: "",
        passwordConfirm: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const validForm = () => {
        let valid = true
        
        if (account.fName === "") {
            setInvalidFName("Invalid first name.")
            valid = false
        }

        if (account.lName === "") {
            setInvalidLName("Invalid last name.")
            valid = false
        }

        if (account.email === "") {
            setInvalidEmail("Invalid email.")
            valid = false
        }

        if (account.password === "" || account.passwordConfirm === "") {
            setInvalidPassword("Invalid password.")
            valid = false
        }

        if (account.premium === "") {
            setInvalidStatus("Invalid account status")
            valid = false
        } 
        
        return valid;
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            if (account.password === account.passwordConfirm) {
                try{
                    await axios.post("http://localhost:8800/createaccount", account)
                    navigate("/")
                }catch (err) {
                    console.log(err)
                }
            } else {
                setInvalidPasswordConfirm("Passwords do not match. Please try again.")
            }
        }
    }
    console.log(account)


    return <div>
    <div className = 'accountForm'>
        <h1>Create an account</h1>

        <h1>First Name *</h1>
        {invalidFName && <div>{invalidFName}</div>}
        <input type = "text" onChange = {handleChange} name = "fName"/>

        <h1>Last Name *</h1>
        {invalidLName && <div>{invalidLName}</div>}
        <input type = "text" onChange = {handleChange} name = "lName"/>

        <h1>Email *</h1>
        {invalidEmail && <div>{invalidEmail}</div>}
        <input type = "text" onChange = {handleChange} name = "email"/>

        <h1>Enter new password *</h1>
        {invalidPassword && <div>{invalidPassword}</div>}
        <input type = "text" onChange = {handleChange} name = "password"/>

        <h1>Confirm new password *</h1>
        {invalidPassword && <div>{invalidPassword}</div>}
        <input type = "text" onChange = {handleChange} name = "passwordConfirm"/>
        {invalidPasswordConfirm && <div>{invalidPasswordConfirm}</div>}

        <h1>Premium (y or n) *</h1>
        {invalidStatus && <div>{invalidStatus}</div>}
        <input type = "text" onChange = {handleChange} name = "premium"/>
    </div>
    <button onClick = {handleClick}>
        Create an account
    </button>
    </div>
}

export default CreateAccount
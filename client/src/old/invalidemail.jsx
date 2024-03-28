import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import user from '../pages/global'

const InvalidEmail = () => {
    const[inputemail,inputEmail] = useState({
        email:"",
        email2:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        inputEmail((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        if (inputemail.email === inputemail.email2) {
            try{
                await axios.put("http://localhost:8800/updateemail/" + user.ID, inputemail)
                if (user.premium === "n") {
                    navigate("/account/standard")
                }
                else {
                    navigate("/account/premium")
                }
            }catch(err) {
                console.log(err)
            }
        }
        else {
            navigate("/invalidemail")
            window.location.reload()
        }
    }

    console.log(inputemail)

    return (
        <div className = 'UpdateEmail'>
            <h1>Emails do not match. Please enter email in again.</h1>
            <input type = "text" onChange={handleChange} name = "email"/>
            <h1>Confirm your new email</h1>
            <input type = "text" onChange={handleChange} name = "email2"/>
            <button onClick = {handleClick}>Update</button>
        </div>
    )
}

export default InvalidEmail
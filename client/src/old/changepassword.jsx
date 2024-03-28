import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import user from '../pages/global'

const ChangePassword = () => {

    const[inputpassword,inputPassword] = useState({
        password:"",
        password2:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        inputPassword((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        if (inputpassword.password === inputpassword.password2) {
            try{
                await axios.put("http://localhost:8800/changepassword/" + user.ID, inputpassword)
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
            navigate("/invalidpassword")
        }
    }

    console.log(inputpassword)

    return (
        <div className = 'UpdatePassword'>
            <h1>Enter your new password</h1>
            <input type = "text" onChange={handleChange} name = "password"/>
            <h1>Confirm your new password</h1>
            <input type = "text" onChange={handleChange} name = "password2"/>
            <button onClick = {handleClick}>Update</button>
        </div>
    )
}

export default ChangePassword
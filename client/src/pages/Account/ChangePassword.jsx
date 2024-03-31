import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const ChangePassword = () => {

    const [error, setError] = useState('')
    const[inputPassword, setInputPassword] = useState({
        password:"",
        password2:""
    })

    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;

    const handleChange = (e) => {
        setInputPassword((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()

        if (inputPassword.password === "" || inputPassword.password2 === "") {
            setError("Invalid password.")
        } else {
            if (inputPassword.password === inputPassword.password2) {
                try{
                    await axios.put("http://localhost:8800/changepassword/" + user.userID, inputPassword)
                    navigate("/account", {state: {account: user}})
                }catch(err) {
                    console.log(err)
                }
            }
            else {
                setError("Passwords do not match. Please try again")
            }
        }
    }

    console.log(inputPassword)

    return (
        <div className = 'UpdatePassword'>
            <h1>Enter your new password</h1>
            <input type = "text" onChange={handleChange} name = "password"/>

            <h1>Confirm your new password</h1>
            <input type = "text" onChange={handleChange} name = "password2"/>
            {error && <div>{error}</div>}

            <button onClick = {handleClick}>Update</button>
        </div>
    )
}

export default ChangePassword
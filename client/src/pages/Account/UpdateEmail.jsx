import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const UpdateEmail = () => {

    const [error, setError] = useState('')
    const[inputemail,inputEmail] = useState({
        email:"",
        email2:""
    })

    const navigate = useNavigate()
    const location = useLocation();

    let user = location.state.account;
    console.log(user)

    const handleChange = (e) => {
        inputEmail((prev)=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        if (inputemail.email === inputemail.email2) {
            try{
                await axios.put("http://localhost:8800/updateemail/" + user.userID, inputemail)
                navigate("/account", {state: {account: user}})
            }catch(err) {
                console.log(err)
            }
        }
        else {
            setError("Emails do not match. Please try again.")
        }
    }

    return (
        <div className = 'UpdateEmail'>
            <h1>Enter your new email</h1>
            <input type = "email" onChange={handleChange} name = "email"/>

            <h1>Confirm your new email</h1>
            <input type = "email" onChange={handleChange} name = "email2"/>
            {error && <div>{error}</div>}
            
            <button onClick = {handleClick}>Update</button>
        </div>
    )
}

export default UpdateEmail 
import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import user from '../pages/global'

const InvalidLogin = () => {
    user.ID = 0

    const[inputaccount,inputAccount] = useState({
        email:"",
        password: "",
    })

    var stored_account = []
    var run_now = false
    
    const handleChange = (e) =>{
        inputAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const navigate = useNavigate()

    const run = () => {
        run_now = true
    }

    const check = (props) => {
        user.ID = props.userID
        user.premium = props.premium
        console.log(user.ID)
        if (props.premium === 'n') {
            navigate("/home/standard");
        }
        else if (props.premium === 'y') {
            navigate("/home/premium");
        }
    }

    const refresh = () => {
        navigate("/invalidlogin")
        window.location.reload()
    }

    const fetchEP = async () => {
        try{
            const res = await axios.get("http://localhost:8800/", {params: inputaccount});
            stored_account = res.data
            console.log(stored_account)
            console.log(stored_account[0]);
            (run_now === true) ? ((stored_account[0] !== undefined) ? check(stored_account[0]) : refresh()) : run_now = false;
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchEP()
    })
    
    return <div>
    <div className = 'accountForm'>
        <h1>Email or password is incorrect. Please try to log in again.</h1>
        <h1>Email</h1>
        <input type = "text" onChange = {handleChange} name = "email"/>
        <h1>Password</h1>
        <input type = "text" onChange = {handleChange} name = "password"/>
    </div>
    <button onClick = {() => {
          run();
          fetchEP();
        }}>
        Log in
    </button>
    </div>
}

export default InvalidLogin
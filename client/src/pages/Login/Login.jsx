import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {

    const errorMessage = "Email or password is incorrect. Please try again."

    const [invalidLogin, setInvalidLogin] = useState('');
    const[inputAccount,setInputAccount] = useState({
        email:"",
        password: "",
    })

    let stored_account = []
    let run_now = false
    
    const handleChange = (e) =>{
        setInputAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const navigate = useNavigate()

    const run = () => {
        run_now = true
    }

    const check = (props) => {
        navigate("/home", {state: {userID: props.userID, accountType: props.premium}})
    }
    
    const fetchEP = async () => {
        try {
            const res = await axios.get("http://localhost:8800/", {params: inputAccount});
            stored_account = res.data
            console.log(stored_account);
            console.log(stored_account[0]);
            (run_now === true) ? ((stored_account[0] !== undefined) ? check(stored_account[0]) : setInvalidLogin(errorMessage)) : run_now = false;
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchEP()
    })
    
    return <div>
    <div className = 'accountForm'>
        <h1>Log in</h1>
        <h1>Email</h1>
        <input type = "text" onChange = {handleChange} name = "email"/>
        <h1>Password</h1>
        <input type = "text" onChange = {handleChange} name = "password"/>
        {invalidLogin && <div>{invalidLogin}</div>}
    </div>
    <button onClick = {() => {
          run();
          fetchEP();
        }}>
        Log in
    </button>
    <button>
        <Link to ="/createAccount">Create an account</Link>
    </button>
    </div>
}

export default Login
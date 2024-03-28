import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import user from '../pages/global'
import { useNavigate } from "react-router-dom"


const AccountPremium = () => {
    const navigate = useNavigate()

    const handleDelete = async() => {
        try{
            await axios.delete("http://localhost:8800/deleted/" + user.ID);
            navigate("/deleted")
        }catch(err) {
            console.log(err)
        }
    }

    const premium_status = {premium:"n"}

    const handleClick = async e =>{
        e.preventDefault()
        user.premium = "n"
        await axios.put("http://localhost:8800/updatepremium/" + user.ID, premium_status)
        navigate("/standardchange")
    }

    return <div>
    <button>
        <Link to ="/home/">Return to homepage</Link>
    </button>
    <button>
        <Link to ="/updateemail">Update my email</Link>
    </button>
    <button>
        <Link to ="/changepassword">Change my password</Link>
    </button>
    <button>
        <Link to ="/income">View income</Link>
    </button>
    <button>
        <Link to ="/paymentmethods">View payment methods</Link>
    </button>
    <button onClick = {()=>handleDelete()}>Delete my account</button>
    <button onClick = {handleClick}>Become a Standard User</button>
    </div>
}

export default AccountPremium
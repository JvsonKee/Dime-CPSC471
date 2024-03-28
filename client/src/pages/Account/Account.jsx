import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';


const Account = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const handleDelete = async() => {
        try{
            await axios.delete("http://localhost:8800/deleted/" + location.state.userID);
            navigate("/deleted")
        }catch(err) {
            console.log(err)
        }
    }

    const premiumToStandard = async e =>{
        e.preventDefault()
        location.state.accountType = "n"
        await axios.put("http://localhost:8800/updatepremium/" + location.state.userID, {premium:"n"})
        navigate("/standardchange", {state: {userID: location.state.userID, accountType: location.state.accountType}})
    }

    const standardToPremium = async e => {
        e.preventDefault()
        location.state.accountType = "y"
        await axios.put("http://localhost:8800/updatepremium/" + location.state.userID, {premium:"y"})
        navigate("/premiumchange", {state: {userID: location.state.userID, accountType: location.state.accountType}})
    }

    return (
        <div>
            <div>USER: {location.state.userID}</div>
            <button>
                <Link to="/home" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Return to homepage</Link>
            </button>
            <button>
                <Link to="/updateemail" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Update my email</Link>
            </button>
            <button>
                <Link to="/changepassword" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Change my password</Link>
            </button>
            <button>
                <Link to="/income" state= {{userID: location.state.userID, accountType: location.state.accountType}}>View income</Link>
            </button>
            <button>
                <Link to="/paymentmethods" state= {{userID: location.state.userID, accountType: location.state.accountType}}>View payment methods</Link>
            </button>
            <button onClick = {()=>handleDelete()}>Delete my account</button>
            {
                location.state.accountType === "y" ? <button onClick={premiumToStandard}>Become a Standard User</button> : 
                location.state.accountType === "n" ? <button onClick={standardToPremium}>Become a Premium User</button> : null
            }
        </div>
    )
}

export default Account
import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { PageContainer, MainContainer } from '../../styles/Containers';


const Account = () => {
    const navigate = useNavigate()
    const location = useLocation()

    let user = location.state.account

    console.log(user)

    const handleDelete = async() => {
        try{
            await axios.delete("http://localhost:8800/deleted/" + user.userID);
            navigate("/deleted")
        }catch(err) {
            console.log(err)
        }
    }

    const premiumToStandard = async e =>{
        e.preventDefault()
        user.premium = "n"
        await axios.put("http://localhost:8800/updatepremium/" + user.userID, {premium:"n"})
        navigate("/standardchange", {state: {account: user}})
    }

    const standardToPremium = async e => {
        e.preventDefault()
        user.premium = "y"
        await axios.put("http://localhost:8800/updatepremium/" + user.userID, {premium:"y"})
        navigate("/premiumchange", {state: {account: user}})
    }

    return (
        <PageContainer>
            <NavBar account={user}/>
            <MainContainer>
                <div>Welcome, {user.fName}</div>
                <button>
                    <Link to="/home" state= {{account: user}}>Return to homepage</Link>
                </button>
                <button>
                    <Link to="/updateemail" state= {{account: user}}>Update my email</Link>
                </button>
                <button>
                    <Link to="/changepassword" state= {{account: user}}>Change my password</Link>
                </button>
                <button>
                    <Link to="/income" state= {{account: user}}>View income</Link>
                </button>
                <button>
                    <Link to="/paymentmethods" state= {{account: user}}>View payment methods</Link>
                </button>
                <button onClick = {()=>handleDelete()}>Delete my account</button>
                {
                    user.premium === "y" ? <button onClick={premiumToStandard}>Become a Standard User</button> : 
                    user.premium === "n" ? <button onClick={standardToPremium}>Become a Premium User</button> : null
                }
            </MainContainer>
        </PageContainer>
    )
}

export default Account
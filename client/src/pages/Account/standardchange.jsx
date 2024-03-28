import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom';


const StandardChange = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const returnHome = () => {
        navigate("/home", {state: {userID: location.state.userID, accountType: location.state.accountType}})
    }
    return <div>
        <h1>You are now a Standard User.</h1>
        <button onClick={returnHome}>
            Return to homepage
        </button>
    </div>
}

export default StandardChange
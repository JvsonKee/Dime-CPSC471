import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const PremiumChange = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let user = location.state.account;
    
    const returnHome = () => {
        navigate("/home", {state: {account: user}})
    }

    return <div>
        <h1>You are now a Premium User.</h1>
        <button onClick={returnHome}>
            Return to homepage
        </button>
    </div>
}

export default PremiumChange
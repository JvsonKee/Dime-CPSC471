import React from 'react'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';


const Home = () => {

    const location = useLocation();

    return (
    <div>
        <button>
            <Link to ="/">Log off</Link>
        </button>
        <button>
            <Link to="/transactions" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Transactions</Link>
        </button>
        <button>
        <Link to="/budgets" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Budgets</Link>
        </button>
        <button>
        <Link to="/savings" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Savings</Link>
        </button>
        <button>
        <Link to="/goals" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Goals</Link>
        </button>
        <button>
        <Link to="/account" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Account</Link>
        </button>
        {
            location.state.accountType === "y" ? 
            <button>
                <Link to="/dashboard" state= {{userID: location.state.userID, accountType: location.state.accountType}}>Dashboard</Link>
            </button> : 
            null
        }
    </div>
    )
}

export default Home
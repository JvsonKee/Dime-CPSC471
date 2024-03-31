import React from 'react'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import NavBar from '../../components/NavBar';


const Home = () => {

    const location = useLocation();
    let user = location.state.account;

    return (
    <div>
        <NavBar />
        <button>
            <Link to ="/">Log off</Link>
        </button>
        <button>
            <Link to="/transactions" state= {{userID: user.userID, premium: user.premium}}>Transactions</Link>
        </button>
        <button>
        <Link to="/budgets" state= {{userID: user.userID, premium: user.premium}}>Budgets</Link>
        </button>
        <button>
        <Link to="/savings" state= {{userID: user.userID, premium: user.premium}}>Savings</Link>
        </button>
        <button>
        <Link to="/goals" state= {{userID: user.userID, premium: user.premium}}>Goals</Link>
        </button>
        <button>
        <Link to="/account" state= {{account: location.state.account}}>Account</Link>
        </button>
        {
            user.premium === "y" ? 
            <button>
                <Link to="/dashboard" state= {{userID: user.userID, premium: user.premium}}>Dashboard</Link>
            </button> : 
            null
        }
    </div>
    )
}

export default Home
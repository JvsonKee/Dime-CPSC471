import React from 'react'
import { Link } from "react-router-dom"

const HomePremium = () => {
    return <div>
    <button>
        <Link to ="/">Log off</Link>
    </button>
    <button>
        <Link to ="/transactions">Transactions</Link>
    </button>
    <button>
        <Link to ="/budgets">Budgets</Link>
    </button>
    <button>
        <Link to ="/savings">Savings</Link>
    </button>
    <button>
        <Link to ="/goals">Goals</Link>
    </button>
    <button>
        <Link to ="/account/premium">Account</Link>
    </button>
    <button>
        <Link to ="/dashboard">Dashboard</Link>
    </button>
    </div>
}

export default HomePremium
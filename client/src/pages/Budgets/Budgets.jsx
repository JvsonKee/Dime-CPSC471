import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Budgets = () => {

    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;
    let budgets = location.state.budgets

    const handleDeleteBudget = async(budget) => {
        try{
            await axios.delete("http://localhost:8800/deletebudget/" + budget);
            let j = 0
            for (let i = 0; i < location.state.budgets.length;  i++) {
                if (location.state.budgets[i].budgetID === parseInt(budget)) {
                    j = i
                    break
                }
            }
            console.log(j)
            location.state.budgets.splice(j,1)
            navigate("/budgets", {state: {account: user, budgets: location.state.budgets}})
        }catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
            <h1>Budgets</h1>
            <div className = "budgets">
                {budgets.map((budgets)=>(
                    <div className = "budgets" key={budgets.budgetID}>
                        <h2>Description: {budgets.description}</h2>
                        <h2>Category: {budgets.category_name}</h2>
                        <h2>Amount: {budgets.amount}</h2>
                        <h2>Start date: {budgets.startDay} / {budgets.startMonth} / {budgets.startYear}</h2>
                        <h2>End date: {budgets.endDay} / {budgets.endMonth} / {budgets.endYear}</h2>
                        <button>
                            <Link to="/updatebudget" state= {{account: user, budgets: location.state.budgets, budgetID: budgets.budgetID}}>Update</Link>
                        </button>
                        <button onClick = {()=>handleDeleteBudget(budgets.budgetID)}>Delete</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/createbudget" state= {{account: user, budgets: location.state.budgets}}>Create a new budget</Link>
        </button>
        <button>
            <Link to="/categories" state= {{account: user, budgets: location.state.budgets}}>Update my categories</Link>
        </button>
        <button>
            <Link to="/home" state= {{account: user}}>Return to homepage</Link>
        </button>
    </div>
)}

export default Budgets
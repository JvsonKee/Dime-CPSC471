import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import {
    BudgetsContainer,
    BudgetItem,
    Title,
    ButtonContainer,
    Button,
    BudgetButton,
} from './Budgets.styled';

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

    return (
        <BudgetsContainer>
            <Title>Budgets</Title>
            {budgets.map(budget => (
                <BudgetItem key={budget.budgetID}>
                    <h2>Description: {budget.description}</h2>
                    <p>Category: {budget.category_name}</p>
                    <p>Amount: {budget.amount}</p>
                    <p>Start date: {budget.startDay} / {budget.startMonth} / {budget.startYear}</p>
                    <p>End date: {budget.endDay} / {budget.endMonth} / {budget.endYear}</p>
                    <Button onClick={() => navigate("/updatebudget", { state: { account: user, budgets: location.state.budgets, budgetID: budget.budgetID }})}>Update</Button>
                    <Button onClick={() => handleDeleteBudget(budget.budgetID)}>Delete</Button>
                </BudgetItem>
            ))}
            <ButtonContainer>
                <Button as={Link} to={{ pathname: "/createbudget", state: { account: user, budgets: location.state.budgets }}}>Create New Budget</Button>
                <Button as={Link} to={{ pathname: "/categories", state: { account: user, budgets: location.state.budgets }}}>Update My Categories</Button>
                <Button as={Link} to={{ pathname: "/home", state: { account: user }}}>Return Home</Button>
            </ButtonContainer>
        </BudgetsContainer>
    );
};

export default Budgets
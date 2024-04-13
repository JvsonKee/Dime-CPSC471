import React, { useContext, useEffect, useState } from 'react'
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
import { UserContext } from '../../App';
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers';
import NavBar from '../../components/NavBar';

const Budgets = () => {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation();
    const [budgets, setBudgets] = useState([])


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

    useEffect(() => {
        const fetchAllBudgets = async () => {
            try{
                const res = await axios.get("http://localhost:8800/budgets/" + user.userID)
                setBudgets(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBudgets()
    }, [user.userID])

    return (
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
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
                            <Button>
                                <Link to= "/createbudget">Create New Budget</Link>
                            </Button>
                            <Button>
                                <Link to= "/categories">Update My Categories</Link>
                            </Button>
                            <Button>
                                <Link to = "/home">Return Home</Link>
                            </Button>
                        </ButtonContainer>
                    </BudgetsContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
    );
};

export default Budgets
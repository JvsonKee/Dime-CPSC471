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
} from './Budgets.styled';
import { UserContext } from '../../App';
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers';
import NavBar from '../../components/NavBar';
import { Bottom, ItemContainer, Mid, TName, TPrice, Top, TransactionButton, StyledLink } from '../Transactions/Transactions.styled';

const Budgets = () => {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation();
    const [budgets, setBudgets] = useState([])


    const handleDeleteBudget = async(budget) => {
        try{
            await axios.delete("http://localhost:8800/deletebudget/" + budget);
            setBudgets(budgets => budgets.filter(item => item.budgetID !== budget))
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const res = await axios.get("http://localhost:8800/budgetswithcategoryname/" + user.userID);
                setBudgets(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBudgets()
    }, [user.userID])

    return (
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <BudgetsContainer>
                        <Title>Budgets</Title>
                        <ItemContainer>
                            {budgets.map(budget => (
                                <BudgetItem key={budget.budgetID}>
                                    <Top>
                                        <TName>{budget.categoryName}</TName>
                                        <TPrice>${budget.amount}</TPrice>
                                    </Top>
                                    <Mid>
                                        <div>{budget.description}</div>
                                        <div>Start: {budget.startDay} / {budget.startMonth} / {budget.startYear}</div>
                                        <div>End: {budget.endDay} / {budget.endMonth} / {budget.endYear}</div>
                                    </Mid>
                                    <Bottom>
                                        <TransactionButton onClick={() => navigate("/updatebudget", { state: { budgetID: budget.budgetID }})}>Update</TransactionButton>
                                        <TransactionButton style={{backgroundColor: 'var(--red)'}} onClick={() => handleDeleteBudget(budget.budgetID)}>Delete</TransactionButton>
                                    </Bottom>
                                </BudgetItem>
                            ))}
                        </ItemContainer>
                        <ButtonContainer>
                            <TransactionButton>
                                <StyledLink to= "/createbudget">Create New Budget</StyledLink>
                            </TransactionButton>
                            <TransactionButton>
                                <StyledLink to= "/categories">Update My Categories</StyledLink>
                            </TransactionButton>
                        </ButtonContainer>
                    </BudgetsContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
    );
};

export default Budgets
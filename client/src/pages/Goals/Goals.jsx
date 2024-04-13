import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext } from 'react';
import {
    GoalsContainer,
    GoalItem,
    Title,
    ButtonContainer,
    Button,
} from './Goals.styled';
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers'
import NavBar from '../../components/NavBar'
import { Bottom, ItemContainer, Mid, StyledLink, TName, TPrice, Top, TransactionButton } from '../Transactions/Transactions.styled'

const Goals = () => {
    const [goals, setGoals] = useState([])

    const [user, setUser] = useContext(UserContext);


    const handleDelete = async(goalID) => {
        try{
            await axios.delete("http://localhost:8800/deletegoal/" + goalID);
            setGoals(goals => goals.filter(item => item.goalID !== goalID));
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllGoals = async () => {
            try{
                const res = await axios.get("http://localhost:8800/goals/" + user.userID)
                setGoals(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllGoals()
    },[user.userID])

    return (
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <GoalsContainer>
                        <Title>Goals</Title>
                        <ItemContainer>
                            {goals.map((goal) => (
                                <GoalItem key={goal.goalID}>
                                    <Top>
                                        <TName>{goal.title}</TName>
                                        <TPrice>${goal.amount}</TPrice>
                                    </Top>
                                    <Mid>
                                        {goal.description && <div>Description: {goal.description}</div>}
                                        <div>Target date: {goal.gDay} / {goal.gMonth} / {goal.gYear}</div>
                                    </Mid>
                                    <Bottom>
                                        <TransactionButton>
                                            <StyledLink to="/updategoals" state={{ account: user, goalID: goal.goalID }}>Edit</StyledLink>
                                        </TransactionButton>
                                        <TransactionButton style={{backgroundColor: 'var(--red)'}}onClick={() => handleDelete(goal.goalID)}>Delete</TransactionButton>
                                    </Bottom>
                                </GoalItem>
                            ))}
                        </ItemContainer>
                        <ButtonContainer>
                                <TransactionButton>
                                    <StyledLink to = "/newgoals" state = {{ account: user } }>Create New Savings Goal</StyledLink>
                                </TransactionButton>
                        </ButtonContainer>
                    </GoalsContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
    );
};

export default Goals
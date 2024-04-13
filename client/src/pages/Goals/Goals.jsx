import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext } from 'react';
import {
    GoalsContainer,
    GoalItem,
    Title,
    ButtonContainer,
    Button,
    GoalButton,
} from './Goals.styled';

const Goals = () => {
    const [goals, setGoals] = useState([])

    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext);


    const handleDelete = async(goals) => {
        try{
            await axios.delete("http://localhost:8800/deletegoal/" + goals);
            navigate("/goals", {state: {account: user}})
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
        <div>
            <Title>Savings Goals</Title>
            <GoalsContainer>
                {goals.map((goal) => (
                    <GoalItem key={goal.goalID}>
                        <h2>Title: {goal.title}</h2>
                        {goal.description && <h2>Description: {goal.description}</h2>}
                        <h2>Target amount: {goal.amount}</h2>
                        <h2>Target date: {goal.gDay} / {goal.gMonth} / {goal.gYear}</h2>
                        <Button>
                            <Link to="/updategoals" state={{ account: user, goalID: goal.goalID }}>Update</Link>
                        </Button>
                        <Button onClick={() => handleDelete(goal.goalID)}>Delete</Button>
                    </GoalItem>
                ))}
            </GoalsContainer>
            <ButtonContainer>
                <Button as={Link} to={{ pathname: "/newgoals", state: { account: user } }}>Create New Savings Goal</Button>
                <Button as={Link} to={{ pathname: "/home", state: { account: user } }}>Return Home</Button>
            </ButtonContainer>
        </div>
    );
};

export default Goals
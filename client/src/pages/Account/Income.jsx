import React, { useContext } from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App'
import {
    IncomeContainer,
    IncomeItem,
    IncomeButton,
    ButtonContainer,
    Title,
} from './Income.styled';


const Income = () => {
    const [user, setUser] = useContext(UserContext)
    const [income, setIncome] = useState([]);
    
    const navigate = useNavigate()
    const location = useLocation();
    
    const handleDelete = async(income) => {
        try{
            await axios.delete("http://localhost:8800/deleteincome/" + income);
            navigate("/income")
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllIncome = async () => {
            try{
                const res = await axios.get("http://localhost:8800/income/" + user.userID)
                setIncome(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllIncome()
    },[user.userID])

    return(
        <IncomeContainer>
        <Title>Income</Title>
        {income.map((income) => (
            <IncomeItem key={income.incomeID}>
                <h2>Source: {income.incomeSource}</h2>
                <h2>Amount: {income.incomeAmount}</h2>
                <h2>Last Received: {income.lastReceivedDay}/{income.lastReceivedMonth}/{income.lastReceivedYear}</h2>
                <h2>Receive every: {income.receiveEvery}</h2>
                <IncomeButton>
                    <Link to="/editincome" state={{ incomeID: income.incomeID }}>Edit</Link>
                </IncomeButton>
                <IncomeButton onClick={() => handleDelete(income.incomeID)}>Delete</IncomeButton>
            </IncomeItem>
        ))}
        <ButtonContainer>
            <IncomeButton>
                <Link to="/newincome">Create New Income Source</Link>
            </IncomeButton>
            <IncomeButton>
                <Link to="/account">Return To Account</Link>
            </IncomeButton>
        </ButtonContainer>
    </IncomeContainer>
)}

export default Income
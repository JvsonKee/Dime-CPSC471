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
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers'
import NavBar from '../../components/NavBar'
import { Bottom, ItemContainer, Mid, StyledLink, TName, TPrice, Top, TransactionButton } from '../Transactions/Transactions.styled'


const Income = () => {
    const [user, setUser] = useContext(UserContext)
    const [income, setIncome] = useState([]);
    
    const navigate = useNavigate()
    
    const handleDelete = async(incomeID) => {
        try{
            await axios.delete("http://localhost:8800/deleteincome/" + incomeID);
            setIncome(income => income.filter(item => item.incomeID !== incomeID))
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
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <IncomeContainer>
                        <Title>Income</Title>
                        <ItemContainer>
                            {income.map((income) => (
                                <IncomeItem key={income.incomeID}>
                                    <Top>
                                        <TName>{income.incomeSource}</TName>
                                        <TPrice style={{color: 'var(--dime-green)'}}>${income.incomeAmount}</TPrice>
                                    </Top>
                                    <Mid>
                                        <div>Last Received: {income.lastReceivedDay}/{income.lastReceivedMonth}/{income.lastReceivedYear}</div>
                                        <div>Receive every: {income.receiveEvery}</div>
                                    </Mid>
                                    <Bottom>
                                        <TransactionButton>
                                            <StyledLink to="/editincome" state={{ incomeID: income.incomeID }}>Edit</StyledLink>
                                        </TransactionButton>
                                        <TransactionButton style={{backgroundColor: 'var(--red)'}} onClick={() => handleDelete(income.incomeID)}>Delete</TransactionButton>
                                    </Bottom>
                                </IncomeItem>
                            ))}
                        </ItemContainer>
                        <ButtonContainer>
                            <TransactionButton>
                                <StyledLink to="/newincome">Create New Income Source</StyledLink>
                            </TransactionButton>
                        </ButtonContainer>
                    </IncomeContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
)}

export default Income
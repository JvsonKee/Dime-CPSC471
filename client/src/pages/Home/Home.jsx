import React, { useContext, useState, useEffect } from 'react'
import NavBar from '../../components/NavBar';
import { ContentContainer, MainContainer, PageContainer, CardContainer } from '../../styles/Containers';
import { useNavigate } from 'react-router-dom';
import { Matrix, RectangleBox, SquareBox, TopBottom, VerticalBox, Top, Bottom, BudgetAndGoalHolder } from './Home.styled';
import { UserContext } from '../../App';
import axios from 'axios';
import RecentTransactions from './RecentTransactions'
import Incoming from './Incoming';
import Calendar from './Calendar'
import SavingsHome from './SavingsHome';
import GoalsHome from './GoalsHome';
import BudgetsHome from './BudgetsHome';

const Home = () => {

    const [user, setUser] = useContext(UserContext)
    const [transactions, setTransactions] = useState([])
    const [incomes, setIncomes] = useState([])
    const [savings, setSavings] = useState([])

    const navigate = useNavigate();
    
    const sendTo = (path) => {
        navigate(path)
    }

    useEffect(() => 
    {
        const fetchAllTransaction = async () => {
            try{
                const res = await axios.get("http://localhost:8800/transactions/" + user.userID)
                setTransactions(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllTransaction()

        const fetchAllIncome = async () => {
            try {
                const res = await axios.get("http://localhost:8800/income/" + user.userID)
                setIncomes(res.data)
            } catch (err) { 
                console.log(err)
            }
        }
        fetchAllIncome()

        const fetchSavings = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/savings/${user.userID}`);
                setSavings(res.data) 
            } catch (err) {
                console.log(err)
            }
        }
        fetchSavings()
    },[user.userID])

    return (
    <PageContainer>
        <NavBar/>
        <MainContainer>
            <ContentContainer>
                <CardContainer>
                    <Top>
                        <SquareBox onClick={() => sendTo("/savings")}>
                            <SavingsHome savings={savings}/>
                        </SquareBox>
                        <SquareBox onClick={() => sendTo('/income')}>
                            <Incoming incomes={incomes}/>
                        </SquareBox>
                        <SquareBox>
                            <Calendar transactions={transactions} />
                        </SquareBox>
                    </Top>
                    <Bottom>
                        <Matrix>
                            <TopBottom>
                                <BudgetAndGoalHolder>
                                    <SquareBox style={{width: '44.5%'}}onClick = {() => sendTo('/budgets')}>
                                        <BudgetsHome />
                                    </SquareBox>
                                    <SquareBox style={{width: '44.5%'}} onClick = {() => sendTo("/goals")}>
                                        <GoalsHome />
                                    </SquareBox>
                                </BudgetAndGoalHolder>
                                {
                                    user.premium === "n" ?
                                        <RectangleBox> 
                                            Upgrade to premium to unlock this feature.
                                        </RectangleBox>
                                    : 
                                    user.premium === "y" ?
                                        <RectangleBox>
                                            <h2>Premium</h2>
                                        </RectangleBox>
                                    : null
                                }
                            </TopBottom>
                            <VerticalBox onClick = {() => sendTo("/transactions")}>
                                <RecentTransactions transactions={transactions}/>
                            </VerticalBox>
                        </Matrix>
                    </Bottom>
                </CardContainer>
            </ContentContainer>
        </MainContainer>
    </PageContainer>
    )
}

export default Home
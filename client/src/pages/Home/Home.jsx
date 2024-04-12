import React, { useContext, useState } from 'react'
import NavBar from '../../components/NavBar';
import { ContentContainer, MainContainer, PageContainer, CardContainer } from '../../styles/Containers';
import { useNavigate } from 'react-router-dom';
import { Matrix, RectangleBox, SquareBox, TopBottom, VerticalBox, Top, Bottom } from './Home.styled';
import { UserContext } from '../../App';
import { useEffect } from 'react';
import axios from 'axios';
import RecentTransactions from './RecentTransactions'
import Incoming from './Incoming';
import Calendar from './Calendar'

const Home = () => {

    const [user, setUser] = useContext(UserContext)
    const [transactions, setTransactions] = useState([])
    const [incomes, setIncomes] = useState([])

    const navigate = useNavigate();
    
    const sendTo = (path) => {
        navigate(path)
    }

    useEffect(() => {
        const fetchAllTransaction = async () => {
            try{
                const res = await axios.get("http://localhost:8800/transactions/" + user.userID)
                setTransactions(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllTransaction()
    },[user.userID])

    useEffect(() => {
        const fetchAllIncome = async () => {
            try{
                const res = await axios.get("http://localhost:8800/income/" + user.userID)
                setIncomes(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllIncome()
    },[user.userID])

    return (
    <PageContainer>
        <NavBar/>
        <MainContainer>
            <ContentContainer>
                <CardContainer>
                    <Top>
                        <SquareBox onClick={() => sendTo('/savings')}>
                            Balance (dont click on this)
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
                                <RectangleBox>
                                    Budgets & Goals
                                </RectangleBox>
                                <RectangleBox>
                                    Premium Feature
                                </RectangleBox>
                            </TopBottom>
                            <VerticalBox onClick={() => sendTo('/transactions')}>
                                <RecentTransactions transactions={transactions}/>
                            </VerticalBox>
                        </Matrix>
                    </Bottom>
                    {/* <button>
                        <Link to="/transactions" state= {{account: location.state.account}}>Transactions</Link>
                    </button>
                    <button>
                    <Link to="/budgets" state= {{account: location.state.account}}>Budgets</Link>
                    </button>
                    <button>
                    <Link to="/savings" state= {{account: location.state.account}}>Savings</Link>
                    </button>
                    <button>
                    <Link to="/goals" state= {{account: location.state.account}}>Goals</Link>
                    </button>
                    <button>
                    <Link to="/account" state= {{account: location.state.account}}>Account</Link>
                    </button>
                    {
                        user.premium === "y" ? 
                        <button>
                            <Link to="/dashboard" state= {{account: location.state.account}}>Dashboard</Link>
                        </button> : 
                        null
                    }
                    <button>
                        <Link to ="/">Log off</Link>
                    </button> */}
                </CardContainer>
            </ContentContainer>
        </MainContainer>
    </PageContainer>
    )
}

export default Home
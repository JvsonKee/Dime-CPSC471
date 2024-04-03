import React from 'react'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { ContentContainer, MainContainer, PageContainer, Content, CardContainer } from '../../styles/Containers';
import { useNavigate } from 'react-router-dom';
import { Matrix, RectangleBox, SquareBox, TopBottom, VerticalBox, Top, Bottom } from './Home.styled';

const Home = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let user = location.state.account;
    
    const sendTo = (path) => {
        navigate(path, {state: {account: user}})
    }

    return (
    <PageContainer>
        <NavBar account={user}/>
        <MainContainer>
            <ContentContainer>
                <CardContainer>
                    <Top>
                        <SquareBox onClick={() => sendTo('/savings')}>
                            Balance (dont click on this)
                        </SquareBox>
                        <SquareBox onClick={() => sendTo('/income')}>
                            Incoming
                        </SquareBox>
                        <SquareBox>
                            Calendar
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
                                Recent Transactions
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
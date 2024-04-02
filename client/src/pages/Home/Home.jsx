import React from 'react'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { ContentContainer, MainContainer, PageContainer, Content } from '../../styles/Containers';

const Home = () => {

    const location = useLocation();
    let user = location.state.account;

    return (
    <PageContainer>
        <NavBar account={user}/>
        <MainContainer>
            <ContentContainer>
                <Content>
                    <h1>Welcome, {user.fName.charAt(0).toUpperCase() + user.fName.slice(1)}</h1>
                    <button>
                        <Link to ="/">Log off</Link>
                    </button>
                    <button>
                        <Link to="/transactions" state= {{userID: user.userID, premium: user.premium}}>Transactions</Link>
                    </button>
                    <button>
                    <Link to="/budgets" state= {{userID: user.userID, premium: user.premium}}>Budgets</Link>
                    </button>
                    <button>
                    <Link to="/savings" state= {{userID: user.userID, premium: user.premium}}>Savings</Link>
                    </button>
                    <button>
                    <Link to="/goals" state= {{userID: user.userID, premium: user.premium}}>Goals</Link>
                    </button>
                    <button>
                    <Link to="/account" state= {{account: location.state.account}}>Account</Link>
                    </button>
                    {
                        user.premium === "y" ? 
                        <button>
                            <Link to="/dashboard" state= {{userID: user.userID, premium: user.premium}}>Dashboard</Link>
                        </button> : 
                        null
                    }
                </Content>
            </ContentContainer>
        </MainContainer>
    </PageContainer>
    )
}

export default Home
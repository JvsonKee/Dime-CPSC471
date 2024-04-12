import React, { useContext } from 'react'
import NavBar from '../../components/NavBar';
import { ContentContainer, MainContainer, PageContainer, CardContainer } from '../../styles/Containers';
import { useNavigate } from 'react-router-dom';
import { Matrix, RectangleBox, SquareBox, TopBottom, VerticalBox, Top, Bottom } from './Home.styled';
import { UserContext } from '../../App';
import {useState} from 'react'
import axios from 'axios'
import {useEffect} from 'react'

const Home = () => {

    const [user, setUser] = useContext(UserContext)

    const navigate = useNavigate();
    
    const sendTo = (path) => {
        navigate(path, {state: {account: user}})
    }

    const [transactions, setTransactions] = useState([])
    const [payment, setPayments] = useState([])

    const [categories, setCategories] = useState([])
    const [budgets, setBudgets] = useState([])


    function calculate() {
        console.log(transactions)
        console.log(payment)
        for (let j = 0; j < transactions.length; j++) {
            for (let i = 0; i < payment.length; i++) {
                if (payment[i].methodID === transactions[j].payment_method) {
                    transactions[j].payment_name = payment[i].methodType;
                    console.log("Here")
                    break;
                }
            }
        }
        navigate("/transactions" ,{state :{account: user, transactions:transactions}})
    }

    function calculatebudget() {
        for (let j = 0; j < budgets.length; j++) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].categoryID === budgets[j].category) {
                    budgets[j].category_name = categories[i].categoryName;
                    console.log("Here")
                    break;
                }
            }
        }
        navigate("/budgets", {state :{account: user, budgets: budgets}})
    }

    useEffect(() => 
    {
        const fetchAllTransaction = async () => {
            try{
                const res = await axios.get("http://localhost:8800/transactions/" + user.userID)
                setTransactions(res.data)
                console.log(res)
                const res2 = await axios.get("http://localhost:8800/paymentmethodsdrop/" + user.userID)
                setPayments(res2.data)
                console.log(res2)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllTransaction()
        const fetchAllCategories = async () => {
            try{
                const res = await axios.get("http://localhost:8800/categoriesdrop/" + user.userID)
                setCategories(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllCategories()

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
    },[user.userID])

    return (
    <PageContainer>
        <NavBar account={user}/>
        <MainContainer>
            <ContentContainer>
                <CardContainer>
                    <Top>
                        <SquareBox onClick={() => sendTo("/savings")}>
                            Savings
                        </SquareBox>
                        <SquareBox onClick={() => sendTo('/income')}>
                            Incomes
                        </SquareBox>
                        <SquareBox>
                            Calendar
                        </SquareBox>
                    </Top>
                    <Bottom>
                        <Matrix>
                            <TopBottom>
                                <RectangleBox onClick = {() => calculatebudget()}>
                                    Budgets
                                </RectangleBox>
                                <RectangleBox onClick = {() => sendTo("/goals")}>
                                    Goals
                                </RectangleBox>
                            </TopBottom>
                            <VerticalBox onClick = {() => calculate()}>
                                Transactions
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
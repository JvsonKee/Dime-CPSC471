import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import {
    SavingsContainer,
    SavingsItem,
    Title,
    ButtonContainer,
    TotalSavings,
} from './Savings.styled';
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers';
import NavBar from '../../components/NavBar';
import { ItemContainer, Top, TName, TPrice, Mid, Bottom, TransactionButton } from '../Transactions/Transactions.styled';

const Savings = () => {
    const [savings, setSavings] = useState([]);
    const [totalSavings, setTotalSavings] = useState(0);

    var savings_pass = []
    var savings_id = 0
    const [user, setUser] = useContext(UserContext);

    const navigate = useNavigate();
    const handleDelete = async (savingsID) => {
        try {
            await axios.delete("http://localhost:8800/deletesavings/" + savingsID);
            setSavings(savings => savings.filter(item => item.savingsID !== savingsID));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSaving = async() => {
        try{
            const res = await axios.get("http://localhost:8800/prefillsavings/" + savings_id)
            savings_pass = res.data
            console.log(savings_pass)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const getSavingsSum = async () => {
            try {
                const res = await axios.get("http://localhost:8800/sumsavings/" + user.userID)
                setTotalSavings(res.data[0].total)
            } catch (err) {
                console.log(err)
            }
        }
        getSavingsSum()
    }, [user.userID])
     
    function setSavingsVar(savingsID) {
       savings_id = savingsID
       fetchSaving().then(() => navigate("/updatesavings", {state: {account:user, savingsID: savings_id, savingsPass: savings_pass}}))
    }

    useEffect(() => {
        const fetchAllSavings = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/savings/${user.userID}`);
                setSavings(res.data);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllSavings();
    }, [user.userID]);

    useEffect(() => {

    })

    useEffect(() => {
        fetchSaving()
    })


    return (
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <SavingsContainer>
                        <Title>Savings</Title>
                        <TotalSavings>Total saved: <span>${totalSavings}</span></TotalSavings>
                        <ItemContainer>
                            {savings.map((saving) => (
                                <SavingsItem key={saving.savingsID}>
                                    <Top>
                                        <TName>{saving.title}</TName>
                                        <TPrice>${saving.amount}</TPrice>
                                    </Top>
                                    <Mid>
                                        {saving.description && <div>{saving.description}</div>}
                                    </Mid>
                                    <Bottom>
                                        <TransactionButton onClick = {()=>setSavingsVar(saving.savingsID)}>Edit</TransactionButton>
                                        <TransactionButton style={{backgroundColor: 'var(--red)'}} onClick={() => handleDelete(saving.savingsID)}>Delete</TransactionButton>
                                    </Bottom>
                                </SavingsItem>
                            ))}
                        </ItemContainer>
                        <ButtonContainer>
                            <TransactionButton>
                                <Link to="/newsavings" style={{color: 'white', textDecoration: 'none'}}>Create New Savings Profile</Link>
                            </TransactionButton>
                        </ButtonContainer>
                    </SavingsContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
    );
};

export default Savings;

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
    Button,
    SavingsButton,
} from './Savings.styled';

const Savings = () => {
    const [savings, setSavings] = useState([]);
    const [user, setUser] = useContext(UserContext);

    const navigate = useNavigate();
    const handleDelete = async (savings) => {
        try {
            await axios.delete(`http://localhost:8800/deletesavings/${savings}`);
            navigate('/savings');
        } catch (err) {
            console.log(err);
        }
    };

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

    return (
        <SavingsContainer>
            <Title>Savings</Title>
            {savings.map((saving) => (
                <SavingsItem key={saving.savingsID}>
                    <h2>Title: {saving.title}</h2>
                    {saving.description && <h2>Description: {saving.description}</h2>}
                    <h2>Amount: {saving.amount}</h2>
                    <SavingsButton>
                        <Link to="/updatesavings" state={{ account: user, savingsID: saving.savingsID }}>
                            Update
                        </Link>
                    </SavingsButton>
                    <SavingsButton onClick={() => handleDelete(saving.savingsID)}>Delete</SavingsButton>
                </SavingsItem>
            ))}
            <ButtonContainer>
                <Button>
                    <Link to="/newsavings">Create New Savings Profile</Link>
                </Button>
                <Button>
                    <Link to="/home">Return Home</Link>
                </Button>
            </ButtonContainer>
        </SavingsContainer>
    );
};

export default Savings;

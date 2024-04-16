import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
    SavingsForm,
    FormGroup,
    Label,
    Input,
    Button,
    Title,
    InvalidFeedback
} from './SavingsUpdate.styled';

const UpdateSavings = () => {
    const location = useLocation();

    const [invalidTitle, setInvalidTitle] = useState('');
    const [invalidAmount, setInvalidAmount] = useState('');
    const [savings, setSavings] = useState({
        title: location.state.savingsPass[0].title,
        description: location.state.savingsPass[0].description,
        amount: location.state.savingsPass[0].amount
    });

    const navigate = useNavigate();

    const validForm = () => {
        let valid = true;

        if (savings.title === '') {
            setInvalidTitle('Invalid title.');
            valid = false;
        }

        if (savings.amount === '') {
            setInvalidAmount('Invalid amount.');
            valid = false;
        }

        return valid;
    };

    const handleChange = (e) => {
        setSavings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.put(
                    `http://localhost:8800/updatesavings/${location.state.savingsID}`,
                    savings
                );
                navigate('/savings');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <SavingsForm>
            <Title>Update Savings Information</Title>

            <FormGroup>
                <Label>Title *</Label>
                {invalidTitle && <InvalidFeedback>{invalidTitle}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="title" value = {savings.title}/>
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <Input
                    type="text"
                    onChange={handleChange}
                    name="description"
                    value  = {savings.description}
                />
            </FormGroup>

            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input
                    type="number"
                    onChange={handleChange}
                    name="amount"
                    value = {savings.amount}
                />
            </FormGroup>

            <Button onClick={handleClick}>Submit</Button>
        </SavingsForm>
    );
};

export default UpdateSavings;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { TransactionForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './TransactionNew.styled';

const TransactionNew = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const [invalidTitle, setInvalidTitle] = useState('');
    const [invalidAmount, setInvalidAmount] = useState('');
    const [invalidDay, setInvalidDay] = useState(null);
    const [invalidMonth, setInvalidMonth] = useState(null);
    const [invalidYear, setInvalidYear] = useState(null);
    const [invalidMethod, setInvalidMethod] = useState('')
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [transaction, setTransaction] = useState({
        title: '',
        payment_method: '',
        amount: '',
        tDay: null,
        tMonth: null,
        tYear: null
    });

    const currentYear = new Date().getFullYear();

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const res = await axios.get("http://localhost:8800/paymentmethodsdrop/" + user.userID)
                setPaymentMethods(res.data)
            } catch (err) {
                console.log(err);
            }
        };

        fetchPaymentMethods();
    }, [user.userID]);

    const validForm = () => {
        let valid = true;

        if (transaction.title === '') {
            setInvalidTitle('Invalid title.');
            valid = false;
        }

        if (transaction.amount === '') {
            setInvalidAmount('Invalid amount.');
            valid = false;
        }

        if (transaction.tDay === null) {
            setInvalidDay("Invalid day.")
            valid = false;
        }

        if (transaction.tMonth === null) {
            setInvalidMonth("Invalid month.")
            valid = false;
        }

        if (transaction.tYear === null) {
            setInvalidYear("Invalid year.");
            valid = false;
        }

        if (transaction.payment_method === '') {
            setInvalidMethod("Invalid payment method.");
            valid = false;
        }

        return valid;
    };

    const handleChange = (e) => {
        setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.post("http://localhost:8800/newtransaction/" + user.userID, transaction);
                navigate("/transactions")
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <TransactionForm>
            <Title>Create New Transaction</Title>

            <FormGroup>
                <Label>Title *</Label>
                {invalidTitle && <InvalidFeedback>{invalidTitle}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="title" />
            </FormGroup>

            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="amount" />
            </FormGroup>

            <FormGroup>
                <Label>Payment Method *</Label>
                {invalidMethod && <div>{invalidMethod}</div>}
                <Select onChange={handleChange} name="payment_method">
                    <option value="">Select Payment Method</option>
                    {paymentMethods.map((method) => (
                        <option key={method.methodID} value={method.methodID}>
                            {method.methodType}
                        </option>
                    ))}
                </Select>
            </FormGroup>

            <FormGroup>
                <Label>Date *</Label>
                <div>
                    {invalidDay && <div>{invalidDay}</div>}
                    <Select onChange={handleChange} name="tDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    {invalidMonth && <div>{invalidMonth}</div>}
                    <Select onChange={handleChange} name="tMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    {invalidYear && <div>{invalidYear}</div>}
                    <Select onChange={handleChange} name="tYear">
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>

            <Button onClick={handleClick}>Submit</Button>
        </TransactionForm>
    );
};

export default TransactionNew;

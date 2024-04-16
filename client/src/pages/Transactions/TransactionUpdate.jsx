import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { TransactionForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './TransactionUpdate.styled';

const UpdateTransaction = () => {
    const [user, setUser] = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [invalidTitle, setInvalidTitle] = useState('');
    const [invalidAmount, setInvalidAmount] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [transaction, setTransaction] = useState({
        title: location.state.transactionPass[0].title,
        payment_method: location.state.transactionPass[0].payment_method,
        amount: location.state.transactionPass[0].amount,
        tDay: location.state.transactionPass[0].tDay,
        tMonth: location.state.transactionPass[0].tMonth,
        tYear: location.state.transactionPass[0].tYear
    });

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const res = await axios.get("http://localhost:8800/paymentmethodsdrop/" + user.userID)
                setPaymentMethods(res.data)
                console.log(res)
            } catch (err) {
                console.log(err);
            }
        };

        fetchPaymentMethods();
    }, [user.userID]);

    const validForm = () => {
        let valid = true;

        if (transaction.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (transaction.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) => {
        setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        if (validForm()) {
            try {
                await axios.put("http://localhost:8800/updatetransaction/" + location.state.transactionID, transaction)
                navigate("/transactions")
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <TransactionForm>
            <Title>Update Transaction</Title>

            <FormGroup>
                <Label>Title *</Label>
                {invalidTitle && <InvalidFeedback>{invalidTitle}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="title" value = {transaction.title}/>
            </FormGroup>

            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="amount" value = {transaction.amount}/>
            </FormGroup>

            <FormGroup>
                <Label>Payment Method *</Label>
                <Select onChange={handleChange} name="payment_method" value = {transaction.payment_method}>
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
                    <Select onChange={handleChange} name="tDay" value = {transaction.tDay}>
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="tMonth" value = {transaction.tMonth}>
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="tYear" value = {transaction.tYear}>
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
}

export default UpdateTransaction;

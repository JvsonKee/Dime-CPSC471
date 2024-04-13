import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { TransactionForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './TransactionNew.styled';

const TransactionNew = () => {
    const [user, setUser] = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [payment, setPayments] = useState([])
    const [transactions2, setTransactions2] = useState([])
    let transactions = location.state.transactions
    const [invalidTitle, setInvalidTitle] = useState('');
    const [invalidAmount, setInvalidAmount] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [transaction, setTransaction] = useState({
        title: '',
        payment_method: '',
        amount: '',
        tDay: '',
        tMonth: '',
        tYear: ''
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

        if (transaction.title === '') {
            setInvalidTitle('Invalid title.');
            valid = false;
        }

        if (transaction.amount === '') {
            setInvalidAmount('Invalid amount.');
            valid = false;
        }

        // Add validations for day, month, year

        return valid;
    };

    const handleChange = (e) => {
        setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    function calculate() {
        console.log(payment);
        let fill_in = "";
        let transactionID = 1; // Default value if transactions2 is empty
        if (transactions2.length > 0) {
            transactionID = transactions2[transactions2.length - 1].transactionID + 1;
        }
        
        for (let i = 0; i < payment.length; i++) {
            if (payment[i].methodID === parseInt(transaction.payment_method)) {
                fill_in = payment[i].methodType;
                break;
            }
        }
    
        let transaction_toadd = {
            transactionID: transactionID,
            tUserID: user.userID,
            title: transaction.title,
            payment_method: transaction.payment_method,
            payment_name: fill_in,
            amount: transaction.amount,
            tDay: transaction.tDay,
            tMonth: transaction.tMonth,
            tYear: transaction.tYear
        };
    
        transactions.push(transaction_toadd);
    }

    console.log(transaction)

    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.post("http://localhost:8800/newtransaction/" + user.userID, transaction);
                calculate()
                navigate("/transactions", {state: {account: user, transactions: location.state.transactions}})
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const fetchAllTransaction = async () => {
            try{
                const res = await axios.get("http://localhost:8800/transactions/" + user.userID)
                setTransactions2(res.data)
                console.log(res)
                const res2 = await axios.get("http://localhost:8800/paymentmethodsdrop/" + user.userID)
                setPayments(res2.data)
                console.log(res2)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllTransaction()
    }, [user.userID])


    return (
        <TransactionForm>
            <Title>Create New Transaction</Title>

            <FormGroup>
                <Label>Title</Label>
                {invalidTitle && <InvalidFeedback>{invalidTitle}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="title" />
            </FormGroup>

            <FormGroup>
                <Label>Amount</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="amount" />
            </FormGroup>

            <FormGroup>
                <Label>Payment Method</Label>
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
                <Label>Date</Label>
                <div>
                    <Select onChange={handleChange} name="tDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="tMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
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

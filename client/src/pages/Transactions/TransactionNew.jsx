import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TransactionNew = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.account;

    const [invalidTitle, setInvalidTitle] = useState('');
    const [invalidAmount, setInvalidAmount] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [transaction, setTransaction] = useState({
        title: '',
        payment_method:'',
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

    console.log(transaction)

    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.post("http://localhost:8800/newtransaction/"+ user.userID, transaction);
                navigate('/transactions', { state: { account: user } });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            <div className="transactionForm">
                <h1>Enter new transaction information.</h1>

                <h1>Title</h1>
                {invalidTitle && <div>{invalidTitle}</div>}
                <input type="text" onChange={handleChange} name="title" />

                <h1>Amount</h1>
                {invalidAmount && <div>{invalidAmount}</div>}
                <input type="number" onChange={handleChange} name="amount" />


                <h1>Payment Method</h1>
                <select onChange={handleChange} name = "payment_method">
                    <option value="">Select Payment Method</option>
                    {paymentMethods.map((method) => (
                        <option key={method.methodType} value={method.methodType}>
                            {method.methodType}
                        </option>
                    ))}
                </select>

                <h1>Date</h1>
                <div>
                    <select onChange={handleChange} name="tDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="tMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="tYear">
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button onClick={handleClick}>Submit</button>
        </div>
    );
};

export default TransactionNew;
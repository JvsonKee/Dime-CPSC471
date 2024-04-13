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

        if (transaction.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (transaction.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }

        // Add validations for day, month, year

        return valid
    }

    const handleChange = (e) => {
        setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // let fill_in = ""
    // function calculate() {
    //     for (let i = 0; i < transactions.length; i++) {
    //         if (transactions[i].transactionID === location.state.transactionID) {
               
    //             for (let i = 0; i < paymentMethods.length; i++) {
    //                 if (paymentMethods[i].methodID === parseInt(transaction.payment_method)) {
    //                     fill_in = paymentMethods[i].methodType;
    //                     console.log("itwenthere but still")
    //                     break;

    //                 }
    //             }
    //             transactions[i].title = transaction.title
    //             transactions[i].payment_name = fill_in
    //             transactions[i].payment_method = transaction.payment_method
    //             transactions[i].amount = transaction.amount
    //             transactions[i].tDay = transaction.tDay
    //             transactions[i].tMonth = transaction.tMonth
    //             transactions[i].tYear = transaction.tYear
    //             break
    //         }
    //     }
    // }

    const handleClick = async (e) => {
        e.preventDefault()
        if (validForm()) {
            try {
                await axios.put("http://localhost:8800/updatetransaction/" + location.state.transactionID, transaction)
                // calculate()
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
}

export default UpdateTransaction;

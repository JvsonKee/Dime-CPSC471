import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { BudgetForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './CreateBudget.styled';

const CreateBudget = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext)
    const [invalidDescription, setIDescription] = useState('');
    const [invalidAmount, setIAmount] = useState('');
    const [categories, setCategories] = useState([]);
  
    const [budget, setBudget] = useState({
        description: '',
        category:'',
        amount: '',
        startDay: '',
        startMonth: '',
        startYear: '', 
        endDay: '',
        endMonth: '',
        endYear: ''
    });

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8800/categoriesdrop/" + user.userID)
                setCategories(res.data)
                console.log(res)
            } catch (err) {
                console.log(err);
            }
        };

        fetchCategories();
    }, [user.userID]);

    const validForm = () => {
        let valid = true;

        if (budget.description === '') {
            setIDescription('Invalid description.');
            valid = false;
        }

        if (budget.amount === '') {
            setIAmount('Invalid amount.');
            valid = false;
        }

        // Add validations for day, month, year

        return valid;
    };

    const handleChange = (e) => {
        setBudget((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.post("http://localhost:8800/createbudget/"+ user.userID, budget);
                // calculate()
                navigate('/budgets');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <BudgetForm>
            <Title>Enter New Budget Information.</Title>

            <FormGroup>
                <Label>Description *</Label>
                {invalidDescription && <InvalidFeedback>{invalidDescription}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="description" />
            </FormGroup>

            <FormGroup>
                <Label>Category *</Label>
                <Select onChange={handleChange} name="category">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryID} value={cat.categoryID}>
                            {cat.categoryName}
                        </option>
                    ))}
                </Select>
            </FormGroup>

            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="amount" />
            </FormGroup>

            <FormGroup>
                <Label>Start Date</Label>
                <div>
                    <Select onChange={handleChange} name="startDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="startMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="startYear">
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>

            <FormGroup>
                <Label>End Date</Label>
                <div>
                    <Select onChange={handleChange} name="endDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="endMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="endYear">
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>

            <Button onClick={handleClick}>Submit</Button>
        </BudgetForm>
    )
};

export default CreateBudget;
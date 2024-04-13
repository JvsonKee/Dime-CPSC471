import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BudgetForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './CreateBudget.styled';
import { UserContext } from '../../App';

const UpdateBudget = () => {
    const [user, setUser] = useContext(UserContext)
    const [invalidDescription, setIDescription] = useState('');
    const [invalidAmount, setIAmount] = useState('');
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const [budget, setBudget] = useState({
        description: location.state.budgetPass[0].description,
        category:location.state.budgetPass[0].category,
        amount: location.state.budgetPass[0].amount,
        startDay: location.state.budgetPass[0].startDay,
        startMonth: location.state.budgetPass[0].startMonth,
        startYear: location.state.budgetPass[0].startYear, 
        endDay: location.state.budgetPass[0].endDay,
        endMonth: location.state.budgetPass[0].endMonth,
        endYear: location.state.budgetPass[0].endYear
    });
    const navigate = useNavigate();

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
                await axios.put("http://localhost:8800/updatebudget/"+ location.state.budgetID, budget);
                navigate('/budgets');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <BudgetForm>
            <Title>Enter Updated Budget Information</Title>

            <FormGroup>
                <Label>Description *</Label>
                {invalidDescription && <InvalidFeedback>{invalidDescription}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="description" value = {budget.description}/>
            </FormGroup>

            <FormGroup>
                <Label>Category *</Label>
                <Select onChange={handleChange} name="category" value = {budget.category}>
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
                <Input type="number" onChange={handleChange} name="amount" value = {budget.amount}/>
            </FormGroup>

            <FormGroup>
                <Label>Start Date *</Label>
                <div>
                    <Select onChange={handleChange} name="startDay" value = {budget.startDay}>
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="startMonth" value = {budget.startMonth}>
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="startYear" value = {budget.startYear}>
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>

            <FormGroup>
                <Label>End Date *</Label>
                <div>
                    <Select onChange={handleChange} name="endDay" value = {budget.endDay}>
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="endMonth" value = {budget.endMonth}>
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="endYear" value = {budget.endYear}>
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>

            <Button onClick={handleClick}>Submit</Button>
        </BudgetForm>
    );
};

export default UpdateBudget;
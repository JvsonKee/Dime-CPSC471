import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateBudget = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.account;

    let budgets_loc = location.state.budgets

    const [categories2, setCategories2] = useState([])
    const [budgets2, setBudgets2] = useState([])

    const [invalidDescription, setIDescription] = useState('');
    //const [invalidCategory, setICategory] = useState('');
    const [invalidAmount, setIAmount] = useState('');
    /*const [invalidStartDay, setIStartDay] = useState('');
    const [invalidStartMonth, setIStartMonth] = useState('');
    const [invalidStartYear, setIStartYear] = useState('');
    const [invalidEndDay, setIEndDay] = useState('');
    const [invalidEndMonth, setIEndMonth] = useState('');
    const [invalidEndYear, setIEndYear] = useState('');*/

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

    function calculate() {
        let fill_in = ""
        for (let i = 0; i < categories2.length; i++) {
            if (categories2[i].categoryID === parseInt(budget.category)) {
                fill_in = categories2[i].categoryName;
                break;
            }
        }

        let budget_toadd = {
            budgetID: budgets2[budgets2.length -1].budgetID + 1,
            bUserID: user.userID,
            description: budget.description,
            category: budget.category,
            category_name: fill_in,
            amount: budget.amount,
            startDay: budget.startDay,
            startMonth: budget.startMonth,
            startYear: budget.startYear,
            endDay: budget.endDay,
            endMonth: budget.endMonth,
            endYear: budget.endYear
        }
        budgets_loc.push(budget_toadd)
    }
    console.log(budget)

    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.post("http://localhost:8800/createbudget/"+ user.userID, budget);
                calculate()
                navigate('/budgets', { state: { account: user, budgets: location.state.budgets} });
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const fetchAllBudgets = async () => {
            try{
                const res = await axios.get("http://localhost:8800/budgets/" + user.userID)
                setBudgets2(res.data)
                console.log(res)
                const res2 = await axios.get("http://localhost:8800/categoriesdrop/" + user.userID)
                setCategories2(res2.data)
                console.log(res2)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllBudgets()
    }, [user.userID])

    return (
        <div>
            <div className="budgetForm">
                <h1>Enter new budget information.</h1>

                <h1>Description *</h1>
                {invalidDescription && <div>{invalidDescription}</div>}
                <input type="text" onChange={handleChange} name="description" />


                <h1>Category *</h1>
                <select onChange={handleChange} name = "category">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryID} value={cat.categoryID}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>

                <h1>Amount *</h1>
                {invalidAmount && <div>{invalidAmount}</div>}
                <input type="number" onChange={handleChange} name="amount" />

                <h1>Start Date</h1>
                <div>
                    <select onChange={handleChange} name="startDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="startMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="startYear">
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <h1>End Date</h1>
                <div>
                    <select onChange={handleChange} name="endDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="endMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    <select onChange={handleChange} name="endYear">
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

export default CreateBudget;
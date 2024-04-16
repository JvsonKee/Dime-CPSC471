import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../App';
import {
    SavingsForm,
    FormGroup,
    Label,
    Input,
    Button,
    Title,
    InvalidFeedback,
} from './SavingsUpdate.styled';

const SavingsNew = () => {
    const [user, setUser] = useContext(UserContext)

    const [invalidTitle, setInvalidTitle] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')

    
    const[savings,setSavings] = useState({
        title:"",
        description:null,
        amount:""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (savings.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (savings.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }
        return valid
    }

    const handleChange = (e) =>{
        setSavings((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/newsavings/"+ user.userID, savings)
                navigate("/savings")
            }catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <SavingsForm>
            <Title>Create New Savings</Title>

            <FormGroup>
                <Label>Title *</Label>
                {invalidTitle && <InvalidFeedback>{invalidTitle}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="title" />
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <Input
                    type="text"
                    onChange={handleChange}
                    name="description"
                />
            </FormGroup>

            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input
                    type="number"
                    onChange={handleChange}
                    name="amount"
                />
            </FormGroup>

            <Button onClick={handleClick}>Submit</Button>
        </SavingsForm>
    );
};

export default SavingsNew
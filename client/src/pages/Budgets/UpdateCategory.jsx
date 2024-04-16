import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { CategoryForm, Title, FormGroup, Input, Button } from './UpdateCategory.styled';
import { UserContext } from '../../App';

const UpdateCategory = () => {

    const [user, setUser] = useContext(UserContext)
    const [invalidTitle, setInvalidTitle] = useState('')

    const location = useLocation();

    const[category,setCategory] = useState({
        categoryName: "",
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (category.categoryName === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }
        return valid;
    }

    const handleChange = (e) =>{
        setCategory((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/updatecategory/" + location.state.categoryID,category)
                navigate("/categories")
            }catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <CategoryForm>
            <Title>Enter Updated Title of Category</Title>
            <FormGroup>
                {invalidTitle && <div>{invalidTitle}</div>}
                <Input type = "text" onChange = {handleChange} name = "categoryName"/>
            </FormGroup>
            <Button onClick = {handleClick}>
                Submit
            </Button>
        </CategoryForm>
    )
}

export default UpdateCategory
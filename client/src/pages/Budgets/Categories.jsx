import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { CategoryContainer, CategoryItem, CategoryButton, ButtonContainer, Title } from './Categories.styled';
const Categories = () => {
    const [category, setCategory] = useState([]);
    
    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;
    let budgets = location.state.budgets
    
    const handleDelete = async(category) => {
        try{
            for (let i = 0; i < budgets.length; i++) {
                if (parseInt(budgets[i].category) === category) {
                    await axios.delete("http://localhost:8800/deletebudget/" + budgets[i].budgetID);
                    budgets.splice(i,1)
                }
            }
            await axios.delete("http://localhost:8800/deletecategory/" + category);

            navigate("/categories", {state: {account: user, budgets: location.state.budgets}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllCategories = async () => {
            try{
                const res = await axios.get("http://localhost:8800/categoriesdrop/" + user.userID)
                setCategory(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllCategories()
    },[user.userID])


    return(
        <CategoryContainer>
            <Title>Categories</Title>
            {category.map((category)=>(
                <CategoryItem key={category.categoryID}>
                    <h2>Name: {category.categoryName}</h2>
                    <CategoryButton>
                        <Link to="/updatecategory" state= {{account: user, budgets: location.state.budgets, categoryID: category.categoryID}}>Edit</Link>
                    </CategoryButton>
                    <CategoryButton onClick = {()=>handleDelete(category.categoryID)}>Delete</CategoryButton>
                </CategoryItem>
            ))}
            <ButtonContainer>
                <CategoryButton>
                    <Link to="/createcategory" state= {{account:user, budgets: location.state.budgets}}>Create a new category</Link>
                </CategoryButton>
                <CategoryButton>
                    <Link to="/budgets" state= {{account: user, budgets:location.state.budgets}}>Return to Budgets page</Link>
                </CategoryButton>
            </ButtonContainer>
        </CategoryContainer>
)}

export default Categories
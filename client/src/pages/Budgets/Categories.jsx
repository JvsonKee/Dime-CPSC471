import React, { useContext } from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { CategoryContainer, CategoryItem, CategoryButton, ButtonContainer, Title } from './Categories.styled';
import { UserContext } from '../../App'

const Categories = () => {
    const [user, setUser] = useContext(UserContext)
    const [categories, setCategories] = useState([]);
    
    const navigate = useNavigate()
    
    const handleDelete = async(category) => {
        try{
            await axios.delete("http://localhost:8800/deletecategory/" + category);
            setCategories(categories => categories.filter(item => item.categoryID !== category))
            navigate("/categories")
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllCategories = async () => {
            try{
                const res = await axios.get("http://localhost:8800/categoriesdrop/" + user.userID)
                setCategories(res.data)
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
            {categories.map((category)=>(
                <CategoryItem key={category.categoryID}>
                    <h2>Name: {category.categoryName}</h2>
                    <CategoryButton>
                        <Link to="/updatecategory" state= {{account: user, categoryID: category.categoryID}}>Edit</Link>
                    </CategoryButton>
                    <CategoryButton onClick = {()=>handleDelete(category.categoryID)}>Delete</CategoryButton>
                </CategoryItem>
            ))}
            <ButtonContainer>
                <CategoryButton>
                    <Link to="/createcategory">Create a new category</Link>
                </CategoryButton>
                <CategoryButton>
                    <Link to="/budgets">Return to Budgets page</Link>
                </CategoryButton>
            </ButtonContainer>
        </CategoryContainer>
)}

export default Categories
import React, { useContext } from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { CategoryContainer, CategoryItem, CategoryButton, ButtonContainer, Title } from './Categories.styled';
import { UserContext } from '../../App'
import { ContentContainer, MainContainer, PageContainer } from '../../styles/Containers';
import NavBar from '../../components/NavBar';
import { ItemContainer, TransactionButton, StyledLink } from '../Transactions/Transactions.styled';

const Categories = () => {
    const [user, setUser] = useContext(UserContext)
    const [categories, setCategories] = useState([]);
    
    const handleDelete = async(category) => {
        try{
            await axios.delete("http://localhost:8800/deletecategory/" + category);
            setCategories(categories => categories.filter(item => item.categoryID !== category))
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
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <CategoryContainer>
                        <Title>Categories</Title>
                        <ItemContainer>
                            {categories.map((category)=>(
                                <CategoryItem key={category.categoryID}>
                                    <h2>{category.categoryName}</h2>
                                    <TransactionButton>
                                        <StyledLink to="/updatecategory" state= {{categoryID: category.categoryID}}>Edit</StyledLink>
                                    </TransactionButton>
                                    <TransactionButton style={{backgroundColor: "var(--red)"}} onClick = {()=>handleDelete(category.categoryID)}>Delete</TransactionButton>
                                </CategoryItem>
                            ))}
                        </ItemContainer>
                        <ButtonContainer>
                            <TransactionButton>
                                <StyledLink to="/createcategory">Create a new category</StyledLink>
                            </TransactionButton>
                            <TransactionButton>
                                <StyledLink to="/budgets">Return to Budgets page</StyledLink>
                            </TransactionButton>
                        </ButtonContainer>
                    </CategoryContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
)}

export default Categories
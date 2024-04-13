import { useContext, useEffect, useState } from "react"
import { BoxContentWrapper, BoxHeader, ColumnBoxContainer, IncomeAmount, IncomeItem, IncomeName, SavingsWrapper, TotalSavings } from "./Home.styled"
import axios from "axios"
import { UserContext } from "../../App"

const SavingsHome = ({savings}) => {

    const [user, setUser] = useContext(UserContext);
    const [totalSavings, setTotalSavings] = useState()
    
    useEffect(() => {
        const getSavingsSum = async () => {
            try {
                const res = await axios.get("http://localhost:8800/sumsavings/" + user.userID)
                setTotalSavings(res.data[0].total)
            } catch (err) {
                console.log(err)
            }
        }
        getSavingsSum()

    }, [user.userID])

    return (
        <ColumnBoxContainer>
            <BoxHeader>Savings</BoxHeader>
            <BoxContentWrapper>
                <SavingsWrapper>
                    <TotalSavings>${totalSavings}<span style={{fontSize: '16px', fontWeight: '100'}}> saved</span></TotalSavings>
                </SavingsWrapper>
            </BoxContentWrapper>
        </ColumnBoxContainer>
    )
}

export default SavingsHome
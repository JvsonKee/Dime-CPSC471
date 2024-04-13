import { useContext, useEffect, useState } from "react"
import { BoxContentWrapper, BoxHeader, ColumnBoxContainer, SavingsWrapper, TotalSavings } from "./Home.styled"
import axios from "axios"
import { UserContext } from "../../App"

const SavingsHome = () => {

    const [user, setUser] = useContext(UserContext);
    const [totalSavings, setTotalSavings] = useState(0)
    
    useEffect(() => {
        const getSavingsSum = async () => {
            try {
                const res = await axios.get("http://localhost:8800/sumsavings/" + user.userID)
                let total = res.data[0].total;
                if (total !== null) {
                    setTotalSavings(total)
                } else {
                    setTotalSavings(0)
                }
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
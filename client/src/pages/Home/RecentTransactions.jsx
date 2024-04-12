import { BoxHeader, ColumnBoxContainer, BoxContentWrapper, TransactionDate, TransactionItem, TransactionTitle, TransactionAmount, TransactionTop } from "./Home.styled"

const RecentTransactions = ({transactions}) => {

    return (
        <ColumnBoxContainer>
            <BoxHeader>Recent Transactions</BoxHeader>
            <BoxContentWrapper>
                {
                    transactions.map((transaction, key) => (
                        <TransactionItem key={key}>
                            <TransactionTop>
                                <TransactionTitle>{transaction.title}</TransactionTitle>
                                <TransactionAmount>${transaction.amount}</TransactionAmount>
                            </TransactionTop>
                            <TransactionDate>{transaction.tDay}/{transaction.tMonth}/{transaction.tYear}</TransactionDate>
                        </TransactionItem>
                    ))
                }
            </BoxContentWrapper>
        </ColumnBoxContainer>
    )
}

export default RecentTransactions
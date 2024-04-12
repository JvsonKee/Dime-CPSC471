import { BoxHeader, RecentTransactionsContainer, RecentTransactionsWrapper, TransactionDate, TransactionItem, TransactionTitle, TransactionAmount, TransactionTop } from "./Home.styled"

const RecentTransactions = ({transactions}) => {
    console.log({transactions})
    return (
        <RecentTransactionsContainer>
            <BoxHeader>Recent Transactions</BoxHeader>
            <RecentTransactionsWrapper>
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
            </RecentTransactionsWrapper>
        </RecentTransactionsContainer>
    )
}

export default RecentTransactions
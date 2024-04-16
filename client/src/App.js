import {BrowserRouter , Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount" ;
import EditIncome from "./pages/Account/editincome";
import Income from "./pages/Account/Income";
import Login from "./pages/Login/Login";
import PaymentMethods from "./pages/Account/PaymentMethods";
import Transactions from "./pages/Transactions/Transactions";
import Budgets from "./pages/Budgets/Budgets";
import Savings from "./pages/Savings/Savings";
import Goals from "./pages/Goals/Goals";
import Account from "./pages/Account/Account";
import IncomeNew from "./pages/Account/IncomeNew";
import PaymentMethodNew from "./pages/Account/PaymentMethodNew";
import SavingsNew from "./pages/Savings/SavingsNew";
import UpdateSavings from "./pages/Savings/SavingsUpdate";
import GoalsNew from "./pages/Goals/GoalsNew";
import UpdateGoals from "./pages/Goals/GoalsUpdate";
import TransactionNew from "./pages/Transactions/TransactionNew";
import UpdateTransaction from "./pages/Transactions/TransactionUpdate";
import Receipts from "./pages/Transactions/Receipts"
import UpdateReceipt from "./pages/Transactions/ReceiptUpdate"
import ReceiptNew from "./pages/Transactions/ReceiptNew"
import CreateBudget from "./pages/Budgets/CreateBudget"
import UpdateBudget from "./pages/Budgets/UpdateBudget"
import CreateCategory from "./pages/Budgets/CreateCategory"
import UpdateCategory from "./pages/Budgets/UpdateCategory"
import Categories from "./pages/Budgets/Categories"
import GlobalStyle from "./styles/Global";
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
		<UserContext.Provider value={[user, setUser]}>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path = "/" element={<Login />}/>
					<Route path = "/createaccount" element={<CreateAccount/>}/>
					<Route path = "/home" element={<Home/>}/>
					<Route path = "/account" element={<Account/>}/>
					<Route path = "/income" element={<Income/>}/>
					<Route path = "/newincome" element={<IncomeNew/>}/>
					<Route path = "/editincome" element={<EditIncome/>}/>
					<Route path = "/paymentmethods" element={<PaymentMethods/>}/>
					<Route path = "/newpaymentmethod" element={<PaymentMethodNew/>}/>
					<Route path = "/transactions" element={<Transactions/>}/>
					<Route path = "/budgets" element={<Budgets/>}/>
					<Route path = "/savings" element={<Savings/>}/>
					<Route path = "/goals" element={<Goals/>}/>
					<Route path = "/updatesavings" element={<UpdateSavings/>}/>
					<Route path = "/newsavings" element={<SavingsNew/>}/>
					<Route path = "/updategoals" element={<UpdateGoals/>}/>
					<Route path = "/newgoals" element={<GoalsNew/>}/>
					<Route path = "/newtransaction" element={<TransactionNew/>}/>
					<Route path = "/updatetransaction" element={<UpdateTransaction/>}/>
					<Route path = "/receipts" element={<Receipts/>}/>
					<Route path = "/updatereceipt" element={<UpdateReceipt/>}/>
					<Route path = "/newreceipt" element={<ReceiptNew/>}/>
					<Route path = "/createbudget" element = {<CreateBudget/>}/>
					<Route path = "/updatebudget" element={<UpdateBudget/>}/>
					<Route path = "/createcategory" element={<CreateCategory/>}/>
					<Route path = "/updatecategory" element={<UpdateCategory/>}/>
					<Route path = "/categories" element = {<Categories/>}/>
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
    </div>
  );
}

export default App;

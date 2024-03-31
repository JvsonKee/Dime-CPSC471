import {BrowserRouter , Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import ChangePassword from "./pages/Account/ChangePassword" ;
import CreateAccount from "./pages/CreateAccount/CreateAccount" ;
import Deleted from "./pages/Account/deleted";
import EditIncome from "./pages/Account/editincome";
import EditPaymentMethod from "./pages/Account/editpaymentmethod";
import Income from "./pages/Account/Income";
import Login from "./pages/Login/Login";
import PaymentMethods from "./pages/Account/PaymentMethods";
import PremiumChange from "./pages/Account/premiumchange";
import StandardChange from "./pages/Account/standardchange";
import UpdateEmail from "./pages/Account/UpdateEmail";
import Transactions from "./pages/Transactions/Transactions";
import Budgets from "./pages/Budgets/Budgets";
import Savings from "./pages/Savings/Savings";
import Goals from "./pages/Goals/Goals";
import Dashboard from "./pages/Dashboard/Dashboard";
import Account from "./pages/Account/Account";
import IncomeNew from "./pages/Account/IncomeNew";
import PaymentMethodNew from "./pages/Account/PaymentMethodNew";
import GlobalStyle from "./styles/Global";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Login/>}/>
          <Route path = "/createaccount" element={<CreateAccount/>}/>
          <Route path = "/home" element={<Home/>}/>
          <Route path = "/account" element={<Account/>}/>
          <Route path = "/updateemail" element={<UpdateEmail/>}/>
          <Route path = "/changepassword" element={<ChangePassword/>}/>
          <Route path = "/deleted" element={<Deleted/>}/>
          <Route path = "/premiumchange" element={<PremiumChange/>}/>
          <Route path = "/standardchange" element={<StandardChange/>}/>
          <Route path = "/income" element={<Income/>}/>
          <Route path = "/newincome" element={<IncomeNew/>}/>
          <Route path = "/editincome" element={<EditIncome/>}/>
          <Route path = "/paymentmethods" element={<PaymentMethods/>}/>
          <Route path = "/newpaymentmethod" element={<PaymentMethodNew/>}/>
          <Route path = "/editpaymentmethod" element={<EditPaymentMethod/>}/>
          <Route path = "/transactions" element={<Transactions/>}/>
          <Route path = "/budgets" element={<Budgets/>}/>
          <Route path = "/savings" element={<Savings/>}/>
          <Route path = "/goals" element={<Goals/>}/>
          <Route path = "/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

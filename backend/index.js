import express from "express"
import mysql from "mysql2"
import cors from "cors"
import * as dotenv from 'dotenv';

const app = express()

dotenv.config({path: './.env'})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    const q = "SELECT * FROM users WHERE email = (?) AND password = (?)"
    db.query(q,[req.query.email, req.query.password],(err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/createaccount", (req,res)=>{
    const q = "INSERT INTO users (`fName`,`lName`, `email`,`password`, `premium`) VALUES (?)"
    const values = [
        req.body.fName,
        req.body.lName,
        req.body.email,
        req.body.password,
        req.body.premium
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.put("/updateemail/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "UPDATE users SET `email` = ? WHERE userID = ?"
    db.query(q, [req.body.email,user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/changepassword/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "UPDATE users SET `password` = ? WHERE userID = ?"
    db.query(q, [req.body.password,user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deleted/:ID", (req,res) =>{
    const user_ID = req.params.ID;
    const q = "DELETE FROM users where userID = ? "
    db.query(q,[user_ID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.put("/updatepremium/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "UPDATE users SET `premium` = ? WHERE userID = ?"
    db.query(q, [req.body.premium,user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/income/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "SELECT * FROM income WHERE iUserID = ?"
    db.query(q, [user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/editincome/:ID", (req,res)=>{
    const income_ID = req.params.ID
    const q = "UPDATE income SET `incomeSource` = ?,  `incomeAmount` = ?, `lastReceivedDay` = ?, `lastReceivedMonth` = ?, `lastReceivedYear` = ?,`receiveEvery` = ? WHERE incomeID = ? "
    db.query(q, [req.body.incomeSource, req.body.incomeAmount, req.body.lastReceivedDay,req.body.lastReceivedMonth,req.body.lastReceivedYear,req.body.receiveEvery,income_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deleteincome/:ID", (req,res) =>{
    const incomeID = req.params.ID;
    const q = "DELETE FROM income where incomeID = ? "
    db.query(q, [incomeID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.post("/newincome/:ID", (req,res)=>{
    const q = "INSERT INTO income (`iUserID`,`incomeSource`, `incomeAmount`,`lastReceivedDay`, `lastReceivedMonth`, `lastReceivedYear`,`receiveEvery`) VALUES (?)"
    const values = [
        req.params.ID,
        req.body.incomeSource,
        req.body.incomeAmount,
        req.body.lastReceivedDay,
        req.body.lastReceivedMonth,
        req.body.lastReceivedYear,
        req.body.receiveEvery
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/paymentmethods/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "SELECT * FROM payment_methods WHERE pUserID = ?"
    db.query(q, [user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/editpaymentmethod/:ID", (req,res)=>{
    const method_ID = req.params.ID
    const q = "UPDATE payment_methods SET `methodType` = ?,  `cardNumber` = ?, `expiryMonth` = ?, `expiryYear` = ? WHERE methodID = ? "
    db.query(q, [req.body.methodType, req.body.cardNumber, req.body.expiryMonth,req.body.expiryYear, method_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deletepayment/:ID", (req,res) =>{
    const methodID = req.params.ID;
    const q = "DELETE FROM payment_methods where methodID = ? "
    db.query(q, [methodID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.post("/newpaymentmethod/:ID", (req,res)=>{
    const q = "INSERT INTO payment_methods (`pUserID`,`methodType`, `cardNumber`,`expiryMonth`, `expiryYear`) VALUES (?)"
    const values = [
        req.params.ID,
        req.body.methodType,
        req.body.cardNumber,
        req.body.expiryMonth,
        req.body.expiryYear
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/goals/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "SELECT * FROM goals WHERE gUserID = ?"
    db.query(q, [user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/updategoal/:ID", (req,res)=>{
    const goal_ID = req.params.ID
    const q = "UPDATE goals SET `title` = ?,  `description` = ?, `amount` = ?, `gDay` = ?, `gMonth` = ?, `gYear` = ? WHERE goalID = ? "
    db.query(q, [req.body.title, req.body.description, req.body.amount,req.body.gDay,req.body.gMonth, req.body.gYear, goal_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deletegoal/:ID", (req,res) =>{
    const goalID = req.params.ID;
    const q = "DELETE FROM goals where goalID = ? "
    db.query(q, [goalID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.post("/newgoal/:ID", (req,res)=>{
    const q = "INSERT INTO goals (`gUserID`,`title`, `description`,`amount`, `gDay`, `gMonth`, `gYear`) VALUES (?)"
    const values = [
        req.params.ID,
        req.body.title,
        req.body.description,
        req.body.amount,
        req.body.gDay,
        req.body.gMonth,
        req.body.gYear,
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/savings/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "SELECT * FROM savings WHERE sUserID = ?"
    db.query(q, [user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/updatesavings/:ID", (req,res)=>{
    const savings_ID = req.params.ID
    const q = "UPDATE savings SET `title` = ?,  `description` = ?, `amount` = ? WHERE savingsID = ? "
    db.query(q, [req.body.title, req.body.description, req.body.amount, savings_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deletesavings/:ID", (req,res) =>{
    const savingsID = req.params.ID;
    const q = "DELETE FROM savings where savingsID = ? "
    db.query(q, [savingsID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.post("/newsavings/:ID", (req,res)=>{
    const q = "INSERT INTO savings (`sUserID`,`title`, `description`, `amount`) VALUES (?)"
    const values = [
        req.params.ID,
        req.body.title,
        req.body.description,
        req.body.amount,
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deletetransaction/:ID", (req,res) =>{
    const transactionID = req.params.ID;
    const q = "DELETE FROM transactions where transactionID = ? "
    db.query(q, [transactionID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.get("/transactions/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "SELECT * FROM transactions WHERE tUserID = ?"
    db.query(q, [user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/newtransaction/:ID", (req,res)=>{
    const q = "INSERT INTO transactions (`tUserID`,`title`, `payment_method`, `amount`, `tDay`, `tMonth`, `tYear`) VALUES (?)"
    const values = [
        req.params.ID,
        req.body.title,
        req.body.payment_method,
        req.body.amount,
        req.body.tDay,
        req.body.tMonth,
        req.body.tYear
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/updatetransaction/:ID", (req,res)=>{
    const transaction_ID = req.params.ID
    const q = "UPDATE transactions SET `title` = ?,  `payment_method` = ? ,`amount` = ?, `tDay` = ?, `tMonth` = ?, `tYear` = ? WHERE transactionID = ? "
    db.query(q, [req.body.title, req.body.payment_method, req.body.amount, req.body.tDay, req.body.tMonth, req.body.tYear, transaction_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/deletereceipt/:ID", (req,res) =>{
    const receiptID = req.params.ID;
    const q = "DELETE FROM receipts where receiptID = ? "
    db.query(q, [receiptID], (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.get("/receipts/:ID", (req,res)=>{
    const transactionID = req.params.ID
    const q = "SELECT * FROM receipts WHERE rTransactionID = ?"
    db.query(q, [transactionID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/updatereceipt/:ID", (req,res)=>{
    const receipt_ID = req.params.ID
    const q = "UPDATE receipts SET `image` = ? WHERE receiptID = ? "
    db.query(q, [req.body.image, receipt_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/newreceipt/:ID", (req,res)=>{
    const q = "INSERT INTO receipts (`rTransactionID`, `image`) VALUES (?)"
    const values = [
        req.params.ID,
        req.body.image
    ]
    db.query(q,[values],(err,data)=> {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/paymentmethodsdrop/:ID", (req,res)=>{
    const user_ID = req.params.ID
    const q = "SELECT methodType FROM payment_methods WHERE pUserID = ?"
    db.query(q, [user_ID], (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=> {
    console.log("Connected to backend")
})